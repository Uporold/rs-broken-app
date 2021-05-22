import jwt from 'jsonwebtoken';
import { UserModel } from '../resources/users/user.model.js';

export const validateSession = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next(); // allowing options as a method for request
  } else {
    const sessionToken = req.headers.authorization;
    console.log(sessionToken);
    if (!sessionToken)
      return res
        .status(403)
        .send({ auth: false, message: 'No token provided.' });
    try {
      const decoded = jwt.verify(sessionToken, 'lets_play_sum_games_man');
      const user = await UserModel.findOne({ where: { id: decoded.id } });
      req.user = user;
      console.log(`user: ${user}`);
      next();
    } catch (err) {
      res.status(401).send({ error: 'not authorized' });
    }
  }
};
