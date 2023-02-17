import axios from 'axios';
import { token } from "../../env.json"

export default async () => {

    axios.interceptors.request.use(
        async config => {
            if (token !== null) {
                config.headers['Authorization'] = `Bearer ${token}`;
                config.headers['Content-Type']  = 'application/json';
            } else {
                config.headers['Content-Type']  = 'application/json';
            }

            return config;
        },
        err => Promise.reject(err),
    );
};

