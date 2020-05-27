import React, { Component } from 'react';


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


async function logMeIn() {
    const returnUrl = getQueryVariable('ReturnUrl');
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

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


async function register() {
    const returnUrl = getQueryVariable('ReturnUrl');
    const username = document.getElementById('username1').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password1').value;
    const confirmPassword = document.getElementById('confirmpassword').value;

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



export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
        <div>
            <form>
                <input type="text" name="username" id="username1" />
                <input type="text" name="email" id="email" />
                <input type="password" name="password" id="password1" />
                <input type="password" name="password" id="confirmpassword" />
                <button type="button" name="button" id="register" onClick={register}>register</button>
            </form>

            <form>
                <input type="text" name="username" id="username"/>
                <input type="password" name="password" id="password"/>
                <button type="button" name="button" id="login" onClick={logMeIn}>Login</button> 
            </form>
      </div>
    );
  }
}
