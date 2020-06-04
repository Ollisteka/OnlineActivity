import React from "react";
import Input from "@skbkontur/react-ui/Input";
import Button from "@skbkontur/react-ui/Button";
import * as styles from './AuthForm.module.css';

export const AuthType = {
    Registration: 0,
    Login: 1
};

export const AuthForm = ({authType}) => {
    const loginId = 'nickname';
    const passwordId = 'password';
    const [header, buttonCaption, autoComplete] = authType === AuthType.Registration
        ? ['Регистрация', 'Зарегистрироваться', 'new-password']
        : ['Вход', 'Войти', 'current-password'];

    return (<div className={'centered'}>
        <header className={'page-header'}>
            {header}
        </header>
        <form action={''} method={'XXX'}>
            <div className={styles.container}>
                <div className={styles.row}>
                    <label htmlFor={loginId}>Логин</label>
                    <Input id={loginId} name={loginId} type={'text'} required/>
                </div>
                <div className={styles.row}>
                    <label htmlFor={passwordId}>Пароль</label>
                    <Input id={passwordId} name={passwordId} type={'password'} autocomplete={autoComplete} required/>
                </div>
                <Button use={'primary'} type={'submit'}>{buttonCaption}</Button>
            </div>
        </form>
    </div>)
};