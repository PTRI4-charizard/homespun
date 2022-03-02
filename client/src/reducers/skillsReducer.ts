
 import * as actionNames from '../constants/actionNames';
import { AnyAction } from 'redux'

 const initialState = {
  skills: ['']
 };
 
 const skillsReducer = (state = initialState, action: AnyAction) => {

   switch (action.type) {
     case actionNames.ADD_SKILL:
       const skills = state.skills.slice();
       skills.push(action.payload);
       return {
        ...state,
        skills
       };
     
     default: {
       return state;
     }
   }
 };
 
 export default skillsReducer;
 