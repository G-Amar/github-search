const alertReducer = (state, action) => {
  switch(action.type) {
    
    //dont have to always deconstruct state, can set state to anything
    case 'SET_ALERT':
      return action.payload
      
    case 'REMOVE_ALERT':
      return null

    default:
      return state
  }
}

export default alertReducer