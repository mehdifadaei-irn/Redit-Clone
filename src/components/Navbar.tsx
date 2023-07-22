import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Icons } from "./Icons";
import { buttonVariants } from "./ui/Button";
import { getAuthSession } from "@/lib/auth";
import UserAccountNav from "./UserAccountNav";

const Navbar = async () => {
  const session = await getAuthSession();

  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2">
      <div className="container max-w-7xl mx-auto items-center flex justify-between gap-2">
        {/* Logo  */}
        <Link href={"/"} className="flex gap-2 items-center">
          {/* <Icons.logo className="h-8 w-8 sm:h-6 sm:w-6" /> */}
          <Image
            src={"/favicon.ico"}
            alt="ico"
            width={34}
            height={34}
            priority
          />
          <p className="hidden text-zinc-700 text-sm font-medium md:block">
            Fada-Yi
          </p>
        </Link>

        {/* Search Bar */}

        {session?.user ? (
          <UserAccountNav/>
        ) : (
          <Link href={"/sign-in"} className={buttonVariants()}>
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
