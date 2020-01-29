let urlAPI = "http://localhost:4000"

function getCookie(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
}


function getEmailsForSelect() {

    let token = getCookie('accessToken');
    if (!token) {
        window.location = './index.html';
    } else {
        let select = document.getElementById("assigned-users");
        fetch(urlAPI + '/auth/users', {
                method: 'GET',
                mode: 'cors',
                headers: new Headers({
                    'Authorization': 'Bearer ' + token
                })
            })
            .then((response) => response.json())
            .then((data) => {
                //console.log('Success:', data);
                if (!data['success']) {
                    alert(data['message']);
                } else {
                    //console.log(data['data']);
                    data['data'].forEach(element => {
                        let option = document.createElement("option");
                        option.value = element._id;
                        option.innerText = element._id;
                        select.appendChild(option);
                    });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}


let button = document.querySelector('.button');
let buttonText = document.querySelector('.tick');

const tickMark = "<svg width=\"58\" height=\"45\" viewBox=\"0 0 58 45\" xmlns=\"http://www.w3.org/2000/svg\"><path fill=\"#fff\" fill-rule=\"nonzero\" d=\"M19.11 44.64L.27 25.81l5.66-5.66 13.18 13.18L52.07.38l5.65 5.65\"/></svg>";

buttonText.innerHTML = "Submit";

button.addEventListener('click', function() {

    if (buttonText.innerHTML !== "Submit") {
        buttonText.innerHTML = "Submit";
    } else if (buttonText.innerHTML === "Submit") {
        let dataFinish = document.getElementById("finish-date").value.slice(0, 19).replace('T', ' ');
        //console.log(dataFinish);
        let taskName = document.getElementById("name").value;
        let description = document.getElementById("description").value;
        let utilLinks = document.getElementById("util-links").value;
        let info = document.getElementById("info").value;



        buttonText.innerHTML = tickMark;
    }
    this.classList.toggle('button__circle');
});