import React from "react";
import Input from "@skbkontur/react-ui/Input";
import Button from "@skbkontur/react-ui/Button";

import './AuthForm.css'

function getQueryVariable(variable) {
    const query = window.location.search.substring(1);
    const vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
}

export async function logMeIn() {
    const returnUrl = getQueryVariable('ReturnUrl');
    const username = document.getElementById('usernameLogin').value;
    const password = document.getElementById('passwordLogin').value;

    // call the API
    const response = await fetch('/api/authentication/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
            username,
            password,
            returnUrl
        })
    });
    const data = await response.json();

    if (data && data.isOk) {
        window.location = data.redirectUrl;
    }
}


export async function register() {
    const returnUrl = getQueryVariable('ReturnUrl');
    const username = document.getElementById('usernameRegister').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('passwordRegister').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // call the API
    const response = await fetch('/api/authentication/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
            username,
            email,
            password,
            confirmPassword,
            returnUrl
        })
    });
    const data = await response.json();

    if (data && data.isOk) {
        window.location = data.redirectUrl;
    }
}

export const AuthType = {
    Registration: false,
    Login: true
};

export const AuthForm = ({authType}) => {
    const nameRegister = 'usernameRegister';
    const nameLogin = 'usernameLogin';
    const passwordRegister = 'passwordRegister';
    const passwordLogin = 'passwordLogin';
    const email = 'email';
    const confirmPassword = 'confirmPassword';
    const [header, buttonCaption, autoComplete] = authType === AuthType.Registration
        ? ['Регистрация', 'Зарегистрироваться', 'new-password']
        : ['Вход', 'Войти', 'current-password'];

    return (
        <div className={'form'}>
            <header className={'form_header'}>
                {header}
            </header>
            <form action={''} method={'XXX'}>
                <div className={'form_input'}>
                    <div className={'form_input_login'}>
                        <label htmlFor={nameRegister}>Логин</label>
                        {!authType ?
                            <Input id={nameRegister} name={nameRegister} type={'text'} required/> :
                            <Input id={nameLogin} name={nameLogin} type={'text'} required/>
                        }
                    </div>
                    {!authType && (<div className={'form_input_email'}>
                        <label htmlFor={email}>Email</label>
                        <Input id={email} name={email} type={'email'} required/>
                    </div>)}
                    <div className={'form_input_password'}>
                        <label htmlFor={passwordRegister}>Пароль</label>
                        {!authType ?
                            <Input id={passwordRegister} name={passwordRegister} type={'password'} autoComplete={autoComplete}
                                   required/> :
                            <Input id={passwordLogin} name={passwordLogin} type={'password'} autoComplete={autoComplete}
                                   required/>
                        }
                    </div>
                    {!authType && (<div className={'form_input_check_password'}>
                        <label htmlFor={confirmPassword}>Подтверждение пароля</label>
                        <Input id={confirmPassword} name={confirmPassword} type={'password'} autoComplete={autoComplete}
                               required/>
                    </div>)}
                    {!authType ? <Button use={'primary'} onClick={register}>{buttonCaption}</Button> :
                        <Button use={'primary'} onClick={logMeIn}>{buttonCaption}</Button>}
                </div>
            </form>
        </div>)
};