import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from './user.model.js';
import { CustomError } from '../../middleware/error.js';
import { secret, Error, expireTime } from '../../util/const.js';

export class UsersService {
  constructor() {
    this.userModel = UserModel;
  }

  async create(userDto) {
    try {
      const user = await this.userModel.create({
        full_name: userDto.full_name,
        username: userDto.username,
        passwordHash: await bcrypt.hash(userDto.password, 10),
        email: userDto.email,
      });
      const token = jwt.sign({ id: user.id }, secret, {
        expiresIn: expireTime,
      });
      return { user, token };
    } catch (err) {
      if (err.parent?.code === '23505') {
        throw new CustomError(409, Error.USERNAME_EXIST);
      } else {
        throw new CustomError(500, err.message);
      }
    }
  }

  async signIn(userDto) {
    const user = await this._findByUsername(userDto.username);
    const passCheck = await bcrypt.compare(userDto.password, user.passwordHash);
    if (!passCheck) {
      throw new CustomError(502, Error.PASSWORD_MATCH);
    }
    const token = jwt.sign({ id: user.id }, secret, {
      expiresIn: expireTime,
    });
    return { user, sessionToken: token };
  }

  async _findByUsername(username) {
    const user = await this.userModel.findOne({ where: { username } });
    if (!user) {
      throw new CustomError(403, Error.USER_FOUND);
    }
    return user;
  }
}
