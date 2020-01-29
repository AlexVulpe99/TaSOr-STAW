let urlAPI = "https://tasorapi.herokuapp.com"

function getCookie(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
}

function getTasks() {
    let modal = document.getElementById('myModal');
    let span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    let token = getCookie('accessToken');
    if (!token) {
        window.location = './index.html';
    } else {
        fetch(urlAPI + '/tasks', {
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
                    let array = data['data'];

                    array.sort(function(a, b) {
                        a = new Date(a.date);
                        b = new Date(b.date);
                        return a < b ? -1 : a > b ? 1 : 0;
                    });

                    array.forEach(element => {
                        var codHTML = `<div class="content id="${element._id}">
                                            <h4>${element.taskName}</h4>
                                            <p>Should be finished by: ${element.date}</p>
                                            <p>Description: ${element.description}</p>
                                            <a href="${element.utilLinks}">Util links</a>
                                            <p>Informations: ${element.info}</p>
                                            <p>Created by: ${element.createdBy}</p>
                                            <button class="aprove" id="${element._id}-aprob">Completed</button>
                                            <button class="refuse" id="${element._id}-refuse">Refuse</button>
                                        </div>`;
                        document.getElementById("tasks").insertAdjacentHTML('beforeend', codHTML);
                        document.getElementById(`${element._id}-aprob`).addEventListener("click", () => {
                            //console.log(`Aprobat ${element._id}`);
                            modal.style.display = "block";
                            let content = document.getElementById("modal-content");

                            let codUrl = `<label for="url">URL:</label>
                                          <input type="text" id="url"/>
                                          <button id="modal-button">SEND</button>`;
                            content.innerHTML = codUrl;

                            document.getElementById("modal-button").addEventListener("click", () => {
                                let data = new FormData();
                                data.append("_finalized", true);
                                data.append("message", document.getElementById("url").value);


                                fetch(urlAPI + '/tasks' + `/${element._id}`, {
                                        method: 'PUT',
                                        mode: 'cors',
                                        body: new URLSearchParams(data),
                                        headers: new Headers({
                                            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                                            'Authorization': 'Bearer ' + token
                                        })
                                    })
                                    .then((response) => response.json())
                                    .then((data) => {
                                        if (!data['success']) {
                                            alert(data['message']);
                                            window.location = './home.html';
                                        } else {
                                            alert(data['message']);
                                            window.location = './home.html';
                                        }
                                    })
                                    .catch((error) => {
                                        console.error('Error:', error);
                                    });
                            });
                        });

                        document.getElementById(`${element._id}-refuse`).addEventListener("click", () => {
                            //console.log(`Refuzat ${element._id}`);
                            modal.style.display = "block";
                            let content = document.getElementById("modal-content");

                            let codUrl = `<label for="motive">Motive for reject : </label>
                                          <input type="text" id="motive"/>
                                          <button id="modal-button">SEND</button>`;
                            content.innerHTML = codUrl;

                            document.getElementById("modal-button").addEventListener("click", () => {
                                let data = new FormData();
                                data.append("_rejected", true);
                                data.append("message", document.getElementById("motive").value);


                                fetch(urlAPI + '/tasks' + `/${element._id}`, {
                                        method: 'PUT',
                                        mode: 'cors',
                                        body: new URLSearchParams(data),
                                        headers: new Headers({
                                            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                                            'Authorization': 'Bearer ' + token
                                        })
                                    })
                                    .then((response) => response.json())
                                    .then((data) => {
                                        if (!data['success']) {
                                            alert(data['message']);
                                            window.location = './home.html';
                                        } else {
                                            alert(data['message']);
                                            window.location = './home.html';
                                        }
                                    })
                                    .catch((error) => {
                                        console.error('Error:', error);
                                    });
                            });
                        });
                    });

                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}