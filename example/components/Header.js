
const Header = (props) => (
  <select value={props.selected} onChange={(e) => setSelect(e.target.value)} >
    <option value="A"></option>
    <option value="B"></option>
    <option value="C"></option>
  </select >)

