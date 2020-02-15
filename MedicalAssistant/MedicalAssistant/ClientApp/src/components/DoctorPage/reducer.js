import UserService from '../UserService';
import update from '../../helpers/update';
import { push } from 'connected-react-router';


export const GETDOCTOR_REQUEST = "doctor/DOCTOR_GET_REQUEST";
export const GETDOCTOR_SUCCESS = "doctorDOCTOR_GET_SUCCESS";
export const GETDOCTOR_FAILURE = "doctor/DOCTOR_GET_FAILURE";


export const UPDATEDOCTOR_REQUEST = "doctor/DOCTOR_UPDATE_REQUEST";
export const UPDATEDOCTOR_SUCCESS = "doctor/DOCTOR_UPDATE_SUCCESS";
export const UPDATEDOCTOR_FAILURE = "doctor/DOCTOR_UPDATE_FAILURE";

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
        updatedoctor: null
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
            newState = update.set(newState, 'updatedoctor.updatedoctor', action.payload.data);
            break;
        }

        case UPDATEDOCTOR_FAILURE: {
            newState = update.set(state, 'updatedoctor.loading', false);
            newState = update.set(newState, 'updatedoctor.failed', true);
            newState = update.set(newState, 'updatedoctor.success', false);
           
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
                console.log("--------------redponse: ",response)
                dispatch(doctorActions.getsuccess(response));
            }, err => { throw err; })
            .catch(err => {
                console.log("-------------error: ",err);
                dispatch(doctorActions.getfailed(err.response));
                

               
            });
    }
}




export const changeImage = (user,doctor) => {
    return (dispatch) => {
        dispatch(doctorActions.updatestarted());
        UserService.changeImage(user,doctor)
            .then((response) => {
                console.log("--------------redponse: ",response)
                dispatch(doctorActions.updatesuccess(response));
            }, err => { throw err; })
            .catch(err => {
                console.log("error: ",err);
                dispatch(doctorActions.updatefailed(err.response));
               
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
    }

}