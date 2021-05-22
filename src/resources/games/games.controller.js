import { Router } from 'express';
import { GamesService } from './games.service.js';

export class GamesController {
  constructor() {
    this.gamesService = new GamesService();
    this.router = Router();
    this.routes();
  }

  getAll = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const games = await this.gamesService.getAll(userId);
      res.status(200).json({
        games,
        message: 'Data fetched.',
      });
    } catch (err) {
      next(err);
    }
  };

  getById = async (req, res, next) => {
    try {
      const gameId = req.params.id;
      const userId = req.user.id;
      const game = await this.gamesService.getById(gameId, userId);
      res.status(200).json({ game });
    } catch (err) {
      next(err);
    }
  };

  create = async (req, res, next) => {
    try {
      const gameDto = req.body.game;
      const userId = req.user.id;
      const game = await this.gamesService.create(gameDto, userId);
      res.status(200).json({
        game,
        message: 'Game created.',
      });
    } catch (err) {
      next(err);
    }
  };

  update = async (req, res, next) => {
    try {
      const gameId = req.params.id;
      const gameDto = req.body.game;
      const userId = req.user.id;
      const updatedGame = await this.gamesService.update(
        gameId,
        gameDto,
        userId
      );
      res.status(200).json({
        game: updatedGame,
        message: 'Successfully updated.',
      });
    } catch (err) {
      next(err);
    }
  };

  delete = async (req, res, next) => {
    try {
      const gameId = req.params.id;
      const userId = req.user.id;
      await this.gamesService.delete(gameId, userId);
      res.status(200).json({
        message: 'Successfully deleted.',
      });
    } catch (err) {
      next(err);
    }
  };

  routes() {
    this.router.get('/all', this.getAll);
    this.router.get('/:id', this.getById);
    this.router.post('/create', this.create);
    this.router.put('/update/:id', this.update);
    this.router.delete('/remove/:id', this.delete);
  }
}
