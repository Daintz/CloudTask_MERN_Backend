import { Router } from "express";
import { body } from "express-validator"
import { projectController } from "../controllers/projectController";
import { handleInputErrors } from "../middleware/validation";

const router = Router();

router.post('/',
  body('projectName')
    .notEmpty().withMessage('The name of project is obligatory'),
  body('clientName')
    .notEmpty().withMessage('The client name of project is obligatory'),
  body('description')
    .notEmpty().withMessage('The description of project is obligatory'),
  handleInputErrors,
  projectController.createProject
);
router.get('/', projectController.getAllProjects);

export default router;