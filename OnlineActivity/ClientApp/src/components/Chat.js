import React, {useRef, useState, useEffect} from "react";
import PropTypes from "prop-types";
import IconSend from "@skbkontur/react-icons/Send3"
import {Post} from "./Post";
import * as signalR from "@microsoft/signalr";
import {getGameId, getUserId} from './WaitingRoom';
import './Chat.css';
import * as GuessState from "./GuessState";

const createNewPost = (nickName, comment, userId) => {
    return {
        id: userId,
        author: nickName,
        comment,
        guessState: GuessState.NONE,
    };
};

export const Chat = ({nickName, chatPosts, isGameLead = false}) => {
    const [posts, updatePosts] = useState(chatPosts);
    const [canSend, updateCanSend] = useState(false);
    const [chatConnection, setChatConnection] = useState(undefined);
    const inputRef = useRef(null);
    const userId = getUserId();
    const gameId = getGameId();

    useEffect(async () => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl("/chat")
            .build();

        connection.on("SendChatMessage", (messageDto) => {
            updatePosts(current =>current.concat(createNewPost(messageDto.userName, messageDto.message)));
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
                        newPosts.push(post)
                    }
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