import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import configureStore, {history} from './store/configureStore';
import App from './App';
import  registerServiceWorker from './registerServiceWorker';
import * as loginActions from './components/LoginPage/reducer';
import jwt from 'jsonwebtoken';
import { push } from 'connected-react-router';


// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState = window.initialReduxState;
const store = configureStore(history, initialState);
console.log("-----1");
if(localStorage.jwtToken && localStorage.refreshToken)
{
  const userjwt = jwt.decode(localStorage.jwtToken);
  if(userjwt.roles==="Doctor")
  {
    loginActions.checkDoctor(store.dispatch);
  }
  if(userjwt.roles==="Patient")
  {
    loginActions.checkPatient(store.dispatch);
  }
}



const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  rootElement);

  registerServiceWorker(); 