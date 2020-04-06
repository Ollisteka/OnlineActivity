import {Link, Route, Switch} from "react-router-dom";
import React from "react";
import {LoggedOnPage, MainPage} from "./MainPage";
import {Registration} from "./Registration";
import {GamePage} from "./Game";
import {LeaderBoard} from "./Leaderboard";

const registrationPage = '/registration';
const homePage = '/home';
const gamePage = '/game';
const leaderBoardPage = '/leaderboard';

export const Navigation = () => (
    <nav>
        <ul>
            <li><Link to='/'>Main</Link></li>
            <li><Link to={registrationPage}>Регистрация</Link></li>
            <li><Link to={homePage}>После регистрации</Link></li>
            <li><Link to={gamePage}>Игровое поле</Link></li>
            <li><Link to={leaderBoardPage}>Лидерборд</Link></li>
        </ul>
    </nav>
);

export const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={MainPage}/>
            <Route exact path={registrationPage} component={Registration}/>
            <Route exact path={homePage} component={LoggedOnPage}/>
            <Route exact path={gamePage} component={GamePage}/>
            <Route exact path={leaderBoardPage} component={LeaderBoard}/>
        </Switch>
    </main>
);
