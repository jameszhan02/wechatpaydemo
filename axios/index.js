import axios from 'axios';

const devBaseURL = 'https://admin.peacefulmall.com/';

let baseURL = devBaseURL;

const jwtAxios = axios.create({
    baseURL,
    headers:{
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
})

export default jwtAxios;