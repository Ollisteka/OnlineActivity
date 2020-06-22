import React, {useState, useEffect, useRef} from "react";
import * as signalR from "@microsoft/signalr";
import Gapped from "@skbkontur/react-ui/Gapped";
import Cookies from "js-cookie";

import {JoinGame} from "./JoiningToGame";
import {createGame} from "../utils/createGame";

export const InitGame = () => {
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
            <button className={'initial-game_button'}
                onClick={async () => {
                    const userId = Cookies.get("UserId");
                    const gameId = await createGame();
                    await connection.invoke("ConnectToGame", {
                        userId,
                        gameId
                    });
                    window.location = `/waitroom/${gameId}`;
                }}>Начать новую игру</button>
            <JoinGame/>
        </Gapped>
    )
};
