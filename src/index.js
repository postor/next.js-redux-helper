import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

export const helperAction = '@@helper_init'
const helperReducer = (state = {}, action) => {
  return {
    ...state,
    ...action.state,
  }
}


// REDUCERS
const getReducer = (reducers = {}) => {
  if (reducers[helperAction]) throw `do not use ${helperAction} in your reducers`

  const helperReducers = {
    '@@INIT': (state = {}, action) => state,
    '@@redux/INIT': (state = {}, action) => state,
    ...reducers,
    [helperAction]: helperReducer,
  }

  return (state = {}, action) => {
    if (helperReducers[action.type]) return helperReducers[action.type](state, action)
    console.log('unhandled action:' + JSON.stringify(action))
    return state
  }
}


export default (reducers, initialState) => () => {
  return createStore(getReducer(reducers), initialState, applyMiddleware(thunkMiddleware))
}

