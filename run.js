const { createClient } = require('./vive');

createClient().register({ email: 'me@jacobford.co.uk', pass: '123' })
    .then(resp => console.log(resp))
    .catch(resp => console.log(resp));