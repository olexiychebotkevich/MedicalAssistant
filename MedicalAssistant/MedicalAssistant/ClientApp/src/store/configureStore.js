import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createHistory from 'history/createHashHistory'
import {usersReducer} from '../components/RegistrationPage/reducer'
import {loginReducer} from '../components/LoginPage/reducer'
import { refreshReducer } from '../components/RefreshToken/reducer';
import {patientsReducer} from '../components/PagePatient/reducer';
import {doctorsReducer} from '../components/DoctorPage/reducer';
import {MedicalSessionReducer} from '../components/Add-MedicalSession/reducer';

import refreshTokenMiddleware from './middleware/refreshTokenMiddleware';


// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
export const history = createHistory({ basename: baseUrl });

export default function configureStore(history, initialState) {
  const reducers = {
    usersReducer,
    loginReducer,
    patientsReducer,
    doctorsReducer,
    MedicalSessionReducer,
    refreshToken: refreshReducer,

  };

  const middleware = [
    refreshTokenMiddleware(),
    thunk,
    routerMiddleware(history)
  ];

  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = [];
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
    enhancers.push(window.devToolsExtension());
  }



    const appReducer  = combineReducers({
    ...reducers,
    router: connectRouter(history)
    });

    const rootReducer = (state, action) => {
        if (action.type === 'USERS_LOGOUT') {
            state = undefined
        }

        return appReducer(state, action)
    }

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  );
}