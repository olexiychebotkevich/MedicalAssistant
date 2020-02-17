import axios from 'axios';
import {serverUrl} from '../config';
import jwt from 'jsonwebtoken';




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

    static getdetailedpatient(user) {
        console.log("check Patient ---------3");
        // let usertoken = jwt.decode(localStorage.getItem('jwtToken'));
        // console.log("id: ",user.id);
        return axios.post(`${serverUrl}api/user/GetPatient`, {Id:user.id}, {
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` }
        });

    }

    static getdetaileddoctor(user) {
        // let usertoken = jwt.decode(localStorage.getItem('jwtToken'));
        // console.log("id: ",user.id);
        return axios.post(`${serverUrl}api/user/GetDoctor`, {Id:user.id}, {
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` }
        });

    }

    static GetPatientByID(user,PatientID) {
        return axios.post(`${serverUrl}api/user/GetPatientByID`, {Id:PatientID}, {
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` }
        });

    }

    


    static changeImage(user,detailedpatient){
        console.log(" user service--------: ",user);
        console.log("detailed user service--------: ",detailedpatient);
        return axios.put(`${serverUrl}api/user/UpdateUser`, detailedpatient, {
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` }
        });
    }


    static UpdateDoctor(user,detaileddoctor){
        console.log(" user service--------: ",user);
        console.log("detailed user service--------: ",detaileddoctor);
        return axios.put(`${serverUrl}api/user/UpdateDoctor`, detaileddoctor, {
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` }
        });
    }


    
    static IsPatientExist(user){
        console.log(" user service IsPatientExist--------: ",user);
        return axios.get(`${serverUrl}api/user/IsPatientExist`, { params:{id:user.id}, headers: { 'Authorization': `Bearer ${user.token}` } })
    }

    static IsDoctorExist(user){
        console.log(" user service IsDoctorExist--------: ",user);
        return axios.get(`${serverUrl}api/user/IsDoctorExist`, { params:{id:user.id}, headers: { 'Authorization': `Bearer ${user.token}` } })
    }



    




}

