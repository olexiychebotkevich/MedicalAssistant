import UserService from '../../services/UserService';
import update from '../../helpers/update';
import { push } from 'connected-react-router';


export const GETPATIENT_REQUEST = "patient/PATIENT_GET_REQUEST";
export const GETPATIENT_SUCCESS = "patient/PATIENT_GET_SUCCESS";
export const GETPATIENT_FAILURE = "patient/PATIENT_GET_FAILURE";


export const UPDATEPATIENT_REQUEST = "patient/PATIENT_UPDATE_REQUEST";
export const UPDATEPATIENT_SUCCESS = "patient/PATIENT_UPDATE_SUCCESS";
export const UPDATEPATIENT_FAILURE = "patient/PATIENT_UPDATE_FAILURE";

const initialState = {
    detailedpatient: {
        failed: false,
        loading: false,
        success: false,
        patient: null,
        errors: {},
        statuscode: null
    },
    updatepatient: {
        failed: false,
        loading: false,
        success: false,
        errors: {},
        statuscode: null
    }
}



export const patientsReducer = (state = initialState, action) => {
    let newState = state;
    switch (action.type) {
        case GETPATIENT_REQUEST: {
            newState = update.set(state, 'detailedpatient.loading', true);
            break;
        }
        case GETPATIENT_SUCCESS: {
            newState = update.set(state, 'detailedpatient.loading', false);
            newState = update.set(newState, 'detailedpatient.success', true);
            newState = update.set(newState, 'detailedpatient.patient', action.payload.data);
            break;
        }

        case GETPATIENT_FAILURE: {
            newState = update.set(state, 'detailedpatient.loading', false);
            newState = update.set(newState, 'detailedpatient.success', false);
            newState = update.set(newState, 'detailedpatient.failed', true);
            newState = update.set(newState, 'detailedpatient.errors', action.errors);
            newState = update.set(newState, 'detailedpatient.statuscode', action.statuscode);
            break;
        }

        case UPDATEPATIENT_REQUEST: {
            newState = update.set(state, 'updatepatient.loading', true);
            break;
        }

        case UPDATEPATIENT_SUCCESS: {
            newState = update.set(state, 'updatepatient.loading', false);
            newState = update.set(newState, 'updatepatient.success', true);
            break;
        }

        case UPDATEPATIENT_FAILURE: {
            newState = update.set(state, 'updatepatient.loading', false);
            newState = update.set(newState, 'updatepatient.failed', true);
            newState = update.set(newState, 'updatepatient.success', false);
            break;
        }
      
        default: {
            return newState;
        }

    }
    return newState;
}





export const GetDetailedPatient = (patient) => {
    return (dispatch) => {
        dispatch(patientActions.getstarted());
        UserService.getdetailedpatient(patient)
            .then((response) => {
                dispatch(patientActions.getsuccess(response));
            }, err => { throw err; })
            .catch(err => {
                if(err.response!=null)
                dispatch(patientActions.getfailed(err.response));
                

               
            });
    }
}




export const changeImage = (user,patient) => {
    return (dispatch) => {
        dispatch(patientActions.updatestarted());
        UserService.UpdatePatientImage(user,patient)
            .then((response) => {
                dispatch(patientActions.updatesuccess(response));
            }, err => { throw err; })
            .catch(err => {
                if(err.response!=null)
                dispatch(patientActions.updatefailed(err.response));
               
            });
    }
}




export const patientActions = {
    getstarted: () => {
        return {
            type: GETPATIENT_REQUEST
        }
    },
    getsuccess: (data) => {
        return {
            type: GETPATIENT_SUCCESS,
            payload: data
        }
    },
    getfailed: (response) => {
        return {
            type: GETPATIENT_FAILURE,
            errors: response.data,
            statuscode:response.status
        }
    },
    updatestarted: () => {
        return {
            type: UPDATEPATIENT_REQUEST
        }
    },
    updatesuccess: (data) => {
        return {
            type: UPDATEPATIENT_SUCCESS
        }
    },
    updatefailed: (response) => {
        return {
            type: UPDATEPATIENT_FAILURE,
        }
    }

}