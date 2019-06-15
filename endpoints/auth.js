module.exports = function auth(http){

    function login({email, pass}){
        return http.post('/auth/login', {
            email, pass
        }).then(resp => resp.data)
        .catch(http.handleError);
    }

    function register({email, pass}){
        return http.post('/auth/register', {
            email, pass
        }).then(resp => resp.data)
        .catch(http.handleError);
    }

    return {
        login,
        register
    };
}