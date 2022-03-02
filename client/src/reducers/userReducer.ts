
 import * as actionNames from '../constants/actionNames';
 import { AnyAction } from 'redux'
 
  const initialState = {
   skills: ['']
  };
  
  const userReducer = (state = initialState, action: AnyAction) => {
 
    switch (action.type) {
      case actionNames.SET_USER_INFO:
      
      default: {
        return state;
      }
    }
  };
  
  export default userReducer;
  