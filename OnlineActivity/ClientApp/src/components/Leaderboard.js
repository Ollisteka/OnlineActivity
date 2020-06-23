import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import "./Leaderboard.css";

export const LeaderBoard = () => {
    const [users, setUsers] = useState([]);

    async function setListOfUsers() {
        const response = await fetch(`api/v1/statistics/leaderboard`);
        const data = await response.json();
        setUsers(data.users);
    }

    useEffect(() => {
        setListOfUsers()
    }, []);

    return (
        <div className={'leaderboard'}>
            <header className={'leaderboard_header'}>
                Лидерборд
            </header>
            <div className={'leaderboard_board'}>
                <div className={'leaderboard_board_row'}>
                    <div className={'leaderboard_board_row_title'}>Игрок</div>
                    {users.map(user => (
                        <div key={user.id} className={'leaderboard_board_row_item'}>
                            <div>{user.login}</div>
                        </div>))}
                </div>
                <div className={'leaderboard_board_row'}>
                    <div className={'leaderboard_board_row_title'}>Очки</div>
                    {users.map(user => (
                        <div key={user.id} className={'leaderboard_board_row_item'}>
                            <div>{user.points}</div>
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