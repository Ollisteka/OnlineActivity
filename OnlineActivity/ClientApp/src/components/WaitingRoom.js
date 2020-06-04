import React, {useCallback, useEffect, useRef, useState} from 'react';
import * as signalR from "@microsoft/signalr";
import {UserManager} from "oidc-client";


async function getGameById(gameId)
{
    const response = await fetch(`api/v1/games/${gameId}`);
    const game = await response.json();
    
}


export const PlayersList = () => {
    const [players, setPlayers] = React.useState([]);

    useEffect(async () =>
    {

    }, []);

    return (
        <div>Список</div>
        // <ul>
        //     {list.map(item => (
        //         <li key={item.id}>
        //             <label>{item.name}</label>
        //             <button type="button" onClick={() => handleClick(item.id)}>
        //                 Remove
        //             </button>
        //         </li>
        //     ))}
        // </ul>
    )
};

export const WaitingRoom = () =>
{
    return (
        <div>123</div>
    )
};