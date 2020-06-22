import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Chat} from "./Chat";
import {Canvas} from "./Canvas";
import './Game.css';
import {getGameId, getUserId} from "./WaitingRoom";

async function getUserNameById(userId) {
    const response = await fetch(`api/v1/users/${userId}`);
    const data = await response.json();

    return data.login;
}

export const GamePage = ({wordToPaint = 'Сессия'}) => {
    const [userName, setUserName] = useState(undefined);
    const [counter, setCounter] = React.useState(60);

    const secondsLeft = 299;
    const userId = getUserId();
    const gameId = getGameId();

    useEffect( async () => {
        const name = await getUserNameById(userId);
        setUserName(name);
    }, []);

    useEffect(() => {
        const timer =
            counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter]);

    return (
        <div className={'game-page'}>
            <div className={'game-page_field'}>
                <div className={'game-page_field_header'}>
                    <div className={'game-page_field_header_timer'}>
                        До конца игры: {counter}
                    </div>
                </div>
                {wordToPaint && (
                    <div className={'game-page_field_paint_word'}>Нарисуй слово: {wordToPaint}</div>
                )}
                <Canvas height={0.6 * window.innerHeight} width={0.7 * window.innerWidth}/>
            </div>
            <Chat nickName={userName}/>
        </div>
    );
};

GamePage.propTypes = {
    gameId: PropTypes.string,
    nickName: PropTypes.string
};