import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

export const helperAction = '@@helper_init'
const helperReducer = (state = {}, action) => action.state


// REDUCERS
const getReducer = (reducers = {}) => {
  if (reducers[helperAction]) throw `do not use ${helperAction} in your reducers`

  return (state = {}, userAction) => {
    const action = {
      '@@init': (state = {}, action) => state,
      ...userAction,
      [helperAction]: helperReducer,
    }
    if (reducers[action.type]) return reducers[action.type](state, action)
    console.log('unhandled action:' + JSON.stringify(action))
    return state
  }
}


export default (reducers) => (initialState = {}) => {
  return createStore(getReducer(reducers), initialState, applyMiddleware(thunkMiddleware))
}

