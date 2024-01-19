import { NextFunction, Request, Response, Router } from "express";
import PostController from "../controllers/PostController";

const postController = new PostController();

const router = Router();

router.post('/', (req: Request, res: Response, next: NextFunction) => postController.create(req, res, next));
router.get('/', (req: Request, res: Response, next: NextFunction) => postController.getAll(req, res, next));
router.get('/:id', (req: Request, res: Response, next: NextFunction) => postController.getById(req, res, next));
router.put('/:id', (req: Request, res: Response, next: NextFunction) => postController.update(req, res, next));
router.delete('/:id', (req: Request, res: Response, next: NextFunction) => postController.delete(req, res, next));

export default router;