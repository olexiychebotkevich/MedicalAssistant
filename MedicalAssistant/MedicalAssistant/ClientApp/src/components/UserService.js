import axios from 'axios';
import {serverUrl} from '../config';
export default class UserService {
    // static login(username, password) {
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ username, password })
    //     };

    //     return fetch(`api/authorization/login`, requestOptions)
    //         .then(handleResponse)
    //         .then(user => {
    //             // store user details and jwt token in local storage to keep user logged in between page refreshes
    //             localStorage.setItem('user', JSON.stringify(user));

    //             return user;
    //         });
    // }



    static register(user){
        return axios.post(`${serverUrl}api/registration/registration`, user);
    }

    static login(user){
        return axios.post(`${serverUrl}api/authorization/login`, user);
    }
    
    





}

