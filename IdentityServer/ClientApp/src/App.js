import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';

import { Home } from './components/Home';
import { ErrorPage } from  './components/ErrorPage';
import { LogoutPage } from  './components/LogoutPage';


import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render () {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/error' component={ErrorPage} />
                <Route path='/logout' component={LogoutPage} />
            </Layout>
        );
    }
}
