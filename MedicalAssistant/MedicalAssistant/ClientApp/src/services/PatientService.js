import axios from 'axios';
import { serverUrl } from '../config';
import jwt from 'jsonwebtoken';


export default class PatientService {

    static getdetailedpatient(user) {
        return axios.get(`${serverUrl}api/user/GetPatient`, { params: { id: user.id }, headers: { 'Authorization': `Bearer ${user.token}` } });
    }

    static GetPatientByID(user, PatientID) {
        return axios.get(`${serverUrl}api/user/GetPatient`, { params: { id: PatientID }, headers: { 'Authorization': `Bearer ${user.token}` } })
    }

    static UpdatePatientImage(user, detailedpatient) {
        return axios.put(`${serverUrl}api/user/UpdatePatientImage`, detailedpatient, {
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` }
        });
    }

    static IsPatientExist(user) {
        return axios.get(`${serverUrl}api/user/IsPatientExist`, { params: { id: user.id }, headers: { 'Authorization': `Bearer ${user.token}` } })
    }

}

