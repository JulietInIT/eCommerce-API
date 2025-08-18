import type { RequestHandler } from 'express';
import { User } from '#models';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const register: RequestHandler = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  const userExists = await User.exists({ email });
  if (userExists)
    throw new Error('Email already exists', { cause: { status: 409 } });

  const hash = await bcrypt.hash(password, 13);

  const user = await User.create({
    email,
    password: hash,
    firstName,
    lastName,
  });

  const token = jwt.sign({ jti: user._id }, process.env.ACCESS_JWT_SECRET!, {
    expiresIn: '6h',
    issuer: process.env.JWT_ISSUER,
  });

  res
    .cookie('accessToken', token, {
      httpOnly: true,
      maxAge: Number(process.env.ACCESS_TOKEN_TTL) * 1000,
    })
    .status(201)
    .json({ message: 'registered successfully', user, token });
};

export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user) throw new Error('Invalid credentials', { cause: { status: 401 } });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    throw new Error('Invalid credentials', { cause: { status: 401 } });

  const token = jwt.sign(
    { jti: user._id, roles: user.roles },
    process.env.ACCESS_JWT_SECRET!,
    {
      expiresIn: '1h',
      issuer: process.env.JWT_ISSUER,
    }
  );

  res
    .cookie('accessToken', token, {
      httpOnly: true,
      maxAge: Number(process.env.ACCESS_TOKEN_TTL) * 1000,
    })
    .json({ message: 'logged in successfully', user, token });
};

export const logout: RequestHandler = async (req, res) => {
  res.clearCookie('accessToken').json({ message: 'successfully logged out' });
};

export const me: RequestHandler = async (req, res) => {
  const user = await User.findById(req.user?.id).select('-password');

  if (!user) {
    throw new Error('User not found', { cause: { status: 404 } });
  }

  res.json({ user });
};