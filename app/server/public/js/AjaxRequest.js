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
    return fetch(url + "?" + $.param(data), {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Accept": "application/json",
            "Authorization": sessionStorage.getItem("token"),
            "Content-Type": "application/x-www-form-urlencoded",
        },
    })
    .then(function(response) {
        return response;
    })
}

//export default { deleteData, postData, getData, putData }