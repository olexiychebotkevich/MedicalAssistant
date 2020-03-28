import axios from 'axios';
import {serverUrl} from '../config';
import jwt from 'jsonwebtoken';




export default class MedicalSessionService {
   
    static user = jwt.decode(localStorage.getItem('jwtToken'));
    static token =  localStorage.getItem('jwtToken');


    static AddMedicalSession(medicalsession) {
        console.log("-----Recipe service: recipe ", medicalsession);
        return axios.post(`${serverUrl}api/MedicalSessions/AddSession`, medicalsession, {
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` }
        });

    }

    static getDetailedSession(sessionId)
    {
        console.log("-----Recipe service: recipe ", sessionId);
        return axios.get(`${serverUrl}api/MedicalSessions/GetSession`, { params: { id: sessionId }, headers: { 'Authorization': `Bearer ${this.token}` } });
    }


   
}