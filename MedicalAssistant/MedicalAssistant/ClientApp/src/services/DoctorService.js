import axios from 'axios';
import { serverUrl } from '../config';
import jwt from 'jsonwebtoken';


export default class DoctorService {

  
        static user=null;
        static token=null;
     

    static getdetaileddoctor() {
        this.token=localStorage.getItem('jwtToken');
        this.user=jwt.decode(localStorage.getItem('jwtToken'));
        return axios.get(`${serverUrl}api/doctor/GetDoctor`, { params: { id: this.user.id}, headers: { 'Authorization': `Bearer ${this.token}` } })
    }

    static SearchPatientBySurname(DoctorId,UserSurname) {
        this.token=localStorage.getItem('jwtToken');
        this.user=jwt.decode(localStorage.getItem('jwtToken'));
        const Model =
        {
            DoctorId:this.user.id,
            searchPatientSurname:UserSurname
        }
        return axios.post(`${serverUrl}api/Doctor/SearchPatiantBySurname`, Model, {
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` }
        });
    }

    static UpdateDoctorImage(detaileddoctor) {
        this.token=localStorage.getItem('jwtToken');
        this.user=jwt.decode(localStorage.getItem('jwtToken'));
        return axios.put(`${serverUrl}api/doctor/UpdateDoctorImage`, detaileddoctor, {
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` }
        });
    }

    static IsPatientExist(PatientID) {
        this.token=localStorage.getItem('jwtToken');
        this.user=jwt.decode(localStorage.getItem('jwtToken'));
        return axios.get(`${serverUrl}api/patient/IsPatientExist`, { params: { id: PatientID }, headers: { 'Authorization': `Bearer ${this.token}` } })
    }

    static IsDoctorExist() {
        this.token=localStorage.getItem('jwtToken');
        this.user=jwt.decode(localStorage.getItem('jwtToken'));
        return axios.get(`${serverUrl}api/doctor/IsDoctorExist`, { params: { id: this.user.id }, headers: { 'Authorization': `Bearer ${this.token}` } })
    }

    static GetDetailedPatinet(PatientId) {
        this.token=localStorage.getItem('jwtToken');
        this.user=jwt.decode(localStorage.getItem('jwtToken'));
        return axios.get(`${serverUrl}api/doctor/GetDoctorPatient`, { params: { id: PatientId }, headers: { 'Authorization': `Bearer ${this.token}` } })
    }

    static GetPatientSessions(PatientId)
    {
        this.token=localStorage.getItem('jwtToken');
        this.user=jwt.decode(localStorage.getItem('jwtToken'));
        return axios.get(`${serverUrl}api/MedicalSessions/GetPatientSessions`, { params: { PatientId: PatientId }, headers: { 'Authorization': `Bearer ${this.token}` } })
    }

}


