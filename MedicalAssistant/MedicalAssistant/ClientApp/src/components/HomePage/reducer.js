import UserService from '../UserService';
import update from '../../helpers/update';
import {history} from '../../store/configureStore';


export const LOGIN_REQUEST = "user/USERS_LOGIN_REQUEST";
export const LOGIN_SUCCESS = "user/USERS_LOGIN_SUCCESS";
export const LOGIN_FAILURE = "user/USERS_LOGIN_FAILURE";

export const LOGOUT = 'user/USERS_LOGOUT';



const initialState = {
    login: {
    failed: false,
    loading: false,
    success: false,
    user: null,
    token:null,
    errors:{}
    },
}

export const loginReducer = (state = initialState, action) => {
    let newState = state;
    switch (action.type) {
        case LOGIN_REQUEST: {
            newState = update.set(state, 'login.loading', true);
            break;
        }
        case LOGIN_SUCCESS: {
            newState = update.set(state, 'login.loading', false);
            newState = update.set(newState, 'login.success', true);
            newState = update.set(newState, 'login.user', action.payload.data);
            break;
        }

        case LOGIN_FAILURE: {
            newState = update.set(state, 'login.loading', false);
            newState = update.set(newState, 'login.failed', true);
            newState = update.set(newState, 'login.errors', action.errors);
            break;
        }
        default: {
            return newState;
        }

    }
    return newState;
}

export const loginUser = (user) => {
    return (dispatch) => {
        dispatch(registrActions.started());
        UserService.login(user)
            .then((response) => {
                dispatch(loginActions.success(response));
                localStorage.setItem('user', JSON.stringify(user));
                history.push('/');
            }, err => { throw err; })
            .catch(err => {
                console.log("error: ",err);
                dispatch(loginActions.failed(err.response));
                //redirectStatusCode(err.response.status);
            });
    }
}

export const loginActions = {
    started: () => {
        return {
            type: LOGIN_REQUEST
        }
    },
    success: (data) => {
        return {
            type: LOGIN_SUCCESS,
            payload: data
        }
    },
    failed: (response) => {
        return {
            type: LOGIN_FAILURE,
            errors: response.data
        }
    }

}
