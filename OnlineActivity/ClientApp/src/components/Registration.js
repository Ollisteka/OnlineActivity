import React from "react";
import Input from "@skbkontur/react-ui/Input";
import Gapped from "@skbkontur/react-ui/Gapped";
import Button from "@skbkontur/react-ui/Button";

import {UserManager} from "oidc-client";

const config = {
    authority: 'https://localhost:7001',
    client_id: 'spa',
    redirect_uri: 'https://localhost:5001/callback',
    post_logout_redirect_uri: 'https://localhost:5001/',
    response_type: 'code',
    scope: 'openid profile email api offline_access',
};

const manager = new UserManager(config);

const logIn = () => {
    manager.getUser().then(function (user) {
        if (user)
            console.log("User logged in", user.profile);
        else
            manager.signinRedirect();
    })
};

export const Registration = () => {
    const inputId = 'nickname';
    return (<div className={'centered'}>
        <header className={'page-header'}>
            Регистрация
        </header>
        <Button onClick={logIn}>OIDC login</Button>

        <form action={''} method={'XXX'}>
            <Gapped gap={20} vertical>
                <Gapped gap={20}>
                    <label htmlFor={inputId}>Никнейм</label>
                    <Input id={inputId} name={inputId} placeholder={'Смешарик'} type={'text'}/>
                </Gapped>
                <Button use={'primary'} type={'submit'}>Зарегистрироваться</Button>
            </Gapped>
        </form>
    </div>)
};
