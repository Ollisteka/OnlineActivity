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

async function getListOfUsers() {
    const response = await fetch(`api/v1/statistics/leaderboard`);
    return await response.json();
}

export const LeaderBoard = () => {
    const players = getListOfUsers();
    
    return (
        <div className={'leaderboard'}>
            <header className={'leaderboard_header'}>
                Лидерборд
            </header>
            <div className={'leaderboard_board'}>
                <div className={'leaderboard_board_row'}>
                    <div className={'leaderboard_board_row_title'}>Игрок</div>
                    {players.sort((a, b) => b.score - a.score).map(player => (
                        <div key={player.id} className={'leaderboard_board_row_item'}>
                            <div>{player.login}</div>
                        </div>))}
                </div>
                <div className={'leaderboard_board_row'}>
                    <div className={'leaderboard_board_row_title'}>Очки</div>
                    {players.sort((a, b) => b.score - a.score).map(player => (
                        <div key={player.id} className={'leaderboard_board_row_item'}>
                            <div>{player.points}</div>
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