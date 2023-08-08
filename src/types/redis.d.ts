import { VoteType } from "@prisma/client"

export type ChachedPost = {
  id: string
  title: string
  authorUsername: string
  content: string
  currentVote: VoteType | null
  createdAt: Date
}
