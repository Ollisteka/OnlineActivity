import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Chat} from "./Chat";
import {Canvas} from "./Canvas";
import './Game.css';
import {getGameId, getUserId} from "./WaitingRoom";
import Modal from "@skbkontur/react-ui/Modal";
import Button from "@skbkontur/react-ui/Button";


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
    const [counter, setCounter] = React.useState(undefined);
    const [isOpened, setOpening] = React.useState(false);

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
                comment: message.message,
                guessState: message.reaction
            })
        }

        setPosts(currentPosts)
    }, []);

    useEffect(() => {
        const timer =
            counter === 0 ? setOpening(true) : setInterval(() => setCounter(counter - 1), 1000);
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
                {isOpened && (
                    <Modal onClose={() => setOpening(false)}>
                        <Modal.Header>Игра закончилась</Modal.Header>
                        <Modal.Body>
                            <p>Выиграл: {userName}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button use={'default'} onClick={() => window.location = `/waitroom/${gameId}`}>Начать заново</Button>
                        </Modal.Footer>
                    </Modal>
                )}
                {wordToPaint && (
                    <div className={'game-page_field_paint_word'}>Нарисуй слово: {wordToPaint}</div>
                )}
                <Canvas height={0.6 * window.innerHeight} width={0.7 * window.innerWidth}/>
            </div>
            <Chat nickName={userName} isGameLead={isGameLead} chatPosts={posts}/>
        </div>
    );
};

GamePage.propTypes = {
    gameId: PropTypes.string,
    nickName: PropTypes.string
};