import { Router } from "express";
import { body, param } from "express-validator"
import { projectController } from "../controllers/projectController";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/taskController";
import { validateProjectExists } from "../middleware/project";

const router = Router();

const validateInput = [
  body('projectName').notEmpty().withMessage('The name of project is obligatory'),
  body('clientName').notEmpty().withMessage('The client name of project is obligatory'),
  body('description').notEmpty().withMessage('The description of project is obligatory')
];

router.post('/',
  validateInput,
  handleInputErrors,
  projectController.createProject
);
router.get('/', projectController.getAllProjects);

router.get('/:id',
  param('id').isMongoId().withMessage('Invalid ID'),
  validateProjectExists,
  handleInputErrors,
  projectController.getProjectById
);

router.put('/:id',
  param('id').isMongoId().withMessage('Invalid ID'),
  validateProjectExists,
  validateInput,
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
  TaskController.createTask
);

export default router;