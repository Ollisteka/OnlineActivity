import React, {useState, useEffect, useRef} from "react";
import * as signalR from "@microsoft/signalr";
import Input from "@skbkontur/react-ui/Input";
import Cookies from "js-cookie";

import "./JoiningToGame.css";

export const JoinGame = () => {
    const [connection, setConnection] = useState(undefined);
    const [canSend, updateCanSend] = useState(false);
    
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
        <div className={'input-game-id'}>
            {<Input ref={input} placeholder={gameIdPlaceholder} required 
                    onChange={evt => updateCanSend(!!evt.target.value)} autoComplete={'off'}/>}
            <button className={'input-game-id_button'} onClick={async () => {
                const gameId = input.current.input.value;
                const userId = Cookies.get("UserId");
                await connection.invoke("ConnectToGame", {
                    userId,
                    gameId
                });
                window.location = `/waitroom/${gameId}`;
            }} disabled={!canSend}>Присоединиться</button>
        </div>
    );
};