import React from 'react';
import {connect} from 'react-redux';
import './Counter.less'
import {LOGIN_LOADING} from "../../store/actions";
const COUNT_STEP = 10;

class Counter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: 1};
  }

  componentDidMount() {
    this.timeout = setTimeout(this.handleTimeoutEvent.bind(this), 1000);
    console.log(1212, this.props.entities);
  }

  componentWillUnmount() {
    this.timeout && clearTimeout(this.timeout);
  }

  handleTimeoutEvent() {
    this.setState({value: this.state.value + COUNT_STEP}, () => {
      this.timeout = setTimeout(this.handleTimeoutEvent.bind(this), 1000);
    });
  }

  render() {
    const {entities, loginPageData} = this.props;
    return (
      <div>
        <p className='sss'> This is a ct112er1: {this.state.value} </p>
        <div onClick={loginPageData}>
            {entities.loginUser}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
    return{
        entities: state.entities
    }
}
function mapDispatchToProps(dispatch, ownProps) {
    return {
        loginPageData: () => dispatch({
            type: 'LOGIN_LOADING',
            payload: 'LOGIN_LOADING'
        }),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Counter)
