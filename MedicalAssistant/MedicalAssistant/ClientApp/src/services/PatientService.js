import axios from 'axios';
import { serverUrl } from '../config';
import jwt from 'jsonwebtoken';


export default class PatientService {


    
    static user=null;
    static token=null;

    static getdetailedpatient(patientId) {
        this.token=localStorage.getItem('jwtToken');
        this.user=jwt.decode(localStorage.getItem('jwtToken'));
        return axios.get(`${serverUrl}api/patient/GetPatient`, { params: { id: this.user.id }, headers: { 'Authorization': `Bearer ${this.token}` } });
    }

    static GetPatientByID() {
        this.token=localStorage.getItem('jwtToken');
        this.user=jwt.decode(localStorage.getItem('jwtToken'));
        return axios.get(`${serverUrl}api/patient/GetPatient`, { params: { id: this.user.id }, headers: { 'Authorization': `Bearer ${this.token}` } })
    }

    static UpdatePatientImage(imagePath) {
        this.token=localStorage.getItem('jwtToken');
        this.user=jwt.decode(localStorage.getItem('jwtToken'));
        const updateimagemodel={
            Id:this.user.id,
            ImagePath:imagePath
        };
        return axios.put(`${serverUrl}api/patient/UpdatePatientImage`, updateimagemodel, {
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` }
        });
    }

    static IsPatientExist() {
        this.token=localStorage.getItem('jwtToken');
        this.user=jwt.decode(localStorage.getItem('jwtToken'));
        return axios.get(`${serverUrl}api/patient/IsPatientExist`, { params: { id: this.user.id }, headers: { 'Authorization': `Bearer ${this.token}` } })
    }

}

