import React, {useState, useEffect, useRef} from "react";
import PropTypes from 'prop-types';
import Gapped from "@skbkontur/react-ui/Gapped";
import Button from "@skbkontur/react-ui/Button";
import Input from "@skbkontur/react-ui/Input";

import './MainPage.module.css';
import {logIn, manager} from "./UserManager";
import Cookies from "js-cookie";
import * as signalR from "@microsoft/signalr";

const newGameId = '1234-abcd';

const JoinGame = () => {
    const [connection, setConnection] = useState(undefined);
    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl("/waitingroom")
            .build();

        connection.start().then(_ => setConnection(connection));

        return () => {
            connection.stop().then(_ => setConnection(undefined))
        }
    }, []);

    const input = useRef(null);
    const gameIdPlaceholder = 'Идентификатор игры';
    return (
        <form className={'vertical'} action={''} method={'XXX'}>
            <Input ref={input} placeholder={gameIdPlaceholder} required/>
            <Button onClick={async () => {
                const gameId = input.current.input.value;
                const userId = Cookies.get("UserId");
                await connection.invoke("ConnectToGame", {
                    userId,
                    gameId
                });
                window.location = `/waitroom/${gameId}`
            }}>Присоединиться</Button>
        </form>
    );
};

async function createGame() {
    const userId = Cookies.get("UserId");
    const response = await fetch("api/v1/games", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "creatorId": userId
        })
    });
    const data = await response.json();
    return data.id;
}


const InitGame = () => {
    const [connection, setConnection] = useState(undefined);
    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl("/waitingroom")
            .build();

        connection.start().then(_ => setConnection(connection));

        return () => {
            connection.stop().then(_ => setConnection(undefined))
        }
    }, []);
    
    return (<Gapped gap={20} vertical>
        <Button
            onClick={async () => {
                const userId = Cookies.get("UserId");
                const gameId = await createGame();
                await connection.invoke("ConnectToGame", {
                    userId,
                    gameId
                });
                window.location = `/waitroom/${gameId}`;
            }}>Начать новую игру</Button>
        <JoinGame/>
    </Gapped>
    )
};

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