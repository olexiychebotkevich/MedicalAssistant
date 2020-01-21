import UserService from '../UserService';
import update from '../../helpers/update';
import isEmpty from 'lodash/isEmpty';
import setAuthorizationToken from '../../utils/setAuthorizationToken';
import jwt from 'jsonwebtoken';
import { push } from 'connected-react-router';


export const LOGIN_POST_STARTED = "user/USERS_LOGIN_POST_STARTED";
export const LOGIN_SUCCESS = "user/USERS_LOGIN_SUCCESS";
export const LOGIN_FAILURE = "user/USERS_LOGIN_FAILURE";
export const LOGIN_SET_CURRENT_USER = "login/SET_CURRENT_USER";

export const LOGOUT = 'user/USERS_LOGOUT';

let user = jwt.decode(localStorage.getItem('jwtToken'));

const initialState = {
    login: {
    failed: false,
    loading: false,
    success: false,
    isAuthenticated: false,
    errors:{}
    },
    user: user ? user : null
}

export const loginReducer = (state = initialState, action) => {
    let newState = state;
    switch (action.type) {
        case LOGIN_POST_STARTED: {
            newState = update.set(state, 'login.loading', true);
            break;
        }
        case LOGIN_SUCCESS: {
            newState = update.set(state, 'login.loading', false);
            newState = update.set(newState, 'login.success', true);
            break;
        }

        case LOGIN_FAILURE: {
            newState = update.set(state, 'login.loading', false);
            newState = update.set(newState, 'login.failed', true);
            newState = update.set(newState, 'login.errors', action.errors);
            break;
        }

        case LOGIN_SET_CURRENT_USER: {
            return {
                ...state,
                isAuthenticated: !isEmpty(action.user),
                user: action.user
            };
        }
        default: {
            return newState;
        }

    }
    return newState;
}

export const loginUser = (user) => {
    return (dispatch) => {
        dispatch(loginActions.started());
        UserService.login(user)
            .then((response) => {
                dispatch(loginActions.success());
                loginByJWT(response.data, dispatch);
                dispatch(push('/pagedoctor'));
          
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
            type: LOGIN_POST_STARTED
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
    },

    setCurrentUser: (user) => {
        return {
            type: LOGIN_SET_CURRENT_USER,
            user
        }
    }

}



export function logout() {
    return dispatch => {
        logoutByJWT(dispatch);
    };
}

export const loginByJWT = (tokens, dispatch) => {
    const {token, refToken}=tokens;
    var user = jwt.decode(token);
    if (!Array.isArray(user.roles)) {
        user.roles = Array.of(user.roles);
    }
    //console.log('Hello app', user);
    localStorage.setItem('jwtToken', token);
    localStorage.setItem('refreshToken', refToken);
    setAuthorizationToken(token);
    dispatch(loginActions.setCurrentUser(user));
}
export const logoutByJWT = (dispatch) => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('refreshToken');
    setAuthorizationToken(false);
    dispatch(loginActions.setCurrentUser({}));
}