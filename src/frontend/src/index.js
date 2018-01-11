import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Navigation from './components/Navigation'
import CompletedPolls from './components/completedPolls'
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Switch>
                <Route path='/:poll(\d+)/result' component={CompletedPolls}/>
                <Route path="/:poll(\d+)" component={App}/>
                <Route exact path="/" component={Navigation}/>
                <Redirect to="/"/>
            </Switch>
        </div>
    </BrowserRouter>,
    document.getElementById('root'));
registerServiceWorker();
