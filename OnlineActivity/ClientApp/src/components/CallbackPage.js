import React, {useEffect} from 'react';
import {UserManager} from "oidc-client";
import {manager} from "./UserManager";
import Cookies from 'js-cookie'

export const completeLogin = async () => {
    await new UserManager({ response_mode: "query" }).signinRedirectCallback();
    const user = await manager.getUser();
    const response = await fetch("api/v1/users", {
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
    Cookies.set("UserId", data.id);
    window.location = "/";
};

export const CallbackPage = () => {
    useEffect(async () => {
        await completeLogin();
    }, []);
    
    return null;
};