# next-redux-helper

make redux easier to work in next.js both server side and client side, support async and ssr | 让redux在next.js的服务端和浏览器端更容易使用，支持服务端渲染

quick glance:

[![quick glance](https://img.youtube.com/vi/i_01Tmg3fSY/0.jpg)](https://www.youtube.com/watch?v=i_01Tmg3fSY&list=PLM1v95K5B1ntVsYvNJIxgRPppngrO_X4s)

## basic | 基本使用

```
import reduxHelper from 'next.js-redux-helper'
import wrapper from 'next.js-redux-helper/dest/wrapper'

const initStore = reduxHelper(reducers, initialState)
const reduxWrapper = wrapper(initStore)

export default reduxWrapper(connect(state=>state)(Page))

```


## async action | 异步事件

```
//in redux
export const login = (username, passwd) => dispatch => {
  var form = JSON.stringify({ username, passwd })

  return fetch('/api/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: form
  })
    .then(r => r.json())
    .then((user) => {
      if (user.error) {
        return Promise.reject(user.error)
      }
      return user
    })
    .then((user) => {
      return dispatch({
        type: actionTypes.login,
        user
      })
    })
}

// in component
handleLogin() {
    const { dispatch } = this.props
    dispatch(login(this.refs.username.value, this.refs.passwd.value))
      .catch((e) => {
        alert('登录失败:' + e)
      })
  }
```

## ssr | 服务端渲染

```
static async getInitialProps(ctx) {
  //user
  const { store, req } = ctx
  if (store && req) {
    const user = req.cookies.user
    await store.dispatch(set(user))
  }
}
```

## with i18next

```

import reduxHelper from 'next.js-redux-helper'
import wrapper from 'next.js-redux-helper/dest/wrapper'
import { wrapper as i18nWrapper } from './i18n'

const initStore = reduxHelper(reducers, initialState)
const reduxWrapper = wrapper(initStore)

const FinalPage = reduxWrapper(i18nWrapper(Page))
```

about i18n: https://github.com/nextjs-boilerplate/next-i18n-helper
