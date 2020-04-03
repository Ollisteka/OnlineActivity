import {Link, Route, Switch} from "react-router-dom";
import React from "react";
import {MainPage} from "./MainPage";
import {Registration} from "./Registration";

export const Navigation = () => (
    <nav>
        <ul>
            <li><Link to='/'>Main</Link></li>
            <li><Link to='/registration'>Регистрация</Link></li>
        </ul>
    </nav>
);

export const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={MainPage}/>
            <Route exact path='/registration' component={Registration}/>
        </Switch>
    </main>
);
