import axios from 'axios';


const httpClient = axios.create({
    baseURL: 'https://api.tvmaze.com',
    headers: {
        "Content-Type": "application/json",
    }
});

export default httpClient;