import { Router } from 'express';
import { UsersService } from './users.service.js';

export class UsersController {
  constructor() {
    this.userService = new UsersService();
    this.router = Router();
    this.routes();
  }

  create = async (req, res, next) => {
    try {
      const userDto = req.body.user;
      const user = await this.userService.create(userDto);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  };

  login = async (req, res, next) => {
    try {
      const userDto = req.body.user;
      const authenticatedUser = await this.userService.signIn(userDto);
      res.json({
        ...authenticatedUser,
        message: 'Successfully authenticated.',
      });
    } catch (err) {
      next(err);
    }
  };

  routes() {
    this.router.post('/signup', this.create);
    this.router.post('/signin', this.login);
  }
}
