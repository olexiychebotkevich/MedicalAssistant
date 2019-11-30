import RefreshService from './refreshService'
import * as loginActions from '../HomePage/reducer';
import update from '../../helpers/update';


export const REFRESH_STARTED = "REFRESH_STARTED";
export const REFRESH_SUCCESS = "REFRESH_SUCCESS";
export const REFRESH_FAILED = "REFRESH_FAILED";


const initialState = {
    refresh: {
    failed: false,
    loading: false,
    success: false,
    },
}

export const refreshReducer = (state = initialState, action) => {
    let newState = state;
    switch (action.type) {
        case REFRESH_STARTED: {
            newState = update.set(state, 'refresh.loading', true);
            break;
        }
        case REFRESH_SUCCESS: {
            newState = update.set(state, 'refresh.loading', false);
            newState = update.set(newState, 'refresh.success', true);
            break;
        }

        case REFRESH_FAILED: {
            newState = update.set(state, 'refresh.loading', false);
            newState = update.set(newState, 'refresh.failed', true);
            break;
        }

        default: {
            return newState;
        }

    }
    return newState;
}

export const refreshToken = (dispatch) => {
    dispatch(refreshActions.started())
    return RefreshService.RefreshToken()
        .then((response) => {
            dispatch(refreshActions.success());
        loginActions.loginByJWT(response.data, dispatch);
            return Promise.resolve(response);
        }, err=> { throw err; })
        .catch((err) => {
            dispatch(refreshActions.failed());
            loginActions.logoutByJWT(dispatch);
            return Promise.reject(err);
        })
}



export const refreshActions = {
    started: () => {
        return {
            type: REFRESH_STARTED
        }
    },
    success: () => {
        return {
            type: REFRESH_SUCCESS 
        }
    },
    failed: () => {
        return {
            type: REFRESH_FAILED
        }
    }

}
