import {getQueryVariable} from "./getQueryVariable";

export async function logMeIn() {
    const returnUrl = getQueryVariable('ReturnUrl');
    const username = document.getElementById('usernameLogin').value;
    const password = document.getElementById('passwordLogin').value;

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

    if (data.status === 401) {
<<<<<<< HEAD
        console.log("�����");
    }
=======
        alert('Проверьте корректность пароля и логина или зарегистрируйтесь');
    }

>>>>>>> 89581b8cb3f86e3602bca833db534078f0e9c258
    if (data && data.isOk) {
        window.location = data.redirectUrl;
    }
}