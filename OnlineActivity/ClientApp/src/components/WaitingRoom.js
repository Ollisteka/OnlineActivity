import React, {useCallback, useEffect, useRef, useState} from 'react';
import * as signalR from "@microsoft/signalr";
import {UserManager} from "oidc-client";
import Cookies from "js-cookie";


function getGameId() {
    const currentHref = window.location.href.split('/');
    return currentHref[currentHref.length - 1];
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

    return currentPlayers;
}

async function getWaitingRoom(players, setPlayers, roomConnection, setRoomConnection) {


}

async function updatePlayers(setPlayers) {
    const currentPlayers = await getCurrentPlayers();
    setPlayers(currentPlayers);
}

export const WaitingRoom = () => {
    const [players, setPlayers] = useState([]);
    const [roomConnection, setRoomConnection] = useState(undefined);

    useEffect(
        async function createRoom() {
            const currentPlayers = await getCurrentPlayers();
            setPlayers(currentPlayers);
            const connection = new signalR.HubConnectionBuilder()
                .withUrl("/waitingroom")
                .build();

            connection.on("ConnectToGame", (userConnectedDto) => {
                const newPlayer = {
                    "id": userConnectedDto.userId,
                    "login": userConnectedDto.userLogin
                };
                for (const player of players) {
                    if (newPlayer.id === player.id) {
                        return;
                    }
                }
                const newPlayers = players.concat(newPlayer);
                setPlayers(newPlayers);
            });


            await connection.start();
            setRoomConnection(connection);

            const userId = Cookies.get("UserId");
            const gameId = getGameId();
            await connection.invoke("AddToGroup", {
                userId,
                gameId
            });
            
            createRoom();
            return () => {
                roomConnection.invoke("RemoveFromGroup", {
                    userId,
                    gameId
                }).then(_ => roomConnection.stop().then(_ => setRoomConnection(undefined)))
            }
        }, []);

    return (
        <ul>
            {players.map(item => (
                <li key={item.id}>
                    <label>{item.login}</label>
                </li>
            ))}
        </ul>
    )
};