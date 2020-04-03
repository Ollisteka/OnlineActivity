import React, {useRef, useState} from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import IconSend from "@skbkontur/react-icons/Send3"
import {Post} from "./Post";

const defaultPosts = [
    {
        id: 1,
        author: 'Нюша',
        comment: 'апельсин?'
    },
    {
        id: 2,
        author: 'Кар-Карыч',
        comment: 'Гранат'
    },
    {
        id: 3,
        author: 'Лосяш',
        comment: 'Солнце'
    }
];

let maxId = 4;
const createNewPost = (nickName, comment) => {
    return {
        id: maxId++,
        author: nickName,
        comment
    };
};

export const Chat = ({nickName, sendingDisabled = false}) => {
    const [posts, updatePosts] = useState(defaultPosts);
    const [canSend, updateCanSend] = useState(false);
    const inputRef = useRef();

    const onSubmit = () => {
        const comment = inputRef.current.value;
        if (!comment) {
            return;
        }
        updatePosts([...posts, createNewPost(nickName, comment)]);
        inputRef.current.value = '';
        updateCanSend(false);
    };

    return (
        <div className={classnames('chat', {'chat__disabled': sendingDisabled})}>
            <div className={'field-header'}>Ваш никнейм: {nickName}</div>
            <div className={'field chat-body'}>
                {posts.map(post => (<Post key={post.id} post={post}/>))}
            </div>
            {!sendingDisabled && (
                <form className={'chat-input'} action={''} method={'XXX'}>
                    <input placeholder={'Угадайте слово'} name={'guess-word'} ref={inputRef}
                           onChange={evt => updateCanSend(!!evt.target.value)}/>
                    <button type={'button'} onClick={onSubmit} disabled={!canSend}><IconSend/></button>
                </form>
            )}
        </div>
    )
};

Chat.propTypes = {
    nickName: PropTypes.string.isRequired,
    sendingDisabled: PropTypes.bool
};