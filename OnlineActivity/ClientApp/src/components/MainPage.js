import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';

import {InitGame} from "./GameInition";

import './MainPage.css';
import {logIn, manager} from "./UserManager";

export async function isLogged() {
    const user = await manager.getUser();

    return user !== null;
}

export const MainPage = () => {
    const [loggedOn, setLoggedOn] = useState(false);

    useEffect(async () => {

        setLoggedOn(await isLogged())
    }, []);

    return (
        <div className={'main-page'}>
            <header className={'main-page_header'}>
                Online Activity
            </header>
            {loggedOn ? <InitGame/> : <button className={'main-page_button'} 
                                              onClick={logIn}>Войти</button>}
        </div>
    );
};

MainPage.propTypes = {
    loggedOn: PropTypes.bool
};