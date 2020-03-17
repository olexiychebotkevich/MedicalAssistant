import axios from 'axios';
import {serverUrl} from '../config';
import jwt from 'jsonwebtoken';




export default class MedicalSessionService {
   

    static AddMedicalSession(user, medicalsession) {
        console.log("-----Recipe service: recipe ", medicalsession);
        return axios.post(`${serverUrl}api/MedicalSessions/AddSession`, medicalsession, {
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` }
        });

    }

    static getDetailedSession(user,sessionId)
    {
        console.log("-----Recipe service: recipe ", sessionId);
        return axios.get(`${serverUrl}api/MedicalSessions/GetSession`, { params: { id: sessionId }, headers: { 'Authorization': `Bearer ${user.token}` } });
    }
   
}