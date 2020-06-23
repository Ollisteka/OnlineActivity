import React, {useRef, useState, useEffect} from "react";
import PropTypes from "prop-types";
import IconSend from "@skbkontur/react-icons/Send3"
import {Post} from "./Post";
import * as signalR from "@microsoft/signalr";
import {getGameId, getUserId} from './WaitingRoom';
import './Chat.css';
import * as GuessState from "./GuessState";
import Modal from "@skbkontur/react-ui/Modal";
import Button from "@skbkontur/react-ui/Button";

const createNewPost = (nickName, comment, messageId) => {
    return {
        id: messageId,
        author: nickName,
        comment,
        guessState: GuessState.NONE,
    };
};

export const Chat = ({nickName, chatPosts, isGameLead = false}) => {
    const [posts, updatePosts] = useState(chatPosts);
    const [canSend, updateCanSend] = useState(false);
    const [chatConnection, setChatConnection] = useState(undefined);
    const [isOpened, setOpening] = React.useState(false);

    const inputRef = useRef(null);
    const userId = getUserId();
    const gameId = getGameId();
    let winner;

    useEffect(async () => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl("/chat")
            .build();

        connection.on("SendChatMessage", (messageDto) => {
            updatePosts(current =>current.concat(
                createNewPost(messageDto.userName, messageDto.message, messageDto.id)));
        });
        await connection.start();
        await connection.invoke("AddToGroup", {
            userId,
            gameId
        });
        setChatConnection(connection);
        
        connection.on("SendReaction", (reactionDto) => {
            updatePosts(currentPosts => {
                const newPosts = [];
                for (const post of currentPosts) {
                    if (post.id === reactionDto.messageId){
                        post.guessState = reactionDto.reaction;
                    }
                    if (post.guessState === GuessState.CORRECT) {
                        setOpening(true);
                        winner = post.author;
                    }
                    newPosts.push(post)
                }
              return newPosts;
            })
        });
        
        return () => {
            chatConnection.invoke("RemoveFromGroup", {
                userId,
                gameId
            }).then(_ => chatConnection.stop().then(_ => setChatConnection(undefined)))
        }
    }, []);

    useEffect( () => {
        updatePosts(chatPosts);
    }, [chatPosts]);
    
    const onSubmit = async () => {
        const message = inputRef.current.value;
        if (!message) {
            return;
        }

        inputRef.current.value = '';
        updateCanSend(false);

        if (chatConnection) {
            await chatConnection.invoke("SendChatMessage", {
                userId,
                gameId,
                message,
                guessState: GuessState.NONE
            });
        }
    };

    return (
        <div className={'chat'}>
            {isOpened && (
                <Modal onClose={() => setOpening(false)}>
                    <Modal.Header>Игра закончилась</Modal.Header>
                    <Modal.Body>
                        <p>Выиграл: {winner}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button use={'default'} onClick={() => window.location = `/waitroom/${gameId}`}>Начать заново</Button>
                    </Modal.Footer>
                </Modal>
            )}
            <div className={'chat_header_nickname'}>Ваш никнейм: {nickName}</div>
            <div className={'chat_header_post-id'}>
                {posts.map(post => (<Post key={post.id} post={post} guessState={post.guessState} connection={chatConnection} messageId={post.id} activeReactions={isGameLead}/>))}
            </div>
            {!isGameLead && (
                <div className={'chat_word-form'}>
                    <input className={'chat_word-form_input'} placeholder={'Угадайте слово'} name={'guess-word'} ref={inputRef}
                           onChange={evt => updateCanSend(!!evt.target.value)} autoComplete={'off'}/>
                    <button className={'chat_word-form_button'} type={'button'} onClick={onSubmit} disabled={!canSend}>
                        <IconSend/>
                    </button>
                </div>
            )}
        </div>
    )
};

Chat.propTypes = {
    nickName: PropTypes.string.isRequired,
    isGameLead: PropTypes.bool,
    chatPosts: PropTypes.array
};