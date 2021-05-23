export const expireTime = 60 * 60 * 24;

export const secret = 'lets_play_sum_games_man';

export const Error = {
  TOKEN: 'No token provided.',
  AUTHORIZED: 'Not authorized.',
  USERNAME_EXIST: 'Username already exist.',
  PASSWORD_MATCH: 'Passwords do not match.',
  USER_FOUND: 'User not found.',
  DATA_FOUND: 'Data not found.',
};

export const Success = {
  DATA_FETCHED: 'Data fetched.',
  GAME_CREATED: 'Game created.',
  GAME_UPDATED: 'Successfully updated.',
  GAME_DELETED: 'Successfully deleted.',
  USER_AUTHENTICATED: 'Successfully authenticated.',
};
