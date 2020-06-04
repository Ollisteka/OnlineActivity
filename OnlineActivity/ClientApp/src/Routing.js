import {Link, Route, Switch} from "react-router-dom";
import React, {useEffect, useState} from "react";

import {LoggedOnPage, MainPage} from "./components/MainPage";
import {GamePage} from "./components/Game";
import {LeaderBoard} from "./components/Leaderboard";
import {CallbackPage} from "./components/CallbackPage";
import {logout, manager} from "./components/UserManager";
import Button from "@skbkontur/react-ui/Button";

export const registrationPage = '/registration';
export const loginPage = '/login';
const homePage = '/home';
const gamePage = '/game';
const leaderBoardPage = '/leaderboard';
const callbackPage = '/callback';

import {isLogged} from './components/MainPage';

export const Navigation = () => {
    const [loggedOn, setLoggedOn] = useState(false);

    useEffect(async () => {

        setLoggedOn(await isLogged())
    }, []);

    return (
        <nav>
            {loggedOn ?
                <ul>
                    <li><Link to='/'>Main</Link></li>
                    <li><Link to={gamePage}>Игровое поле</Link></li>
                    <li><Link to={leaderBoardPage}>Лидерборд</Link></li>
                    <li><Button use={'primary'} onClick={logout}>Выйти</Button></li>
                </ul>
            :
            null}
        </nav>
    )
};

export const Main = () => {
    const [loggedOn, setLoggedOn] = useState(false);

    useEffect(async () => {

        setLoggedOn(await isLogged())
    }, []);

    return (
        <main>
            {loggedOn ?
                <Switch>
                    <Route exact path='/' component={MainPage}/>
                    <Route exact path={callbackPage} component={CallbackPage}/>
                </Switch>
                :
                <Switch>
                    <Route exact path='/' component={MainPage}/>
                    <Route exact path={gamePage} component={GamePage}/>
                    <Route exact path={leaderBoardPage} component={LeaderBoard}/>
                    <Route exact path={callbackPage} component={CallbackPage}/>
                </Switch>
            }
        </main>)
};
