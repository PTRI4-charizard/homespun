import * as actionNames from '../constants/actionNames';
import { AnyAction } from 'redux'
 
  const initialState = {
   skills: ['']
  };
  
  const connectionsReducer = (state = initialState, action: AnyAction) => {
 
    switch (action.type) {

      
      default: {
        return state;
      }
    }
  };
  
  export default connectionsReducer;
  