import React, {useEffect} from 'react';
import {UserManager} from "oidc-client";
import {userManager} from "./Registration";
import Cookies from 'js-cookie'

export const completeLogin = async () => {
    await new UserManager({ response_mode: "query" }).signinRedirectCallback();
    const user = await userManager.getUser();
    const response = await fetch(`api/v1/users/login/${user.profile.name}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "login": user.profile.name,
            "email": user.profile.email,
            "identityId": user.profile.sub
        })
    });
    const data = await response.json();
    Cookies.Set("UserId", data.id);
    window.location = "/";
};

export const CallbackPage = () => {
    useEffect(() => {
        completeLogin();
    }, []);
    
    return null;
};