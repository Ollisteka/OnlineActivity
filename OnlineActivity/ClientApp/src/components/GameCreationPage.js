import React, {useCallback, useEffect, useRef, useState} from 'react';
import * as signalR from "@microsoft/signalr";
import {UserManager} from "oidc-client";
import {userManager} from "./Registration";

function getParameterByName(name, url) {
    if (!url)
        url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

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
        <ul>
            {list.map(item => (
                <li key={item.id}>
                    <label>{item.name}</label>
                    <button type="button" onClick={() => handleClick(item.id)}>
                        Remove
                    </button>
                </li>
            ))}
        </ul>
    )
};