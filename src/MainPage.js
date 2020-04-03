import {Link} from "react-router-dom";
import React from "react";

export const MainPage = () => {
    return (
        <div className={'centered'}>
            <header>
                Online Activity
            </header>

            <Link to='/registration'>Регистрация</Link>

        </div>
    );
};