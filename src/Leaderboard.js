import React from 'react';
import PropTypes from 'prop-types';

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
];

export const LeaderBoard = ({players = defaultPlayers}) => {
    return (
        <div className={'leaderboard centered'}>
            <header className={'page-header'}>
                Лидерборд
            </header>
            <div className={'board'}>
                <div className={'row row-header'}>
                    <div>Игрок</div>
                    <div>Очки</div>
                </div>
                {players.sort((a, b) => b.score - a.score).map(player => (
                    <div key={player.playerId} className={'row'}>
                        <div>{player.name}</div>
                        <div>{player.score}</div>
                    </div>))}
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