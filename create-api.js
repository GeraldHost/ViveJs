module.exports = function createApi(http){

    const events = require('./endpoints/events')(http);
    const auth = require('./endpoints/auth')(http);

    return {...events, ...auth};

}