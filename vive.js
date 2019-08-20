const axios = require('axios');
const conf = require('./config');
const createApi = require('./create-api');

exports.createClient = function (config = {}) {
    const http = axios.create({
        baseURL: conf.API_BASE_URL,
    });

    let access_token = config.access_token;
    if (!access_token) {
        throw Error('Please supply and access token.');
    }

    let auth_type = config.auth_type || 'public'
    if (auth_type === 'standard') {
        http.defaults.headers.common['Authorization'] = access_token;
    } else if (auth_type === 'api') {
        http.defaults.params = { api: access_token };
    }

    http.prototype.handleError = (error) => 
        error.errno === "ECONNREFUSED" ? error : error; //error.response.data

    return createApi(http);
}