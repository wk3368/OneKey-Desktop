import * as Favorite from './constants/FavoriteConstants';

import { Dispatch, GetState } from '@suite-types';

export type FavoriteAction =
    | {
          type: typeof Favorite.ADD;
          payload: string;
      }
    | {
          type: typeof Favorite.REMOVE;
          payload: string;
      };

export const addFavorite = (payload: string) => (dispatch: Dispatch) => {
    dispatch({ type: Favorite.ADD, payload });
};

export const getFavorite = () => (_dispatch: Dispatch, getState: GetState) => {
    return getState().explore.favorite;
};

export const removeFavorite = (payload: string) => (dispatch: Dispatch) => {
    dispatch({ type: Favorite.REMOVE, payload });
};
