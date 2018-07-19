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
                    {/*<ul>*/}
                        {/*<li><Link to="/home">Home2</Link></li>*/}
                        {/*<li><Link to="/topics">Topicssad</Link></li>*/}
                        {/*<li><Link to="/counter">Counter</Link></li>*/}
                    {/*</ul>*/}
                    <hr/>
                    <Route exact  path="/" render={()=>
                        <Redirect to="/home"/>
                    }/>
                    <Route path="/home" render={()=>{
                        return lazyLoad(Home);
                    }}/>
                    <Route path="/counter" render={()=>{
                        return lazyLoad(Counter);
                    }}/>
                </div>
            </Router>
        );
    }
}

