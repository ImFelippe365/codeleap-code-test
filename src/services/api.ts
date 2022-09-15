import axios from "axios";

const api = axios.create({
    headers: {
        "Content-Type": "application/json",
    },
    baseURL: 'https://dev.codeleap.co.uk/'
})

export default api;