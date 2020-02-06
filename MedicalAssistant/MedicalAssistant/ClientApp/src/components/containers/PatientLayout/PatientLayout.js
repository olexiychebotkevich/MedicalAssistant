import React, { Component} from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Layout from './Layout';
import patientRoutes from '../../../routes/patientRoutes'


class PatientLayout extends Component {
    state = {  }
    render() { 
    
        return ( 
            <Layout>
                <Switch>
                {patientRoutes.map((route, idx) => {
                        return route.component ? (
                            <Route
                                key={idx}
                                path={route.path}
                                exact={route.exact}
                                name={route.name}
                                render={props => (
                                    <route.component {...props} />
                                )} />
                        ) : (console.log("--------------null-------------"));
                })}
                   
                </Switch>
            </Layout>
         );
    }
}
 
export default PatientLayout;