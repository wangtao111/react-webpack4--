import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Link
} from 'react-router-dom';
import browserHistory from 'react-router';
import lazyLoad from './lazy.js'
import Home from 'bundle-loader?lazy&name=home!./home/home';
import Counter from 'bundle-loader?lazy&name=counter!./count/Counter';

export default class App extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <div>
                    <ul>
                        <li><Link to="/home">Home2</Link></li>
                        <li><Link to="/topics">Topicssad</Link></li>
                        <li><Link to="/counter">Counter</Link></li>
                    </ul>
                    <hr/>
                    <Route exact  path="/" render={()=>
                        <Redirect to="/home"/>
                    }/>
                    <Route path="/home" render={()=>{
                        return lazyLoad(Home);
                    }}/>
                    <Route path="/topics" component={Topics}/>
                    <Route path="/counter" render={()=>{
                        return lazyLoad(Counter);
                    }}/>
                </div>
            </Router>
        );
    }
}
const Topics = ({ match }) => (
    <div>
        <h2>Topics</h2>
        <ul>
            <li>
                <Link to={`${match.url}/props-v-state`}>
                    Props v. State
                </Link>
            </li>
        </ul>

        <Route path={`${match.url}/:topicId`} component={Topic}/>
        <Route exact path={match.url} render={() => (
            <h3>Please select a topic.</h3>
        )}/>
    </div>
)
const Topic = ({ match }) => (
    <div>
        <h3>{match.params.topicId}</h3>
    </div>
)
