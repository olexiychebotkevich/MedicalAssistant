import UserService from '../../services/UserService';
import MedicalSessionService from '../../services/MedicalSessionService'
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

export const SEARCHPATIENT_REQUEST = "patient/PATIENT_SEARCH_REQUEST";
export const SEARCHPATIENT_SUCCESS = "patient/PATIENT_SEARCH_SUCCESS";
export const SEARCHPATIENT_FAILURE = "patient/PATIENT_SEARCH_FAILURE";

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
            newState = update.set(newState, 'detailedpatient.patient', action.payload.data);
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
      
        default: {
            return newState;
        }

    }
    return newState;
}





export const GetDetailedDoctor = (doctor) => {
    return (dispatch) => {
        dispatch(doctorActions.getstarted());
        UserService.getdetaileddoctor(doctor)
            .then((response) => {
                dispatch(doctorActions.getsuccess(response));
            }, err => { throw err; })
            .catch(err => {
                if(err.response!=null)
                dispatch(doctorActions.getfailed(err.response));
            });
    }
}


export const SearchPatientBySurname = (doctor,UserSurname) => {
    return (dispatch) => {
        dispatch(doctorActions.searchstarted());
        UserService.SearchPatientBySurname(doctor,UserSurname)
            .then((response) => {
                dispatch(doctorActions.searchsuccess(response));
            }, err => { throw err; })
            .catch(err => {
                if(err.response!=null)
                dispatch(doctorActions.searchfailed(err.response));
            });
    }
}





export const changeImage = (user,doctor) => {
    return (dispatch) => {
        dispatch(doctorActions.updatestarted());
        UserService.UpdateDoctorImage(user,doctor)
            .then((response) => {
                dispatch(doctorActions.updatesuccess(response));
            }, err => { throw err; })
            .catch(err => {
                dispatch(doctorActions.updatefailed(err.response));
            });
    }
}


export const AddMedicalSession=(user,PatientID) =>{
    return (dispatch) => {
        dispatch(doctorActions.getpatientstarted());
        const patient={token:user.token,id:PatientID}
        UserService.IsPatientExist(patient)
            .then((response) => {
                dispatch(doctorActions.getpatientsuccess(response));
                dispatch(push('/doctor/addmedicalsession'));
                
            }, err => { throw err; })
            .catch(err => {
                if(err.response!=null)
                dispatch(doctorActions.getpatientfailed(err.response));
            });
    }
}


export const getDetailedSession = (user, sesionId) => {
    return (dispatch) => {
        dispatch(doctorActions.getsessionstarted());
     
        MedicalSessionService.getDetailedSession(user,sesionId)
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

}