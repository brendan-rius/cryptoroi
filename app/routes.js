import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import Index from './containers/Index';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Index}/>
    </Route>
);
