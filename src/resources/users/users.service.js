import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from './user.model.js';
import { CustomError } from '../../middleware/error.js';

export class UsersService {
  constructor() {
    this.userModel = UserModel;
  }

  async create(userDto) {
    try {
      const user = await this.userModel.create({
        full_name: userDto.full_name,
        username: userDto.username,
        passwordHash: bcrypt.hashSync(userDto.password, 10),
        email: userDto.email,
      });
      const token = jwt.sign({ id: user.id }, 'lets_play_sum_games_man', {
        expiresIn: 60 * 60 * 24,
      });
      return { user, token };
    } catch (err) {
      if (err.parent?.code === '23505') {
        throw new CustomError(409, 'Username already exist');
      } else {
        throw new CustomError(500, err.message);
      }
    }
  }

  async signIn(userDto) {
    const user = await this._findByUsername(userDto.username);
    const passCheck = await bcrypt.compare(userDto.password, user.passwordHash);
    if (!passCheck) {
      throw new CustomError(502, 'Passwords do not match.');
    }
    const token = jwt.sign({ id: user.id }, 'lets_play_sum_games_man', {
      expiresIn: 60 * 60 * 24,
    });
    return { user, sessionToken: token };
  }

  async _findByUsername(username) {
    const user = await this.userModel.findOne({ where: { username } });
    if (!user) {
      throw new CustomError(403, 'User not found.');
    }
    return user;
  }
}
