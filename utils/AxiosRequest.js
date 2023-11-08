import {getItem} from "./Storage";

const axios = require('axios');

axios.defaults.headers.common = {
    'Authorization': await getItem('Authorization'),
    'USER_ID': await getItem('USER_ID'),
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};