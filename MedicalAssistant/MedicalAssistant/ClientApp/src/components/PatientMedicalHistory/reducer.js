import DoctorService from '../../services/DoctorService';
import update from '../../helpers/update';

export const GETSESSIONS_REQUEST = "SESSIONS_GET_REQUEST";
export const GETSESSIONS_SUCCESS = "SESSIONS_GET_SUCCESS";
export const GETSESSIONS_FAILURE = "SESSIONS_GET_FAILURE";


const initialState = {
    getsessions: {
        failed: false,
        loading: false,
        success: false,
        errors: {},
        sessions:null
    }

}



export const medicalhistoryReducer = (state = initialState, action) => {
    let newState = state;
    switch (action.type) {
        case GETSESSIONS_REQUEST: {
            newState = update.set(state, 'getsessions.loading', true);
            break;
        }

        case GETSESSIONS_SUCCESS: {
            newState = update.set(state, 'getsessions.loading', false);
            newState = update.set(newState, 'getsessions.success', true);
            newState = update.set(newState, 'getsessions.sessions', action.payload.data);
            break;
        }

        case GETSESSIONS_FAILURE: {
            newState = update.set(state, 'getsessions.loading', false);
            newState = update.set(newState, 'getsessions.success', false);
            newState = update.set(newState, 'getsessions.failed', true);
            newState = update.set(newState, 'getsessions.errors', action.errors);
            break;
        }
        default: {
            return newState;
        }

    }
    return newState;
}


export const GetSessions = (PatientId) => {
    return (dispatch) => {
        dispatch(sessionsActions.getsessionsstarted());
        DoctorService.GetPatientSessions(PatientId)
            .then((response) => {
                dispatch(sessionsActions.getsessionssuccess(response));
            }, err => { throw err; })
            .catch(err => {
                if(err.response!=null)
                dispatch(sessionsActions.getsessionsfailed(err.response));
               
            });
    }
}


export const sessionsActions = {
    getsessionsstarted: () => {
        return {
            type: GETSESSIONS_REQUEST
        }
    },
    getsessionssuccess: (data) => {
        return {
            type: GETSESSIONS_SUCCESS,
            payload: data
        }
    },
    getsessionsfailed: (response) => {
        return {
            type: GETSESSIONS_FAILURE,
            errors: response.data,
            statuscode: response.status
        }
    }

}




