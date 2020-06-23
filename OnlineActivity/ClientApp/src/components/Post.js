import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import * as GuessState from './GuessState';
import classNames from 'classnames';
import {getGameId, getUserId} from './WaitingRoom';

export const Post = ({post, activeReactions, guessState, connection, messageId}) => {
    const [guess, setGuessState] = useState(guessState);
    const {author, comment} = post;
    const reactionButtons = activeReactions;
    const chatConnection = connection;

    const onColdButtonClick = () => {
        sendReaction(GuessState.COLD);
        setGuessState(GuessState.COLD);
    };
    const onWarmButtonClick = () => {
        sendReaction(GuessState.WARM);
        setGuessState(GuessState.WARM);
    };
    const onCorrectButtonClick = () => {
        sendReaction(GuessState.CORRECT);
        setGuessState(GuessState.CORRECT);
    };

    const sendReaction = (reaction) => {
        chatConnection.invoke("SendReaction", {
            gameId: getGameId(),
            messageId,
            userId: getUserId(),
            reaction
        });
    };

    return (
        <div
            className={classNames('post', {
                'post__warm': guess === GuessState.WARM,
                'post__cold': guess === GuessState.COLD,
                'post__correct': guess === GuessState.CORRECT
            })}>
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

