import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import * as GuessState from './GuessState';
import classNames from 'classnames';
import {getGameId, getUserId} from './WaitingRoom';
import Modal from "@skbkontur/react-ui/Modal";
import Button from "@skbkontur/react-ui/Button";

export const Post = ({post, activeReactions, guessState, connection, messageId}) => {
    const [guess, setGuessState] = useState(guessState);
    const {author, comment} = post;
    const reactionButtons = activeReactions;
    const [chatConnection, setChatConnection] = useState(connection);
    const [isOpened, setOpening] = React.useState(false);

    useEffect(() => {
        setGuessState(guessState)
    },[guessState]);

    useEffect(() => {
        setChatConnection(connection)
    },[connection]);

    const onColdButtonClick = async () => {
        await sendReaction(GuessState.COLD);
        setGuessState(GuessState.COLD);
    };
    const onWarmButtonClick = async () => {
        await sendReaction(GuessState.WARM);
        setGuessState(GuessState.WARM);
    };
    const onCorrectButtonClick = async () => {
        await sendReaction(GuessState.CORRECT);
        setGuessState(GuessState.CORRECT);
        setOpening(true);
    };

    const sendReaction = async (reaction) => {
        const gameId = getGameId();
        const userId = getUserId();
        await chatConnection.invoke("SendReaction", {
            gameId,
            messageId,
            userId,
            reaction
        });
    };

    return (
        <div className={classNames('post', {
                'post__warm': guess === GuessState.WARM,
                'post__cold': guess === GuessState.COLD,
                'post__correct': guess === GuessState.CORRECT
            })}>
            {isOpened && (
                <Modal onClose={() => setOpening(false)}>
                    <Modal.Header>Игра закончилась</Modal.Header>
                    <Modal.Body>
                        <p>Выиграл: Вася</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button use={'default'} onClick={() => window.location = `/waitroom/${getGameId()}`}>Начать заново</Button>
                    </Modal.Footer>
                </Modal>
            )}
            {reactionButtons && (
                <>
                    <button className={'cold-button'} onClick={onColdButtonClick}/>
                    <button className={'warm-button'} onClick={onWarmButtonClick}/>
                </>
            )}
            <div className={'content'}>
                <div className={'post-author'}>{author}</div>
                <div className={'post-comment'}>{comment}</div>
            </div>
            {reactionButtons && <button className={'correct-button'} onClick={onCorrectButtonClick}/>}
        </div>
    )
};

Post.propTypes = {
    post: PropTypes.object,
    activeReactions: PropTypes.bool,
    guessState: PropTypes.string,
    connection: PropTypes.object,
    messageId: PropTypes.string
};

