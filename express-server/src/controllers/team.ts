import { Request, Response, NextFunction } from 'express'
import Team from '../models/Team'

type Route = (req: Request, res: Response) => void

export const createTeam: Route = (req, res) => {
  const team = new Team({
    name: req.body.name
  })

  team.save()

  res.json(team.toJSON())
}

export const getTeams: Route = async (req, res) => {
  const teams = await Team.find({})

  res.json(teams.map(team => team.toJSON()))
}
