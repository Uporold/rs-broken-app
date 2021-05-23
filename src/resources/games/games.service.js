import { GameModel } from './game.model.js';
import { CustomError } from '../../middleware/error.js';
import { Error } from '../../util/const.js';

export class GamesService {
  constructor() {
    this.gamesModel = GameModel;
  }

  async getAll(userId) {
    const games = await this.gamesModel.findAll({
      where: { owner_id: userId },
    });
    if (!games) {
      throw new CustomError(500, Error.DATA_FOUND);
    }
    return games;
  }

  async getById(id, userId) {
    const game = await this.gamesModel.findOne({
      where: { id, owner_id: userId },
    });
    if (!game) {
      throw new CustomError(500, Error.DATA_FOUND);
    }

    return game;
  }

  async create(gameDto, userId) {
    try {
      return await this.gamesModel.create({
        title: gameDto.title,
        owner_id: userId,
        studio: gameDto.studio,
        esrb_rating: gameDto.esrb_rating,
        user_rating: gameDto.user_rating,
        have_played: gameDto.have_played,
      });
    } catch (err) {
      throw new CustomError(500, err.message);
    }
  }

  async update(id, gameDto, userId) {
    const game = await this.getById(id, userId);
    game.title = gameDto.title;
    game.studio = gameDto.studio;
    game.esrb_rating = gameDto.esrb_rating;
    game.user_rating = gameDto.user_rating;
    game.have_played = gameDto.have_played;
    try {
      await game.save();
      return game;
    } catch (err) {
      throw new CustomError(500, err.message);
    }
  }

  async delete(id, userId) {
    await this.getById(id, userId);
    try {
      await this.gamesModel.destroy({
        where: {
          id,
          owner_id: userId,
        },
      });
    } catch (err) {
      throw new CustomError(500, err.message);
    }
  }
}
