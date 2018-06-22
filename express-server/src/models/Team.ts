import mongoose from 'mongoose'

export type TeamModel = mongoose.Document & {
  name: string
}

export const teamSchema = new mongoose.Schema(
  {
    name: String
  },
  {
    timestamps: true,
    toJSON: { getters: true }
  }
)

const Team = mongoose.model<TeamModel>('Team', teamSchema)
export default Team
