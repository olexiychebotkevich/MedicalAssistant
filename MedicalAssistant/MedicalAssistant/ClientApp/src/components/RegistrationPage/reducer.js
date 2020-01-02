import UserService from '../UserService';
import update from '../../helpers/update';
import {history} from '../../store/configureStore';

export const REGISTER_REQUEST = "user/USERS_REGISTER_REQUEST";
export const REGISTER_SUCCESS = "user/USERS_REGISTER_SUCCESS";
export const REGISTER_FAILURE = "user/USERS_REGISTER_FAILURE";

export const LOGIN_REQUEST = "user/USERS_LOGIN_REQUEST";
export const LOGIN_SUCCESS = "user/USERS_LOGIN_SUCCESS";
export const LOGIN_FAILURE = "user/USERS_LOGIN_FAILURE";

export const LOGOUT = 'user/USERS_LOGOUT';


export const DELETE_REQUEST = "user/USERS_DELETE_REQUEST";
export const DELETE_SUCCESS = "user/USERS_DELETE_SUCCESS";
export const DELETE_FAILURE = "user/USERS_DELETE_FAILURE";


const initialState = {
    registration: {
    failed: false,
    loading: false,
    success: false,
    user: null,
    errors:{},
    statuscode:null
    },
}

export const usersReducer = (state = initialState, action) => {
    let newState = state;
    switch (action.type) {
        case REGISTER_REQUEST: {
            newState = update.set(state, 'registration.loading', true);
            break;
        }
        case REGISTER_SUCCESS: {
            newState = update.set(state, 'registration.loading', false);
            newState = update.set(newState, 'registration.success', true);
            newState = update.set(newState, 'registration.user', action.payload.data);
            break;
        }

        case REGISTER_FAILURE: {
            newState = update.set(state, 'registration.loading', false);
            newState = update.set(newState, 'registration.failed', true);
            newState = update.set(newState, 'registration.errors', action.errors);
            newState = update.set(newState, 'registration.statuscode', action.statuscode);
            break;
        }
        default: {
            return newState;
        }

    }
    return newState;
}

export const registrUser = (user) => {
    return (dispatch) => {
        dispatch(registrActions.started());
        UserService.register(user)
            .then((response) => {
                dispatch(registrActions.success(response));
                history.push('/');
            }, err => { throw err; })
            .catch(err => {
                console.log("error: ",err);
                dispatch(registrActions.failed(err.response));
               
            });
    }
}

export const registrActions = {
    started: () => {
        return {
            type: REGISTER_REQUEST
        }
    },
    success: (data) => {
        return {
            type: REGISTER_SUCCESS,
            payload: data
        }
    },
    failed: (response) => {
        return {
            type: REGISTER_FAILURE,
            errors: response.data,
            statuscode:response.status
        }
    }

}
