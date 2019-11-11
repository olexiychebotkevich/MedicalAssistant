import axios from 'axios';
import {serverUrl} from '../../config';
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



    // static logout() {
    //     // remove user from local storage to log user out
    //     localStorage.removeItem('user');
    // }



    // static register(user) {
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(user)
    //     };


    //     return fetch(`api/registration/registration`, requestOptions).then(handleResponse);
    // }



    static register(user){
        return axios.post(`${serverUrl}api/registration/registration`, user);
    }





}

