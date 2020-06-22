import React, {useRef, useState} from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import IconSend from "@skbkontur/react-icons/Send3"
import {Post} from "./Post";
import * as styles from './Chat.css';

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

export const Chat = ({nickName, isGameLead = false}) => {
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
        <div className={classnames('chat', {[styles.disabled]: isGameLead})}>
            <div className={'field-header'}>Ваш никнейм: {nickName}</div>
            <div className={classnames('field', styles.body)}>
                {posts.map(post => (<Post key={post.id} post={post} activeReactions={isGameLead}/>))}
            </div>
            {!isGameLead && (
                <div className={styles.wordForm}>
                    <input className={styles.input} placeholder={'Угадайте слово'} name={'guess-word'} ref={inputRef}
                           onChange={evt => updateCanSend(!!evt.target.value)} autoComplete={'off'}/>
                    <button className={styles.send} type={'button'} onClick={onSubmit} disabled={!canSend}>
                        <IconSend/>
                    </button>
                </div>
            )}
        </div>
    )
};

Chat.propTypes = {
    nickName: PropTypes.string.isRequired,
    isGameLead: PropTypes.bool
};