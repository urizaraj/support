import mongoose from 'mongoose'

export type PostModel = mongoose.Document & {
  content: string
  category: string
}

export const postSchema = new mongoose.Schema(
  {
    category: String,
    content: String
  },
  {
    toJSON: { getters: true }
  }
)

const Post = mongoose.model<PostModel>('Post', postSchema)
export default Post
