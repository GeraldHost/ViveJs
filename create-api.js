const events = require('./endpoints/events');

module.exports = function createApi(http){

    const eventsApi = events(http);

    return {...eventsApi};

}