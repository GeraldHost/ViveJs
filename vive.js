const axios = require('axios');
const conf = require('./config');
const createApi = require('./create-api');

exports.createClient = function (config = {}) {
    const http = axios.create({
        baseURL: conf.API_BASE_URL,
    });

    let access_token = config.access_token;
    if (access_token) {
        http.defaults.headers.common['Authorization'] = access_token;
    }

    http.prototype.handleError = (error) => 
        error.errno === "ECONNREFUSED" ? error : error; //error.response.data

    return createApi(http);
}