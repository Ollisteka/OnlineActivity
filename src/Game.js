import React from "react";
import PropTypes from 'prop-types';
import {Chat} from "./Chat";

export const GamePage = ({gameId = '1234-abcd', nickName = 'Смешарик'}) => {
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
                <div className={'field'}>Это поле</div>
            </div>
            <Chat nickName={nickName}/>
        </div>
    );
};

GamePage.propTypes = {
    gameId: PropTypes.string,
    nickName: PropTypes.string
};