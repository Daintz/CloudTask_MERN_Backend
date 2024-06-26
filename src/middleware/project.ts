import type { Request, Response, NextFunction } from 'express';
import Project, { IProject } from '../models/Project';

declare global {
  namespace Express {
    interface Request {
      project: IProject;
    }
  }
};

export async function validateProjectExists( req: Request, res: Response, next: NextFunction) {
  try {
    const { projectId, id } = req.params;
    const project = await Project.findById(projectId || id);

    if (!project) {
      const error = new Error('Project not found');
      return res.status(404).json({ error: error.message });
    };

    req.project = project;
    next();
  } catch (error) {
    res.status(500).json({error: 'There are an error'});
  };
};

export async function validateProjectExistsForId( req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const project = await Project.findById(id).populate('tasks');

    if (!project) {
      const error = new Error('Project not found');
      return res.status(404).json({ error: error.message });
    };

    req.project = project;
    next();
  } catch (error) {
    res.status(500).json({error: 'There are an error'});
  };
};
