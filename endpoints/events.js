module.exports = function events(http){

    function getEvents(){
        return http.get('/events')
            .then(resp => resp.data)
            .catch(http.handleError);
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