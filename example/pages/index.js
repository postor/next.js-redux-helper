

import { connect } from 'react-redux'
import Header from '../components/Header'
import { reduxWrapper, setSelected } from '../components/store'

const Index = (props) => (<div>
  <Header />
  <h1>You selected: {props.selected}</h1>
</div>)

Index.getInitialProps = async (ctx) => {
  return await ctx.store.dispatch(setSelected('C'))
}

export default reduxWrapper(connect(state => state)(Index))