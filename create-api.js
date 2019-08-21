import events from './endpoints/events';
import auth from './endpoints/auth';
import users from './endpoints/users';

export default function createApi(http){
    return {...events(http), ...auth(http), ...users(http)};
}