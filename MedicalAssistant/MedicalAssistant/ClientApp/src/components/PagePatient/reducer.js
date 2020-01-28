import UserService from '../UserService';
import update from '../../helpers/update';


export const GETPATIENT_REQUEST = "patient/PATIENT_REGISTER_REQUEST";
export const GETPATIENT_SUCCESS = "patient/PATIENT_REGISTER_SUCCESS";
export const GETPATIENT_FAILURE = "patient/PATIENT_REGISTER_FAILURE";

const initialState = {
    detailedpatient: {
    failed: false,
    loading: false,
    success: false,
    patient: null,
    errors:{},
    statuscode:null
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
            newState = update.set(newState, 'detailedpatient.failed', true);
            newState = update.set(newState, 'detailedpatient.errors', action.errors);
            newState = update.set(newState, 'detailedpatient.statuscode', action.statuscode);
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
        dispatch(getpatientActions.started());
        UserService.getdetaileduser(patient)
            .then((response) => {
                console.log("--------------redponse: ",response)
                dispatch(getpatientActions.success(response));
            }, err => { throw err; })
            .catch(err => {
                console.log("error: ",err);
                dispatch(getpatientActions.failed(err.response));
               
            });
    }
}




export const getpatientActions = {
    started: () => {
        return {
            type: GETPATIENT_REQUEST
        }
    },
    success: (data) => {
        return {
            type: GETPATIENT_SUCCESS,
            payload: data
        }
    },
    failed: (response) => {
        return {
            type: GETPATIENT_FAILURE,
            errors: response.data,
            statuscode:response.status
        }
    }

}