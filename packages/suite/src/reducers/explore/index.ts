import { combineReducers } from 'redux';
import FavoriteReducer from './FavoriteReducer';

const ExploreReducers = combineReducers({
    favorite: FavoriteReducer,
});

export default ExploreReducers;
