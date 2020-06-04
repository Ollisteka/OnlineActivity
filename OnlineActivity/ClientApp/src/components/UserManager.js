import React from "react";

import './Registration.css'

import {UserManager} from "oidc-client";

const config = {
    authority: 'https://localhost:7001',
    client_id: 'spa',
    redirect_uri: 'https://localhost:5001/callback',
    post_logout_redirect_uri: 'https://localhost:5001/',
    response_type: 'code',
    scope: 'openid profile email api offline_access',
};

export const manager = new UserManager(config);

export const logIn = () => {
    manager.getUser().then(function (user) {
        if (user)
            console.log("User logged in", user.profile);
        else
            manager.signinRedirect();
    })
};

export async function logout() {
    await manager.signoutRedirect()
}
