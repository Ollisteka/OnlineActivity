import React, {useEffect} from 'react';

import {UserManager} from "oidc-client";


export const completeLogin = () => {
    new UserManager({response_mode: "query"}).signinRedirectCallback()
        .then(() => {
            window.location = "/"
        });
};

export const CallbackPage = () => {
    useEffect(() => {
        completeLogin();
    }, []);
    
    return null;
};