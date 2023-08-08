"use client"
import { ExtendedPost } from "@/types/db"
import { FC, useEffect, useRef } from "react"
import { useIntersection } from "@mantine/hooks"
import { useInfiniteQuery } from "@tanstack/react-query"
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config"
import axios from "axios"
import { getAuthSession } from "@/lib/auth"
import { useSession } from "next-auth/react"
import Post from "./Post"

interface PostFeedProps {
  initialPosts: ExtendedPost[]
  subredditName?: string
}

const PostFeed: FC<PostFeedProps> = ({ subredditName, initialPosts }) => {
  const lastPostRef = useRef<HTMLElement>(null)

  const { data: session } = useSession()

  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  })

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["infinite-query"],
    async ({ pageParam = 1 }) => {
      const query =
        `/api/posts?limit=${INFINITE_SCROLLING_PAGINATION_RESULTS}&page=${pageParam}` +
        (!!subredditName ? `&subredditName=${subredditName}` : "")

      const { data } = await axios.get(query)
      return data as ExtendedPost[]
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1
      },
      initialData: { pages: [initialPosts], pageParams: [1] },
    },
  )

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage() // Load more posts when the last post comes into view
    }
  }, [entry, fetchNextPage])

  const posts = data?.pages.flatMap((page) => page) ?? initialPosts

  return (
    <ul className="flex flex-col col-span-2 space-y-6">
      {posts.map((post, index) => {
        const votesAmt = post?.votes?.reduce((acc, vote) => {
          if (vote.type === "UP") return acc + 1
          if (vote.type === "DOWN") return acc - 1
          return acc
        }, 0)

        const curentVote = post.votes.find((vote) => vote.userId === session?.user.id)
        if (index === posts.length - 1) {
          return (
            <li key={post.id} ref={ref}>
              <Post
                votesAmt={votesAmt}
                currentVote={curentVote}
                post={post}
                subredditName={post.subreddit.name}
                commentAmt={post.comments.length}
              />
            </li>
          )
        } else {
          return (
            <Post
              votesAmt={votesAmt}
              currentVote={curentVote}
              post={post}
              subredditName={post.subreddit.name}
              commentAmt={post.comments.length}
            />
          )
        }
      })}
    </ul>
  )
}

export default PostFeed
