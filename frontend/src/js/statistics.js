let urlAPI = "https://tasorapi.herokuapp.com"

function getCookie(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
}

function getTasks() {
    let token = getCookie('accessToken');
    if (!token) {
        window.location = './index.html';
    } else {
        fetch(urlAPI + '/statistics/tasks', {
                method: 'GET',
                mode: 'cors',
                headers: new Headers({
                    'Authorization': 'Bearer ' + token
                })
            })
            .then((response) => response.json())
            .then((data) => {
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
                        if (element._finalized == "true") {
                            var codHTML = `<div class="content id="${element._id}">
                                            <h4>${element.taskName}</h4>
                                            <p>Date: ${element.date}</p>
                                            <p>Description: ${element.description}</p>
                                            <a href="${element.utilLinks}">Util links</a>
                                            <p>Informations: ${element.info}</p>
                                            <p>Created by: ${element.createdBy}</p>
                                            <p>Completed : ${element._finalized}</p>
                                            <a href="${element.message}">URL Proof</a>
                                        </div>`;
                            document.getElementById("tasks").insertAdjacentHTML('beforeend', codHTML);
                        } else if (element._rejected == "true") {
                            var codHTML = `<div class="content id="${element._id}">
                                                <h4>${element.taskName}</h4>
                                                <p>Date: ${element.date}</p>
                                                <p>Description: ${element.description}</p>
                                                <a href="${element.utilLinks}">Util links</a>
                                                <p>Informations: ${element.info}</p>
                                                <p>Created by: ${element.createdBy}</p>
                                                <p>Rejected : ${element._rejected}</p>
                                                <p>Message: ${element.message}</p>
                                            </div>`;
                            document.getElementById("tasks").insertAdjacentHTML('beforeend', codHTML);
                        }
                    });
                }
            });
    }
}