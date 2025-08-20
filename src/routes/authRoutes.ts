import { Router } from 'express';
import { login, logout, me, register } from '#controllers';

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.delete('/logout', logout);

export default authRouter;