import MedicalSessionService from '../../services/MedicalSessionService';
import DoctorService from '../../services/DoctorService';
import update from '../../helpers/update';
import { push } from 'connected-react-router';
import jwt from 'jsonwebtoken';


export const ADDMEDICAlSESSION_REQUEST = "medicalsession/ADDMEDICAlSESSION_REQUEST";
export const ADDMEDICAlSESSION_SUCCESS = "medicalsession/ADDMEDICAlSESSION_SUCCESS";
export const ADDMEDICAlSESSION_FAILURE = "medicalsession/ADDMEDICAlSESSION_FAILURE";

export const GETPATIENT_REQUEST = "medicalsession/GETPATIENT_REQUEST";
export const GETPATIENT_SUCCESS = "medicalsession/GETPATIENT_SUCCESS";
export const GETPATIENT_FAILURE = "medicalsession/GETPATIENT_FAILURE";


const initialState = {
    recipe: {
    failed: false,
    loading: false,
    success: false,
    errors:{},
    statuscode:null
    },

    getpatient:
    {
    failed: false,
    loading: false,
    success: false,
    errors:{},
    statuscode:null,
    patient:null
    }
}



export const MedicalSessionReducer = (state = initialState, action) => {
    let newState = state;
    switch (action.type) {
        case ADDMEDICAlSESSION_REQUEST: {
            newState = update.set(state, 'recipe.loading', true);
            break;
        }
        case ADDMEDICAlSESSION_SUCCESS: {
            newState = update.set(state, 'recipe.loading', false);
            newState = update.set(newState, 'recipe.success', true);
            break;
        }

        case ADDMEDICAlSESSION_FAILURE: {
            newState = update.set(state, 'recipe.loading', false);
            newState = update.set(newState, 'recipe.failed', true);
            newState = update.set(newState, 'recipe.errors', action.errors);
            newState = update.set(newState, 'recipe.statuscode', action.statuscode);
            break;
        }

        case GETPATIENT_REQUEST: {
            newState = update.set(state, 'getpatient.loading', true);
            break;
        }
        case GETPATIENT_SUCCESS: {
            newState = update.set(state, 'getpatient.loading', false);
            newState = update.set(newState, 'getpatient.success', true);
            newState = update.set(newState, 'getpatient.patient', action.payload.data);
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



export const AddRecipe=(recipe) =>{
   
    return (dispatch) => {
        dispatch(MedicalSessionActions.addsessionstarted());
        MedicalSessionService.AddMedicalSession(recipe)
            .then((response) => {
                dispatch(MedicalSessionActions.addsessionsuccess(response));
                dispatch(push('/doctor/pagedoctor'));
                
            }, err => { throw err; })
            .catch(err => {
                if(err.response!=null)
                dispatch(MedicalSessionActions.addsessionfailed(err.response));
            });
    }
}


export const GetPatient=(PatinetId) =>{
    console.log("GetPatient: ",PatinetId);
    const user = jwt.decode(localStorage.getItem('jwtToken'))
    const token = localStorage.getItem('jwtToken')
    return (dispatch) => {
        dispatch(MedicalSessionActions.getpatientstarted());
        DoctorService.GetDetailedPatinet({...user,token},PatinetId)
            .then((response) => {
                dispatch(MedicalSessionActions.getpatientsuccess(response));
            }, err => { throw err; })
            .catch(err => {
                if(err.response!=null)
                dispatch(MedicalSessionActions.getpatientfailed(err.response));
            });
    }
}




export const MedicalSessionActions = {
   
    addsessionstarted: () => {
        return {
            type: ADDMEDICAlSESSION_REQUEST
        }
    },
    addsessionsuccess: (data) => {
        return {
            type: ADDMEDICAlSESSION_SUCCESS,
            payload: data
        }
    },
    addsessionfailed: (response) => {
        return {
            type: ADDMEDICAlSESSION_FAILURE,
            errors: response.data,
            statuscode:response.status
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
    }

}

