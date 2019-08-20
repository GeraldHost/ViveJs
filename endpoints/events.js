module.exports = function events(http) {

    function getEvents() {
        return http.get('/events')
            .then(resp => resp.data)
            .catch(http.handleError);
    }

    function updateEvent(data) {
        return http.put('/events', data)
            .then(resp => resp.data)
            .catch(http.handleError);
    }

    function createEvent(data) { 
        return http.post('/events', data)
            .then(resp => resp.data)
            .catch(http.handleError);
    }

    function deleteEvent(event_id) { 
        return http.delete(`events/${event_id}`)
            .then((resp) => resp.data)
            .catch(http.handleError);
    }

    function deleteTicketType(event_id, ticket_type_id) {
        return http.delete(`events/${event_id}/ticket_types`, {data: [ticket_type_id]})
            .then((resp) => resp.data)
            .catch(http.handleError);
    }

    return {
        getEvents,
        updateEvent,
        createEvent,
        deleteEvent,
        deleteTicketType
    };
}