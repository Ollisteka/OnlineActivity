import React, {useEffect, useState} from 'react';
import * as signalR from "@microsoft/signalr";
import Cookies from "js-cookie";
import Button from "@skbkontur/react-ui/Button";

import "./WaitingRoom.css";

export function getGameId() {
    const currentHref = window.location.href.split('/');
    return currentHref[currentHref.length - 1];
}

export function getUserId() {
    return Cookies.get("UserId");
}

async function getCurrentPlayers() {
    const gameId = getGameId();
    const response = await fetch(`api/v1/games/${gameId}`);
    const data = await response.json();
    const currentPlayers = [];
    for (const player of data.players) {
        currentPlayers.push(
            {
                "id": player.id,
                "login": player.login
            }
        );
    }

    return {
        "players": currentPlayers,
        "creatorId": data.creatorId
    };
}

async function startGame(connection) {
    const userId = Cookies.get("UserId");
    const gameId = getGameId();
    await connection.invoke("StartGame", {
        userId,
        gameId
    });
}

export const WaitingRoom = () => {
    const [players, setPlayers] = useState([]);
    const [creatorId, setCreatorId] = useState(undefined);
    const [roomConnection, setRoomConnection] = useState(undefined);

    useEffect(
        async () => {
            const currentPlayers = await getCurrentPlayers();
            setPlayers(currentPlayers.players);
            setCreatorId(currentPlayers.creatorId);

            const connection = new signalR.HubConnectionBuilder()
                .withUrl("/waitingroom")
                .build();

            connection.on("ConnectToGame", (userConnectedDto) => {
                setPlayers(players => {
                    const newPlayer = {
                        "id": userConnectedDto.userId,
                        "login": userConnectedDto.userLogin
                    };
                    for (const player of players) {
                        if (newPlayer.id === player.id) {
                            return players;
                        }
                    }
                    return players.concat(newPlayer);
                });
            });

            connection.on("StartGame", (gameStartedDto) => {
                const gameId = getGameId();
                if (gameId === gameStartedDto.gameId) {
                    window.location = `/game/${gameId}`;
                }
            });

            await connection.start();
            const userId = Cookies.get("UserId");
            const gameId = getGameId();
            await connection.invoke("AddToGroup", {
                userId,
                gameId
            });

            setRoomConnection(connection);
            return () => {
                roomConnection.invoke("RemoveFromGroup", {
                    userId,
                    gameId
                }).then(_ => roomConnection.stop().then(_ => setRoomConnection(undefined)))
            }
        }, []);

    return (
        <div className={'waiting-room'}>
            <p className={'waiting-room_game-code'}>Код игры:  {getGameId()}</p>
            <button className={'waiting-room_text-code'} onClick={
                () => {navigator.clipboard.writeText(getGameId())
                    .then(() => alert('Copied!'));
            }}>
                Скопировать код игры
            </button>
            {creatorId === Cookies.get("UserId") ?
                <button className={'waiting-room_button'} onClick={async () => await startGame(roomConnection)}>Начать игру</button> :
                undefined}
            <p className={'waiting-room_text-list'}>Список игроков в комнате ожидания:</p>
            <ul className={'waiting-room_players-list'}>
                {players.map(item => (
                    <li className={'waiting-room_players-list_item'} key={item.id}>
                        <label>{item.login}</label>
                    </li>
                ))}
            </ul>
        </div>
    )
};