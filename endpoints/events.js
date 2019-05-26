module.exports = function eventsApi(http){

    function getEvents(){
        return http.get('/events').then(resp => resp.data);
    }

    function updateEvent(){ }
    function createEvent(){ }
    function deleteEvent(){ }

    return {
        getEvents, 
        updateEvent, 
        createEvent, 
        deleteEvent 
    };
}