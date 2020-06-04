import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import Gapped from "@skbkontur/react-ui/Gapped";
import Button from "@skbkontur/react-ui/Button";
import Input from "@skbkontur/react-ui/Input";

import './MainPage.module.css';
import {logIn, manager} from "./UserManager";
import {WaitingRoom} from "./WaitingRoom";

const newGameId = '1234-abcd';

const JoinGame = () => {
    const gameIdPlaceholder = 'Идентификатор игры';
    return (
        <form className={'vertical'} action={''} method={'XXX'}>
            <Input placeholder={gameIdPlaceholder} required/>
            <Button onClick={() => {
                window.location = `/waitroom/${gameIdPlaceholder}`
            }}>Присоединиться</Button>
        </form>
    );
};

const InitGame = () => (
    <Gapped gap={20} vertical>
        <Button
            onClick={() => {
                window.location = "/waitroom/:id"
            }}>Начать новую игру</Button>
        <JoinGame/>
    </Gapped>
);

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
            {loggedOn ? <InitGame/> : <Button className={'main-page_button'} use={'primary'}
                                              onClick={logIn}>Войти</Button>}
        </div>
    );
};

MainPage.propTypes = {
    loggedOn: PropTypes.bool
};

export class LoggedOnPage {
}