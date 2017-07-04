import { connect } from 'react-redux'
import { setSelected } from './store'

const Header = (props) => (
  <select value={props.selected} onChange={(e) => props.dispatch(setSelected(e.target.value))} >
    <option value="A">A</option>
    <option value="B">B</option>
    <option value="C">C</option>
  </select >)

export default connect(state => state)(Header)

