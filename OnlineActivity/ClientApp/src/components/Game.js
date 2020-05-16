import React from "react";
import PropTypes from 'prop-types';
import {Chat} from "./Chat";
import {Canvas} from "./Canvas";
import * as styles from './Game.module.css';
import * as classNames from 'classnames';

export const GamePage = ({gameId = '1234-abcd', nickName = 'Смешарик', wordToPaint = 'Сессия'}) => {
    const secondsLeft = 299;
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
                    <Canvas height={800} width={1000}/>
                </div>
            </div>
            <Chat nickName={nickName}/>
        </div>
    );
};

GamePage.propTypes = {
    gameId: PropTypes.string,
    nickName: PropTypes.string
};