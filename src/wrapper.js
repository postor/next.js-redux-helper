import React from 'react'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import { helperAction } from './index'

export default (initStore) => (Page) => withRedux(initStore)(class Wrapper extends React.Component {
  constructor(props) {
    super(props)
    const { dispatch, url, storeState } = props

    storeState && dispatch({
      type: helperAction,
      state: storeState
    })
  }

  static async getInitialProps(ctx) {
    var pageInitialProps = {}
    Page.getInitialProps && (pageInitialProps = await Page.getInitialProps(ctx))

    if (!ctx.isServer) return { pageInitialProps }

    const storeState = ctx.store.getState()
    return {
      pageInitialProps,
      storeState
    }
  }

  render() {
    const { pageInitialProps = {} } = this.props
    var props = Object.assign(pageInitialProps,this.props)
    delete props.pageInitialProps
    delete props.storeState

    return <Page {...props} />
  }
})


