import express from 'express';
import { sequelize } from './db.js';
import { validateSession } from './src/middleware/validate-session.js';
import { handleError } from './src/middleware/error.js';
import { UsersController } from './src/resources/users/users.controller.js';
import { GamesController } from './src/resources/games/games.controller.js';

class App {
  constructor() {
    this.app = express();
    this.usersController = new UsersController();
    this.gamesController = new GamesController();
    sequelize.sync();
    this.routes();
  }

  routes() {
    this.app.use(express.json());

    this.app.use('/api/auth', this.usersController.router);
    this.app.use(validateSession);
    this.app.use('/api/game', this.gamesController.router);

    this.app.use((err, req, res, next) => {
      handleError(err, res);
      next();
    });
  }

  start() {
    this.app.listen(4000, () => {
      console.log('App is listening on 4000');
    });
  }
}

const app = new App();
app.start();
