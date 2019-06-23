module.exports = function createApi(http){

    const events = require('./endpoints/events')(http);
    const auth = require('./endpoints/auth')(http);
    const users = require('./endpoints/users')(http);

    return {...events, ...auth, ...users};

}