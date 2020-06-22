import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Chat} from "./Chat";
import {Canvas} from "./Canvas";
import * as styles from './Game.css';
import * as classNames from 'classnames';
import {getGameId, getUserId} from "./WaitingRoom";

async function getUserById(userId) {
    const response = await fetch(`api/v1/users/${userId}`);
    return await response.json();
}

async function getGameById(gameId) {
    const response = await fetch(`api/v1/games/${gameId}`);
    return await response.json();
}


export const GamePage = ({wordToPaint = 'Сессия'}) => {
    const [userName, setUserName] = useState(undefined);
    const [isGameLead, setIsGameLead] = useState(undefined);
    const [posts, setPosts] = useState([]);

    const secondsLeft = 299;
    const userId = getUserId();
    const gameId = getGameId();

    useEffect( async () => {
        const user = await getUserById(userId);
        setUserName(user.login);

        const game = await getGameById(gameId);
        const isDrawer = game.drawerPlayerId === userId;
        setIsGameLead(isDrawer);

        const currentPosts = [];
        for (const message of game.chatMessages) {
            currentPosts.push({
                id: message.id,
                author: message.userName,
                comment: message.message
            })
        }
        setPosts(currentPosts)
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
            <Chat nickName={userName} isGameLead={isGameLead} chatPosts={posts}/>
        </div>
    );
};

GamePage.propTypes = {
    gameId: PropTypes.string,
    nickName: PropTypes.string
};