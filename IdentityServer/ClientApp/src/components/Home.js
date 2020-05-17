import React, { Component } from 'react';


function getQueryVariable(variable) {
  const query = window.location.search.substring(1);
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) === variable) {
      return decodeURIComponent(pair[1]);
    }
  }
}

async function logMeIn() {
  const returnUrl = getQueryVariable('ReturnUrl');
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // call the API
  const response = await fetch('/api/authenticate', {
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


export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <form>
          <input type="text" name="username" id="username"/>
          <input type="password" name="password" id="password"/>
          <button type="button" name="button" id="login" onClick={logMeIn}>Login</button>
        </form>
      </div>
    );
  }
}
