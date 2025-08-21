import { Router } from 'express';
import {
  createPost,
  deletePost,
  getAllPosts,
  getSinglePost,
  updatePost,
} from '#controllers';
import { authenticate, authorize } from '#middlewares';

const postRouter = Router();

// prettier-ignore
postRouter
.route('/')
.get(getAllPosts)
.post(authenticate, createPost)

// prettier-ignore
postRouter
.route('/:id')
.get(getSinglePost)
.put(authenticate, authorize, updatePost)
.delete(authenticate, authorize, deletePost)

export default postRouter;