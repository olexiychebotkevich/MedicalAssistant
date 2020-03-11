import UserService from '../../services/UserService';
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

if(localStorage.getItem('jwtToken'))
var user = jwt.decode(localStorage.getItem('jwtToken'));
 

const initialState = {
    login: {
    failed: false,
    loading: false,
    success: false,
    isAuthenticated:  user ? true : false,
    errors:{},
    statuscode:null
    },
    user: user ? user : null,
  
  
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
            newState = update.set(newState, 'login.isAuthenticated', true);
            newState = update.set(newState, 'isAuthenticated', true);
            
            
            break;
        }

        case LOGIN_FAILURE: {
            newState = update.set(state, 'login.loading', false);
            newState = update.set(newState, 'login.failed', true);
            newState = update.set(newState, 'login.errors', action.errors);
            newState = update.set(newState, 'login.statuscode', action.statuscode);
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

export const loginUser = (user,isDoctor) => {

    return (dispatch) => {
        dispatch(loginActions.started());
        UserService.login(user)
            .then((response) => {
                dispatch(loginActions.success());
                loginByJWT(response.data, dispatch);
               
                if(isDoctor===true)
                {
                    checkDoctor(dispatch);
                    localStorage.setItem('isDoctor', true);
                }
                else
                {
                    checkPatient(dispatch);
                    localStorage.setItem('isDoctor', false);
                }
            }, err => { throw err; })
            .catch(err=> {
                if(err.response!=null)
                dispatch(loginActions.failed(err.response));
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
            errors: response.data,
            statuscode:response.status
        }
    },

    setCurrentUser: (user) => {
        return {
            type: LOGIN_SET_CURRENT_USER,
            user
        }
    }

}


export function checkPatient(dispatch)
{
    const user = jwt.decode(localStorage.getItem('jwtToken'))
    const token = localStorage.getItem('jwtToken')
    UserService.IsPatientExist({...user,token})
    .then((response) => {
        dispatch(push('/patient/pagepatient'));
    }, err => { throw err; })
    .catch(err=> {
        if(err.response!=null)
        dispatch(loginActions.failed(err.response));
    });
}


export function checkDoctor(dispatch)
{
    const user = jwt.decode(localStorage.getItem('jwtToken'))
    const token = localStorage.getItem('jwtToken')
    UserService.IsDoctorExist({...user,token})
    .then((response) => {
        dispatch(push('/doctor/pagedoctor'));
    }, err => { throw err; })
    .catch(err=> {
        if(err.response!=null)
        dispatch(loginActions.failed(err.response));
    });
}


export function logout() {
    return dispatch => {
        initialState.user=null;
        logoutByJWT(dispatch);
        dispatch(push('/'));
    };
}

export const loginByJWT = (tokens, dispatch) => {
    console.log("-------login by jwt");
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
