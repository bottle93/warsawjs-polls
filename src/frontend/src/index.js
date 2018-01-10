import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Navigation from './components/Navigation'
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Link } from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route path="/:poll" component={App}/>
            <Route exact path="/" component={Navigation}/>
        </div>
    </BrowserRouter>,
    document.getElementById('root'));
registerServiceWorker();
