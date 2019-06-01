'use strict';

const searchURL = 'https://api.github.com/users/';

function queryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${key}=${params[key]}`)
    return queryItems.join('&');
}

function showResults(responseJson, maxResults) {
    console.log(responseJson);
    $('#resultsList').empty();
    console.log(responseJson.users);
    for (let i = 0; i < responseJson.length & i < maxResults; i++) {
        $('#resultsList').append(`<li><h3><a href="${responseJson[i].url}">${responseJson[i].name}</a></h3></li>`)
    };
    $('#results').removeClass('hidden');
};

function getUsers(query, maxResults = 10) {
    const params = {
        q: query,
        language: "en"
    };
    //const queryString = queryParams(params)
    const url = searchURL + params.q + '/repos';

    console.log(url);

    const options = {
        headers: new Headers({
            "User-Agent": 'klguenth'
        })
    };
    console.log('hi');
    fetch(url, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => showResults(responseJson, maxResults))
        .catch(err => {
            $('#errorMessage').text(`Something went wrong: ${err.message}`);
        });
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#searchTerm').val();
        const maxResults = $('#maxResults').val();
        getUsers(searchTerm, maxResults);
    });
}

$(watchForm);