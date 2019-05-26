const axios = require('axios');
const conf = require('./config');
const createApi = require('./create-api');

exports.createClient = function(config) {
    if(!config.access_token && !localStorage.getItem('vive')){
        throw 'Access token not found.';
    }

    let access_token = config.access_token || localStorage.getItem('vive');

    const http = axios.create({
		baseURL: conf.API_BASE_URL,
	});

    http.defaults.headers.common['Authorization'] = access_token;

    return createApi(http);
}