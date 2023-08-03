import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { SubredditValidator } from "@/lib/validatiors/subreadit";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { name } = SubredditValidator.parse(body);

    const subreaditExits = await db.subreddit.findFirst({
      where: {
        name,
      },
    });

    if (subreaditExits) {
      return new Response("Subreadit already exits", { status: 409 });
    }

    const subreadit = await db.subreddit.create({
      data: {
        name,
        creatorId: session.user.id,
      },
    });

    await db.subscription.create({
      data: {
        userId: session.user.id,
        subredditId: subreadit.id,
      },
    });

    return new Response(subreadit.name);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Could not create subreaddit", { status: 500 });
  }
}
