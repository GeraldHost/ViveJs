const vive  = require("./vive");

const client = vive.createClient({
    access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NjI0ODQ1NTcsImp0aSI6MSwidXNlcl9pZCI6IjVjZDFkMDQ4YWM2NGYyMGZmNWY3ZjAzNSIsImlhdCI6MTU1NzMwMDU2NH0.7EJuSwBc3tyWFMA8rN9lw4G5dTd2bU3uKgkSMtPd3IQ'
});

client.getEvents().then(resp => {
    console.log(resp);
}).catch(error => {
    console.log(error.response.data);
});