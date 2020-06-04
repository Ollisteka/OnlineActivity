import React, { Component } from 'react';
import {AuthForm, AuthType} from "./AuthForm";
import './Home.css'

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
        <div className={'registration-and-login-form'}>
            <AuthForm authType={AuthType.Registration}/>
            <AuthForm authType={AuthType.Login}/>
      </div>
    );
  }
}
