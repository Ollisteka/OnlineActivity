import {getQueryVariable} from "./getQueryVariable";

export async function register() {
    const returnUrl = getQueryVariable('ReturnUrl');
    const username = document.getElementById('usernameRegister').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('passwordRegister').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

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
    
    if (data.status === 400) {
        alert('Логин и пароль должны содержать не меньше 3-х символов')
    }
    
    if (data && data.isOk) {
        window.location = data.redirectUrl;
    }
    
}