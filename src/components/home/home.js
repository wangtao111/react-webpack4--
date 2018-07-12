/**
 * Created by Administrator on 2017/6/1.
 */
import React from 'react';
import { HashLocation } from 'react-router';
import { Input } from 'antd';
class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            username: '',
            password: '',
            warningWords: ''
        };
    }
    componentWillMount = () => {
    };
    login = () => {
    };
    render = () => {
        const {username, password, warningWords } = this.state;
        return (
            <div id="login">
                <Input style={window.ActiveXObject !== undefined ? {paddingTop: '15px'} : {}}
                       id="user"
                       value={username}
                       onChange={
                           (e) => {
                               this.setState({
                                   username: e.target.value
                               });
                           }
                       }
                       placeholder="用户名"
                       size="large"/>
            </div>)
    }
}
Home.propTypes = {
};
export default Home;
