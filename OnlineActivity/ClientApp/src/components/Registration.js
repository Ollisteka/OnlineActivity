import React from "react";
import Input from "@skbkontur/react-ui/Input";
import Button from "@skbkontur/react-ui/Button";
import * as styles from './Registration.module.css';

export const Registration = () => {
    const loginId = 'nickname';
    const passwordId = 'password';
    return (<div className={'centered'}>
        <header className={'page-header'}>
            Регистрация
        </header>

        <form action={''} method={'XXX'}>
            <div className={styles.container}>
                <div className={styles.row}>
                    <label htmlFor={loginId}>Логин</label>
                    <Input id={loginId} name={loginId} type={'text'} required/>
                </div>
                <div className={styles.row}>
                    <label htmlFor={passwordId}>Пароль</label>
                    <Input id={passwordId} name={passwordId} type={'password'} autocomplete={'new-password'} required/>
                </div>
                <Button use={'primary'} type={'submit'}>Зарегистрироваться</Button>
            </div>
        </form>
    </div>)
};
