import axios from 'axios';
import conf from './config';
import createApi from './create-api';

export default function createClient(config = {}) {
    const http = axios.create({
        baseURL: conf.API_BASE_URL,
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