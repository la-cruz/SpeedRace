document.querySelector(".form-logout").style.display = "none";
document.querySelector(".clear-data").style.display = "none";
document.querySelector(".check").style.display = "none";

document.querySelector(".form-login").addEventListener("submit", (event) => {
    event.preventDefault();
    var login = document.querySelector("#login").value;
    var password = document.querySelector("#password").value;

    postData('http://192.168.75.28:8080/login', {
        login: login,
        password: password
    }).then((json) => {
        document.querySelector(".error-login").innerHTML = "";
        if(json.status == 204) {
            sessionStorage.setItem('token', json.headers.get("Authentification"));
            localStorage.setItem('login', login);
            console.log(json.headers.get("Authentification"))
            document.querySelector(".form-logout").style.display = "block";
            document.querySelector(".form-login").style.display = "none";
            document.querySelector(".clear-data").style.display = "block";
            document.querySelector(".check").style.display = "block";
        } else {
            var message = ""
            switch (json.status) {
                case 404:
                    message = "Login incorrect";
                    break;
                case 401:
                    message = "Password incorrect";
                    break;
                default:
                    break;
            }

            document.querySelector(".error-login").innerHTML = message;
        }
    })
});

document.querySelector(".check").addEventListener("click", (event) => {
    event.preventDefault()
    getData('http://192.168.75.28:8080/authenticate?', {
        token: sessionStorage.getItem('token')
    }).then((json) => {
        var message = "";
        switch (json.status) {
            case 204:
                message = "you're connected"
                break;
            case 401:
                message = "you're not connected"
            default:
                break;
        }
        document.querySelector(".is-connected").innerHTML = message;
    });
})

document.querySelector(".clear-data").addEventListener("click", (event) => {
    event.preventDefault();
    logout();
    sessionStorage.removeItem('token');
    localStorage.removeItem('login');
})

document.querySelector(".form-logout").addEventListener("submit", (event) => {
    event.preventDefault();
    logout();
});

function logout() {
    deleteData('http://192.168.75.28:8080/logout?token=' + sessionStorage.getItem('token')).then((json) => {
        document.querySelector(".form-login").style.display = "block";
        document.querySelector(".form-logout").style.display = "none";
        document.querySelector(".clear-data").style.display = "none";
        document.querySelector(".check").style.display = "none";
        document.querySelector(".is-connected").innerHTML = "";
    })
}

async function deleteData(url = '', data = {}) {
    return fetch(url, {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Allow": "DELETE",
        },
        body: queryStringify(data),
    })
    .then(function(response) {
        return response;
    });
}

async function postData(url = '', data = {}) {
    return fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: queryStringify(data),
    })
    .then(function(response) {
        return response;
    });
}

async function getData(url = '', data = {}) {
    return fetch(url + $.param(data), {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: 'include',
        headers: {
            "Accept": "application/json",
            "Authorization": sessionStorage.getItem("token"),
        },
    })
    .then(function(response) {
        return response;
    });
}

async function putData(url = '', data = {}) {
    return fetch(url, {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        credentials: 'include',
        headers: {
            "Accept": "application/json",
            "Authorization": readCookie("token"),
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: queryStringify(data),
    })
    .then(function(response) {
        return response;
    })
}

function queryStringify(obj, prefix) {
    var pairs = []
    for (var key in obj) {
        if (!has.call(obj, key)) {
            continue
        }
        
        var value = obj[key]
        var enkey = encodeURIComponent(key)
        var pair
        if (typeof value === 'object') {
            pair = queryStringify(value, prefix ? prefix + '[' + enkey + ']' : enkey)
        } else {
            pair = (prefix ? prefix + '[' + enkey + ']' : enkey) + '=' + encodeURIComponent(value)
        }
        pairs.push(pair)
    }
    return pairs.join('&')
}

var has = Object.prototype.hasOwnProperty;
