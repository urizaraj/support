import mongoose from 'mongoose'
import { UserModel } from './User'

export type PostModel = mongoose.Document & {
  content: string
  category: string
  user: UserModel
}

const ObjectId = mongoose.SchemaTypes.ObjectId

export const postSchema = new mongoose.Schema(
  {
    category: String,
    content: String,
    user: { type: ObjectId, ref: 'User' }
  },
  {
    timestamps: true,
    toJSON: { getters: true }
  }
)

const Post = mongoose.model<PostModel>('Post', postSchema)
export default Post
