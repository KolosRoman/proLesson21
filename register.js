let form = document.getElementById('form');
export let login = document.getElementById('login');
export let password = document.getElementById('password');
export let formContainer = document.getElementById('form-container');


login.addEventListener('blur', checkLogin);
password.addEventListener('blur', chekPassword);
login.addEventListener('focus', checkLoginCorrect);
password.addEventListener('focus', chekPasswordCorrect);

function inputData(email, password) {
    
    let register = {
        email,
        password
    }

    return fetch('https://reqres.in/api/register', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(register)
    });
}

import {checkLogin, chekPassword, checkLoginCorrect, chekPasswordCorrect, errorLogin, errorPassword, userUndefined} from './checkvalue.js';

export function mainLogin() {
    if(localStorage.getItem('token')) {
        formContainer.classList.add('correct');
    } else {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let loginInput = login.value;
            let passwordInput = password.value;
        
            if(!loginInput) {
                errorLogin.textContent = 'Поле не має бути порожнім';
                login.classList.add('form-input-error');
                return;
            }
        
            if(!passwordInput) {
                errorPassword.textContent = 'Поле не має бути порожнім';
                password.classList.add('form-input-error');
                return;
            }
        
            let resultLogin = inputData(loginInput, passwordInput);
            resultLogin.then(response => {
                if(response.status === 400) {
                    userUndefined.textContent = 'Такого користувача не знайдено! Введіть повторно дані';
                    login.value = '';
                    password.value = '';
                    return;
                }
                formContainer.classList.add('correct');
                return response.json();
            })
                .then(response => {
                    localStorage.setItem('token', response.token);
                    return response
                })
                .catch(error => console.log(error))
        })
    }
}

// if(localStorage.getItem('token')) {
//     formContainer.classList.add('correct');
// } else {
//     form.addEventListener('submit', (e) => {
//         e.preventDefault();
//         let loginInput = login.value;
//         let passwordInput = password.value;
    
//         if(!loginInput) {
//             errorLogin.textContent = 'Поле не має бути порожнім';
//             login.classList.add('form-input-error');
//             return;
//         }
    
//         if(!passwordInput) {
//             errorPassword.textContent = 'Поле не має бути порожнім';
//             password.classList.add('form-input-error');
//             return;
//         }
    
//         let resultLogin = inputData(loginInput, passwordInput);
//         resultLogin.then(response => {
//             if(response.status === 400) {
//                 userUndefined.textContent = 'Такого користувача не знайдено! Введіть повторно дані';
//                 login.value = '';
//                 password.value = '';
//                 return;
//             }
//             formContainer.classList.add('correct');
//             return response.json();
//         })
//             .then(response => {
//                 localStorage.setItem('token', response.token);
//                 return response
//             })
//             .catch(error => console.log(error))
//     })
// }

