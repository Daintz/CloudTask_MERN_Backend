import { Request, Response } from "express";
import Project from "../models/Project";

export class projectController {
  static createProject = async (req: Request, res: Response) => {

    console.log(req.body)

    const project = new Project(req.body);

    try {
      await project.save();
      res.send('Project created successfully')
    } catch (error) {
      console.log(error);
    };
  };

  static getAllProjects = async (req: Request, res: Response) => {
    res.send("All projects");
  };
};