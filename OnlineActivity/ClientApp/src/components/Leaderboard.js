import React from 'react';
import PropTypes from 'prop-types';

import "./Leaderboard.css";

const defaultPlayers = [
    {
        name: 'Нюша',
        playerId: 1,
        score: 1
    },
    {
        name: 'Бараш',
        playerId: 2,
        score: 10
    },
    {
        name: 'Кар-Карыч',
        playerId: 3,
        score: 2
    },
    {
        name: 'Смешарик',
        playerId: 4,
        score: 4
    },
    {
        name: 'Смешарик',
        playerId: 4,
        score: 4
    },
    {
        name: 'Смешарик',
        playerId: 4,
        score: 4
    },
    {
        name: 'Смешарик',
        playerId: 4,
        score: 4
    },
    {
        name: 'Смешарик',
        playerId: 4,
        score: 4
    },
    {
        name: 'Смешарик',
        playerId: 4,
        score: 4
    },
    {
        name: 'Смешарик',
        playerId: 4,
        score: 4
    },
];

export const LeaderBoard = ({players = defaultPlayers}) => {
    return (
        <div className={'leaderboard'}>
            <header className={'leaderboard_header'}>
                Лидерборд
            </header>
            <div className={'leaderboard_board'}>
                <div className={'leaderboard_board_row'}>
                    <div className={'leaderboard_board_row_title'}>Игрок</div>
                    {players.sort((a, b) => b.score - a.score).map(player => (
                        <div key={player.playerId} className={'leaderboard_board_row_item'}>
                            <div>{player.name}</div>
                        </div>))}
                </div>
                <div className={'leaderboard_board_row'}>
                    <div className={'leaderboard_board_row_title'}>Очки</div>
                    {players.sort((a, b) => b.score - a.score).map(player => (
                        <div key={player.playerId} className={'leaderboard_board_row_item'}>
                            <div>{player.score}</div>
                        </div>))}
                </div>
                </div>
                
        </div>
    );
};

LeaderBoard.propTypes = {
    players: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        playerId: PropTypes.number,
        score: PropTypes.number
    }))
};