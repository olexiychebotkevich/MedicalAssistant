import UserService from '../../services/UserService';
import MedicalSessionService from '../../services/MedicalSessionService';
import DoctorService from '../../services/DoctorService';
import update from '../../helpers/update';
import { push } from 'connected-react-router';


export const GETDOCTOR_REQUEST = "doctor/DOCTOR_GET_REQUEST";
export const GETDOCTOR_SUCCESS = "doctor/DOCTOR_GET_SUCCESS";
export const GETDOCTOR_FAILURE = "doctor/DOCTOR_GET_FAILURE";


export const GETSESSION_REQUEST = "doctor/SESSION_GET_REQUEST";
export const GETSESSION_SUCCESS = "doctor/SESSION_GET_SUCCESS";
export const GETSESSION_FAILURE = "doctor/SESSION_GET_FAILURE";


export const UPDATEDOCTOR_REQUEST = "doctor/DOCTOR_UPDATE_REQUEST";
export const UPDATEDOCTOR_SUCCESS = "doctor/DOCTOR_UPDATE_SUCCESS";
export const UPDATEDOCTOR_FAILURE = "doctor/DOCTOR_UPDATE_FAILURE";

export const SEARCHPATIENT_REQUEST = "doctor/PATIENT_SEARCH_REQUEST";
export const SEARCHPATIENT_SUCCESS = "doctor/PATIENT_SEARCH_SUCCESS";
export const SEARCHPATIENT_FAILURE = "doctor/PATIENT_SEARCH_FAILURE";


export const GETPATIENT_REQUEST = "doctor/PATIENT_GET_REQUEST";
export const GETPATIENT_SUCCESS = "doctor/PATIENT_GET_SUCCESS";
export const GETPATIENT_FAILURE = "doctor/PATIENT_GET_FAILURE";

const initialState = {
    detaileddoctor: {
    failed: false,
    loading: false,
    success: false,
    doctor: null,
    errors:{},
    statuscode:null
    },
    updatedoctor:{
        failed: false,
        loading: false,
        success: false,  
        errors:{},
        statuscode:null,
        doctor: null
    },
    getsession:{
        failed: false,
        loading: false,
        success: false,  
        errors:{},
        statuscode:null,
        session:null
    },
    getpatient:{
        failed: false,
        loading: false,
        success: false,  
        statuscode:null,
        PatientID:null
    }
}



export const doctorsReducer = (state = initialState, action) => {
    let newState = state;
    switch (action.type) {
        case GETDOCTOR_REQUEST: {
            newState = update.set(state, 'detaileddoctor.loading', true);
            break;
        }
        case GETDOCTOR_SUCCESS: {
            newState = update.set(state, 'detaileddoctor.loading', false);
            newState = update.set(newState, 'detaileddoctor.success', true);
            newState = update.set(newState, 'detaileddoctor.doctor', action.payload.data);
            break;
        }

        case GETDOCTOR_FAILURE: {
            newState = update.set(state, 'detaileddoctor.loading', false);
            newState = update.set(newState, 'detaileddoctor.failed', true);
            newState = update.set(newState, 'detaileddoctor.errors', action.errors);
            newState = update.set(newState, 'detaileddoctor.statuscode', action.statuscode);
            break;
        }

        case UPDATEDOCTOR_REQUEST: {
            newState = update.set(state, 'updatedoctor.loading', true);
            break;
        }

        case UPDATEDOCTOR_SUCCESS: {
            newState = update.set(state, 'updatedoctor.loading', false);
            newState = update.set(newState, 'updatedoctor.success', true);
            newState = update.set(newState, 'updatedoctor.doctor', action.payload.data);
            break;
        }

        case UPDATEDOCTOR_FAILURE: {
            newState = update.set(state, 'updatedoctor.loading', false);
            newState = update.set(newState, 'updatedoctor.failed', true);
            newState = update.set(newState, 'updatedoctor.success', false);
           
            break;
        }

        case SEARCHPATIENT_REQUEST: {
            newState = update.set(state, 'detailedpatient.loading', true);
            break;
        }

        case SEARCHPATIENT_SUCCESS: {
            newState = update.set(state, 'detailedpatient.loading', false);
            newState = update.set(newState, 'detailedpatient.success', true);
            newState = update.set(newState, 'detaileddoctor.doctor.sessions', action.payload.data);
            break;
        }

        case SEARCHPATIENT_FAILURE: {
            newState = update.set(state, 'detailedpatient.loading', false);
            newState = update.set(newState, 'detailedpatient.failed', true);
            newState = update.set(newState, 'detailedpatient.success', false);
            break;
        }


        case GETSESSION_REQUEST: {
            newState = update.set(state, 'getsession.loading', true);
            break;
        }
        case GETSESSION_SUCCESS: {
            newState = update.set(state, 'getsession.loading', false);
            newState = update.set(newState, 'getsession.success', true);
            newState = update.set(newState, 'getsession.session', action.payload.data);
            break;
        }

        case GETSESSION_FAILURE: {
            newState = update.set(state, 'getsession.loading', false);
            newState = update.set(newState, 'getsession.failed', true);
            newState = update.set(newState, 'getsession.errors', action.errors);
            newState = update.set(newState, 'getsession.statuscode', action.statuscode);
            break;
        }
        case GETPATIENT_REQUEST: {
            newState = update.set(state, 'getpatient.loading', true);
            break;
        }
        case GETPATIENT_SUCCESS: {
            newState = update.set(state, 'getpatient.loading', false);
            newState = update.set(newState, 'getpatient.success', true);
            newState = update.set(newState, 'getpatient.PatientID', action.payload.data);
            break;
        }

        case GETPATIENT_FAILURE: {
            newState = update.set(state, 'getpatient.loading', false);
            newState = update.set(newState, 'getpatient.failed', true);
            newState = update.set(newState, 'getpatient.errors', action.errors);
            newState = update.set(newState, 'getpatient.statuscode', action.statuscode);
            break;
        }
      
        default: {
            return newState;
        }

    }
    return newState;
}





export const GetDetailedDoctor = (doctorId) => {
    return (dispatch) => {
        dispatch(doctorActions.getstarted());
        DoctorService.getdetaileddoctor(doctorId)
            .then((response) => {
                dispatch(doctorActions.getsuccess(response));
            }, err => { throw err; })
            .catch(err => {
                if(err.response!=null)
                dispatch(doctorActions.getfailed(err.response));
            });
    }
}


export const SearchPatientBySurname = (DoctorId,UserSurname) => {
    return (dispatch) => {
        dispatch(doctorActions.searchstarted());
        DoctorService.SearchPatientBySurname(DoctorId,UserSurname)
            .then((response) => {
                dispatch(doctorActions.searchsuccess(response));
                console.log("search response: ")
            }, err => { throw err; })
            .catch(err => {
                if(err.response!=null)
                dispatch(doctorActions.searchfailed(err.response));
            });
    }
}





export const changeImage = (newdoctor) => {
    return (dispatch) => {
        dispatch(doctorActions.updatestarted());
        DoctorService.UpdateDoctorImage(newdoctor)
            .then((response) => {
                dispatch(doctorActions.updatesuccess(response));
            }, err => { throw err; })
            .catch(err => {
                console.log("changeImage err: ",err);
                if(err.response!=null)
                dispatch(doctorActions.updatefailed(err.response));
            });
    }
}


export const AddMedicalSession=(PatientID) =>{
    return (dispatch) => {
        dispatch(doctorActions.getpatientstarted());
        DoctorService.IsPatientExist(PatientID)
            .then((response) => {
                console.log("Is patient exist: ",response);
                dispatch(doctorActions.getpatientsuccess(response));
                dispatch(push('/doctor/addmedicalsession'));
                
            }, err => { throw err; })
            .catch(err => {
                if(err.response!=null)
                dispatch(doctorActions.getpatientfailed(err.response));
            });
    }
}


export const getDetailedSession = (sesionId) => {
    return (dispatch) => {
        dispatch(doctorActions.getsessionstarted());
     
        MedicalSessionService.getDetailedSession(sesionId)
            .then((response) => {
                dispatch(doctorActions.getsessionsuccess(response));
                dispatch(push('/doctor/moresession'));
            }, err => { throw err; })
            .catch(err => {
                if (err.response != null)
                    dispatch(doctorActions.getsessionfailed(err.response));
            });
    }
}




export const doctorActions = {
    getstarted: () => {
        return {
            type: GETDOCTOR_REQUEST
        }
    },
    getsuccess: (data) => {
        return {
            type: GETDOCTOR_SUCCESS,
            payload: data
        }
    },
    getfailed: (response) => {
        return {
            type: GETDOCTOR_FAILURE,
            errors: response.data,
            statuscode:response.status
        }
    },
    updatestarted: () => {
        return {
            type: UPDATEDOCTOR_REQUEST
        }
    },
    updatesuccess: (data) => {
        return {
            type: UPDATEDOCTOR_SUCCESS,
        }
    },
    updatefailed: (response) => {
        return {
            type: UPDATEDOCTOR_FAILURE,
        }
    },
    getsessionstarted: () => {
        return {
            type: GETSESSION_REQUEST
        }
    },
    getsessionsuccess: (data) => {
        return {
            type: GETSESSION_SUCCESS,
            payload: data
        }
    },
    getsessionfailed: (response) => {
        return {
            type: GETSESSION_FAILURE,
            errors: response.data,
            statuscode:response.status
        }
    },
    searchstarted: () => {
        return {
            type: SEARCHPATIENT_REQUEST
        }
    },
    searchsuccess: (data) => {
        return {
            type: SEARCHPATIENT_SUCCESS,
            payload: data
        }
    },
    searchfailed: (response) => {
        return {
            type: SEARCHPATIENT_FAILURE,
        }
    },
    getpatientstarted: () => {
        return {
            type: GETPATIENT_REQUEST
        }
    },
    getpatientsuccess: (data) => {
        return {
            type: GETPATIENT_SUCCESS,
            payload: data
        }
    },
    getpatientfailed: (response) => {
        return {
            type: GETPATIENT_FAILURE,
            errors: response.data,
            statuscode:response.status
        }
    },
    

}