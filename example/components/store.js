import reduxHelper from 'next.js-redux-helper'
import wrapper from 'next.js-redux-helper/dest/wrapper'

const actionTypes = {
  SET_SELECT: 'SET_SELECT',
}

const reducers = {
  [actionTypes.SET_SELECT]: (state = {}, action) => {
    var { selected } = action
    return { ...state, selected }
  }
}

var initialState = {}
if(typeof window != 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__){
  initialState = window.__REDUX_DEVTOOLS_EXTENSION__()
}
/**
 * get initStore function
 */
const initStore = reduxHelper(reducers,initialState)
export default initStore

export const reduxWrapper = wrapper(initStore)

/**
 * async dispatch
 * @param {*} selected 
 */
export const setSelected = (selected) => async (dispatch) => {
  return dispatch({
    type: actionTypes.SET_SELECT,
    selected,
  })
}
