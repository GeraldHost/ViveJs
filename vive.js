import axios from 'axios';
import conf from './config';
import createApi from './create-api';

exports.createClient = function (config = {}) {
    const baseURL = config.api_base_url || conf.API_BASE_URL;
    
    const http = axios.create({
        baseURL,
    });

    let access_token = config.access_token;
    let auth_type = config.auth_type || 'public'
    if (auth_type === 'api') {
        http.defaults.params = { api: access_token };
    } else {
        http.defaults.headers.common['Authorization'] = access_token;
    }

    http.prototype.handleError = (error) => 
        error.errno === "ECONNREFUSED" ? error : error; //error.response.data

    return createApi(http);
}