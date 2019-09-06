export default function users(http){

    function getCurrentUser(){
        return http.get('/users/current')
            .then(resp => resp.data)
            .catch(http.handleError);
    }

    function updateCurrentUser(data){
        return http.post('/users/current', data)
            .then(resp => resp.data)
            .catch(http.handleError);
    }

    return {
        getCurrentUser,
        updateCurrentUser
    };
}