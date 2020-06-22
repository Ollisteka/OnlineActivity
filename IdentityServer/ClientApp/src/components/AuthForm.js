import React from "react";
import Input from "@skbkontur/react-ui/Input";

import {logMeIn} from "../utils/loginFunction"
import {register} from "../utils/registerFunction"

import './AuthForm.css'


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
            <div>
                <ul className={'form_input'}>
                    <li className={'form_input_row'}>
                        <label htmlFor={nameRegister}>Логин</label>
                        {!authType ?
                            <Input id={nameRegister} name={nameRegister} type={'text'} required/> :
                            <Input id={nameLogin} name={nameLogin} type={'text'} required/>
                        }
                    </li>
                    {!authType && (<li className={'form_input_row'}>
                        <label htmlFor={email}>Email</label>
                        <Input id={email} name={email} type={'email'} required/>
                    </li>)}
                    <li className={'form_input_row'}>
                        <label htmlFor={passwordRegister}>Пароль</label>
                        {!authType ?
                            <Input id={passwordRegister} name={passwordRegister} type={'password'} autoComplete={autoComplete}
                                   required/> :
                            <Input id={passwordLogin} name={passwordLogin} type={'password'} autoComplete={autoComplete}
                                   required/>
                        }
                    </li>
                    {!authType && (<li className={'form_input_row'}>
                        <label htmlFor={confirmPassword}>Подтверждение<br/>пароля</label>
                        <Input id={confirmPassword} name={confirmPassword} type={'password'} autoComplete={autoComplete}
                               required/>
                    </li>)}
                    {!authType ? <button className={'form_input_button_registration'} onClick={register}>{buttonCaption}</button> :
                        <button className={'form_input_button_login'} onClick={logMeIn}>{buttonCaption}</button>}
                </ul>
            </div>
        </div>)
};