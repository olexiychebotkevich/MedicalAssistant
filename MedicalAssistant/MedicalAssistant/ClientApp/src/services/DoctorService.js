import axios from 'axios';
import { serverUrl } from '../config';
import jwt from 'jsonwebtoken';


export default class DoctorService {

  
        static user=null;
        static token=null;
     

    static getdetaileddoctor(doctorId) {
        this.token=localStorage.getItem('jwtToken');
        this.user=jwt.decode(localStorage.getItem('jwtToken'));
        return axios.get(`${serverUrl}api/doctor/GetDoctor`, { params: { id: doctorId }, headers: { 'Authorization': `Bearer ${this.token}` } })
    }

    static SearchPatientBySurname(DoctorId,UserSurname) {
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
        return axios.put(`${serverUrl}api/doctor/UpdateDoctorImage`, detaileddoctor, {
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` }
        });
    }

    static IsPatientExist(PatientID) {
        return axios.get(`${serverUrl}api/patient/IsPatientExist`, { params: { id: PatientID }, headers: { 'Authorization': `Bearer ${this.token}` } })
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


