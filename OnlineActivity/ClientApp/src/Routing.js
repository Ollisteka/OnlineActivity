import {Link, Route, Switch} from "react-router-dom";
import React, {useEffect, useState} from "react";

import {MainPage} from "./components/MainPage";
import {GamePage} from "./components/Game";
import {LeaderBoard} from "./components/Leaderboard";
import {CallbackPage} from "./components/CallbackPage";
import {logout} from "./components/UserManager";
import {WaitingRoom} from "./components/WaitingRoom";
import "./Routing.css";

const gamePage = '/game/:id';
const leaderBoardPage = '/leaderboard';
const callbackPage = '/callback';
const waitRoomPage = '/waitroom/:id';

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
                    <li><button onClick={() => window.location = `/`} className={'nav-button'}>Главная</button></li>
                    <li><button onClick={() => window.location = leaderBoardPage}className={'nav-button'}>Лидерборд</button></li>
                    <li><button className={'nav-button'} onClick={logout}>Выйти</button></li>
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
                    <Route path={waitRoomPage} component={WaitingRoom}/>
                    <Route exact path={gamePage} component={GamePage}/>
                    <Route exact path={leaderBoardPage} component={LeaderBoard}/>
                </Switch>
                :
                <Switch>
                    <Route exact path='/' component={MainPage}/>
                    <Route exact path={callbackPage} component={CallbackPage}/>
                </Switch>
            }
        </main>)
};