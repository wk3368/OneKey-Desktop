import produce from 'immer';
import * as FAVORITE from '@explore-actions/constants/FavoriteConstants';
import { Action } from '@suite-types';
import { STORAGE } from '@suite-actions/constants';

const FavoriteReducer = (state: string[] = [], action: Action): string[] => {
    return produce(state, draft => {
        switch (action.type) {
            case FAVORITE.ADD:
                if (draft.includes(action.payload)) return;
                draft.push(action.payload);
                break;
            case FAVORITE.REMOVE:
                return draft.filter(item => item !== action.payload);
            case STORAGE.LOADED:
                return action.payload.explore.favorite;
            // no default
        }
    });
};

export default FavoriteReducer;
