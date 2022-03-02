 import { combineReducers } from 'redux';

 import skillsReducer from './skillsReducer';
 import userReducer from './userReducer';
 import connectionsReducer from './connectionsReducer';
 
 const reducers = combineReducers({
   skills: skillsReducer,
   connections: connectionsReducer,
   user: userReducer
 });
 
 // make the combined reducers available for import
 export default reducers;
 
 