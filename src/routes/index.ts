import { Router } from 'express';
import usersRouter from './users.routes';
import postsRouter from './posts.routes';

const router = Router();

router.use('/users', usersRouter);
router.use('/posts', postsRouter);

export default router;