import { Router } from "express";
import { projectController } from "../controllers/projectController";

const router = Router();

router.post('/', projectController.createProject);
router.get('/', projectController.getAllProjects);

export default router;