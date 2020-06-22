import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Chat} from "./Chat";
import {Canvas} from "./Canvas";
import * as styles from './Game.css';
import * as classNames from 'classnames';
import {getGameId, getUserId} from "./WaitingRoom";

async function getUserNameById(userId) {
    const response = await fetch(`api/v1/users/${userId}`);
    const data = await response.json();

    return data.login;
}

export const GamePage = ({wordToPaint = 'Сессия'}) => {
    const [userName, setUserName] = useState(undefined);

    const secondsLeft = 299;
    const userId = getUserId();
    const gameId = getGameId();

    useEffect( async () => {
        const name = await getUserNameById(userId);
        setUserName(name);
    }, []);

    return (
        <div className={'game-page centered'}>
            <div className={'game'}>
                <div className={'field-header'}>
                    <div>
                        Идентификатор игры: {gameId}
                    </div>

                    <div>
                        До конца игры: {secondsLeft} сек.
                    </div>
                </div>
                <div className={'field'}>
                    {wordToPaint && (
                        <div className={classNames('field', styles.header)}>Нарисуй слово:{' '}
                            <span className={styles.word}>{wordToPaint}</span>
                        </div>
                    )}
                    <Canvas height={0.7 * window.innerHeight} width={0.7 * window.innerWidth}/>
                </div>
            </div>
            <Chat nickName={userName}/>
        </div>
    );
};

GamePage.propTypes = {
    gameId: PropTypes.string,
    nickName: PropTypes.string
};