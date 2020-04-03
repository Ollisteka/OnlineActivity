import React from "react";
import Input from "@skbkontur/react-ui/Input";
import Gapped from "@skbkontur/react-ui/Gapped";
import Button from "@skbkontur/react-ui/Button";

export const Registration = () => {
    const inputId = 'nickname';
    return (<div className={'centered'}>
        <header className={'page-header'}>
            Регистрация
        </header>

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
