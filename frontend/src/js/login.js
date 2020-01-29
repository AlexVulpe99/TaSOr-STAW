const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

function setCookie(key, value) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (1 * 60 * 60 * 1000));
    document.cookie = key + '=' + value + ';expires=' + expires.toUTCString() + "; path=/";
}

function getCookie(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
}

function checkAuthToken() {
    if (getCookie("accessToken")) {
        window.location = './home.html';
    }
}

const loginButton = document.getElementById('loginBtn');
const registerButton = document.getElementById('registerBtn');

const urlAPI = "http://localhost:4000/auth";


loginButton.addEventListener('click', () => {
    let data = new FormData();
    data.append('email', document.getElementById('loginEmail').value);
    data.append('password', document.getElementById('loginPassword').value);

    fetch(urlAPI + '/login', {
            method: 'POST',
            mode: 'cors',
            body: new URLSearchParams(data),
            headers: new Headers({
                'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            })
        })
        .then((response) => response.json())
        .then((data) => {
            //console.log('Success:', data);
            if (!data['success']) {
                alert(data['message']);
            } else {
                setCookie('accessToken', data['token']);
                window.location = "./home.html";
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    //console.log(JSON.stringify(data));
});

registerButton.addEventListener('click', () => {
    let registerPassword = document.getElementById('registerPassword').value;
    let registerPasswordRepeat = document.getElementById('registerPasswordRepeat').value;

    if (registerPassword === registerPasswordRepeat) {

        let data = new FormData();
        data.append('_id', document.getElementById('registerEmail').value);
        data.append('password', document.getElementById('registerPassword').value);

        fetch(urlAPI + '/register', {
                method: 'POST',
                mode: 'cors',
                body: new URLSearchParams(data),
                headers: new Headers({
                    'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
                })
            })
            .then((response) => response.json())
            .then((data) => {
                //console.log('Success:', data);
                if (!data['success']) {
                    alert(data['message']);
                } else {
                    setCookie('accessToken', data['token']);
                    window.location = "./home.html";
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    } else {
        alert("Password is not the same as Repeat Password");
        document.getElementById('registerPassword').value = "";
        document.getElementById('registerPasswordRepeat').value = "";
    }
});