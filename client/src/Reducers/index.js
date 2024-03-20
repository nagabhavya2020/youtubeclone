import { combineReducers } from 'redux'; 
import authReducer from "./auth"
import currentUserReducer from './currentUser';
import chanelReducers from './chanel';
import subscriberReducer from './subscriber';
import videoReducer from './Video';
import likedVideoReducer from './likeVideo'
import watchLaterReducer from './watchLater';
import HistoryReducer from './history';
import commentReducer from './comments';

 export default combineReducers({
   authReducer,
   currentUserReducer,
   chanelReducers,
   videoReducer,
   likedVideoReducer,
   watchLaterReducer,
   HistoryReducer, 
   commentReducer,
   subscriberReducer,
});