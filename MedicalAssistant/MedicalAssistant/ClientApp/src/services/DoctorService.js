import axios from 'axios';
import { serverUrl } from '../config';
import jwt from 'jsonwebtoken';


export default class DoctorService {

    static user = jwt.decode(localStorage.getItem('jwtToken'));
    static token =  localStorage.getItem('jwtToken');

    static getdetaileddoctor(user) {
        return axios.get(`${serverUrl}api/doctor/GetDoctor`, { params: { id: user.id }, headers: { 'Authorization': `Bearer ${user.token}` } })
    }

    static SearchPatientBySurname(DoctorId,UserSurname) {
        const Model =
        {
            DoctorId:DoctorId,
            searchPatientSurname:UserSurname
        }
        return axios.post(`${serverUrl}api/Doctor/SearchPatiantBySurname`, Model, {
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` }
        });
    }

    static UpdateDoctorImage(user, detaileddoctor) {
        return axios.put(`${serverUrl}api/doctor/UpdateDoctorImage`, detaileddoctor, {
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` }
        });
    }

    static IsPatientExist(user) {
        return axios.get(`${serverUrl}api/patient/IsPatientExist`, { params: { id: user.id }, headers: { 'Authorization': `Bearer ${user.token}` } })
    }

    static IsDoctorExist(user) {
        return axios.get(`${serverUrl}api/doctor/IsDoctorExist`, { params: { id: user.id }, headers: { 'Authorization': `Bearer ${user.token}` } })
    }

    static GetDetailedPatinet(user,PatientId) {
        return axios.get(`${serverUrl}api/doctor/GetDoctorPatient`, { params: { id: PatientId }, headers: { 'Authorization': `Bearer ${user.token}` } })
    }

    static GetPatientSessions(PatientId)
    {
        console.log("---GetPatientSessions");
        console.log("user: ",this.token);
        return axios.get(`${serverUrl}api/MedicalSessions/GetPatientSessions`, { params: { PatientId: PatientId }, headers: { 'Authorization': `Bearer ${this.token}` } })
    }

}

