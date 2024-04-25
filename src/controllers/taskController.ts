import type { Request, Response } from 'express';

import Task from '../models/Task';

export class TaskController {
  static createTask = async (req: Request, res: Response) => {
    try {
      const task = new Task(req.body);
      task.project = req.project.id;
      req.project.tasks.push(task.id);
      await Promise.allSettled([task.save(), req.project.save()])
      res.send('Task created successfully');
    } catch (error) {
      console.log(error);
      res.status(404).json({ error: error.message });
    };
  };

  static getProjectTasks = async (req: Request, res: Response) => {
    try {
      const tasks = await Task.find({ project: req.project.id }).populate('project');
      res.json(tasks);
    } catch (error) {
      console.log(error);
      res.status(404).json({ error: error.message });
    }
  };

  static getTaskById = async (req: Request, res: Response) => {
    const { projectId, taskId } = req.params;
    console.log(projectId, taskId);

    try {
      const task = await Task.findById(taskId);
      if (task.project.id.toString() === projectId) {
        res.json(task);
      } else {
        res.status(404).json({ error: 'Task not found' });
      }
    } catch (error) {
      console.log(error);
      res.status(404).json({ error: error.message });
    }
  };
};
