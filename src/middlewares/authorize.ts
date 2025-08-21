import type { RequestHandler } from 'express';
import { Post } from '#models';

const authorize: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findById(id);

  if (!post) {
    return next(new Error('Post not found', { cause: { status: 404 } }));
  }

  if (req.user?.roles?.includes('admin')) {
    return next();
  }

  if (post.author.toString() !== req.user?.id) {
    return next(
      new Error('Forbidden, you cannot modify this post', {
        cause: { status: 403 },
      })
    );
  }

  next();
};

export default authorize;