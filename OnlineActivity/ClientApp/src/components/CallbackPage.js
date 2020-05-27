import React, { useEffect } from 'react';

import {UserManager} from "oidc-client";


const completeLogin = () => {
    new UserManager({response_mode: "query"}).signinRedirectCallback().then(function () {
        //window.location = "/";
    }).catch(function (e) {
        console.error(e);
    });
};

export const CallbackPage = () => {
    useEffect(() => {
        completeLogin();
    }, []);

    return (
        <div>
            Вы залогинились
        </div>
    )
};