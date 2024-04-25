import { Request, Response } from "express";
import Project from "../models/Project";

export class projectController {
  static createProject = async (req: Request, res: Response) => {
    const project = new Project(req.body);

    try {
      await project.save();
      res.send('Project created successfully');
    } catch (error) {
      console.log(error);
      res.status(404).json({ error: error.message });
    };
  };

  static getAllProjects = async (req: Request, res: Response) => {
    try {
      const projects = await Project.find({});
      res.json(projects);
    } catch (error) {
      console.log(error);
      res.status(404).json({ error: error.message });
    };
  };

  static getProjectById = async (req: Request, res: Response) => {
    try {
      res.json(req.project);
    } catch (error) {
      console.log(error);
      res.status(404).json({ error: error.message });
    };
  };

  static updateProject = async (req: Request, res: Response) => {
    try {
      await req.project.updateOne(req.body);
      res.send('Project updated successfully');
    } catch (error) {
      console.log(error);
      res.status(404).json({ error: error.message });
    };
  };

  static deleteProject = async (req: Request, res: Response) => {
    try {
      await req.project.deleteOne();
      res.send('Project deleted successfully');
    } catch (error) {
      console.log(error);
      res.status(404).json({ error: error.message });
    };
  };
};