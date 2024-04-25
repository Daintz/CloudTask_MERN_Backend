import { Router } from "express";
import { body, param } from "express-validator"
import { projectController } from "../controllers/projectController";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/taskController";
import { validateProjectExists, validateProjectExistsForId } from "../middleware/project";

const router = Router();

const validateInputsProject = [
  body('projectName').notEmpty().withMessage('The name of project is obligatory'),
  body('clientName').notEmpty().withMessage('The client name of project is obligatory'),
  body('description').notEmpty().withMessage('The description of project is obligatory')
];

const validateInputsTask = [
  body('name').notEmpty().withMessage('The name is obligatory'),
  body('description').notEmpty().withMessage('The description of project is obligatory')
];

router.post('/',
  validateInputsProject,
  handleInputErrors,
  projectController.createProject
);
router.get('/', projectController.getAllProjects);

router.get('/:id',
  param('id').isMongoId().withMessage('Invalid ID'),
  validateProjectExistsForId,
  handleInputErrors,
  projectController.getProjectById
);

router.put('/:id',
  param('id').isMongoId().withMessage('Invalid ID'),
  validateProjectExists,
  validateInputsProject,
  handleInputErrors,
  projectController.updateProject
);

router.delete('/:id',
  param('id').isMongoId().withMessage('Invalid ID'),
  validateProjectExists,
  handleInputErrors,
  projectController.deleteProject
);

/* ROUTES FOR TASK */
router.post('/:projectId/tasks',
  validateProjectExists,
  validateInputsTask,
  TaskController.createTask
);

router.get('/:projectId/tasks',
  validateProjectExists,
  TaskController.getProjectTasks
);

router.get('/:projectId/tasks/:taskId',
  validateProjectExists,
  TaskController.getProjectTasks
);

export default router;