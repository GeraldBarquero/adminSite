import * as actionType from './types';
export const setToken = (data) => { 
    return { 
      type: actionType.SET_TOKEN, 
      data 
    } 
  }
export const setRole = (data) => { 
    return { 
      type: actionType.SET_ROLE, 
      data 
    } 
  }