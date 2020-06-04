import {Link, Route, Switch} from "react-router-dom";
import React, {useEffect, useState} from "react";

import {MainPage} from "./components/MainPage";
import {GamePage} from "./components/Game";
import {LeaderBoard} from "./components/Leaderboard";
import {CallbackPage} from "./components/CallbackPage";
import {logout} from "./components/UserManager";
import {WaitingRoom} from "./components/WaitingRoom";
import Button from "@skbkontur/react-ui/Button";

const gamePage = '/game';
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
                    <Route exact path={gamePage} component={GamePage}/>
                    <Route exact path={leaderBoardPage} component={LeaderBoard}/>
                    <Route path={waitRoomPage} component={WaitingRoom}/>

                </Switch>
                :
                <Switch>
                    <Route exact path='/' component={MainPage}/>
                    <Route exact path={callbackPage} component={CallbackPage}/>
                </Switch>
            }
        </main>)
};