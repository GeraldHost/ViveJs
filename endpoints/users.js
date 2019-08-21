export default function users(http){

    function getCurrentUser(){
        return http.get('/users/current')
            .then(resp => resp.data)
            .catch(http.handleError);
    }

    return {
        getCurrentUser
    };
}