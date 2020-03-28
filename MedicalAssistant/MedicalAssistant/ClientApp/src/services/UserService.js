import axios from 'axios';
import { serverUrl } from '../config';
import jwt from 'jsonwebtoken';


export default class UserService {

    static registerdoctor(doctor) {
        return axios.post(`${serverUrl}api/registration/doctorregistration`, doctor);
    }

    static registerpatient(patient) {
        return axios.post(`${serverUrl}api/registration/patientregistration`, patient);
    }

    static login(user) {
        return axios.post(`${serverUrl}api/authorization/login`, user);
    }

}

