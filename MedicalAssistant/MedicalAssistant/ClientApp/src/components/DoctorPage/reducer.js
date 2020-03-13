import UserService from '../../services/UserService';
import update from '../../helpers/update';
import { push } from 'connected-react-router';


export const GETDOCTOR_REQUEST = "doctor/DOCTOR_GET_REQUEST";
export const GETDOCTOR_SUCCESS = "doctor/DOCTOR_GET_SUCCESS";
export const GETDOCTOR_FAILURE = "doctor/DOCTOR_GET_FAILURE";


export const GETPATIENT_REQUEST = "patient/PATIENT_GET_REQUEST";
export const GETPATIENT_SUCCESS = "patient/PATIENT_GET_SUCCESS";
export const GETPATIENT_FAILURE = "patient/PATIENT_GET_FAILURE";


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
        doctor: null
    },
    getpatient:{
        failed: false,
        loading: false,
        success: false,  
        errors:{},
        statuscode:null,
        PatientID:0
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


        case GETPATIENT_REQUEST: {
            newState = update.set(state, 'getpatient.loading', true);
            break;
        }
        case GETPATIENT_SUCCESS: {
            newState = update.set(state, 'getpatient.loading', false);
            newState = update.set(newState, 'getpatient.success', true);
            newState = update.set(newState, 'getpatient.PatientID', action.payload.data.id);
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


export const AddRecipe=(user,PatientID) =>{
    return (dispatch) => {
        dispatch(doctorActions.getpatientstarted());
        const patient={token:user.token,id:PatientID}
        UserService.IsPatientExist(patient)
            .then((response) => {
                dispatch(doctorActions.getpatientsuccess(response));
                dispatch(push('/doctor/addrecipe'));
                
            }, err => { throw err; })
            .catch(err => {
                if(err.response!=null)
                dispatch(doctorActions.getpatientfailed(err.response));
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