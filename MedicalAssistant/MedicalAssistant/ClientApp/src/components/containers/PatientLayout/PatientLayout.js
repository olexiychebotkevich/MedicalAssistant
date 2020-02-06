import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Layout from './Layout';
import patientRoutes from '../../../routes/patientRoutes';


class PatientLayout extends Component {

    render() { 

        return (
            <Layout>
                <Suspense fallback={<div>Загрузка...</div>}>
                    <Switch>
                        {patientRoutes.map((route, idx) => {
                            return (
                                <Route
                                    key={idx}
                                    path={route.path}
                                    exact={route.exact}
                                    name={route.name}
                                    render={props => (
                                        <route.component {...props} />
                                    )} />
                            );
                        })}
                         <Redirect from="/patient" to="/pagepatient" />
                    </Switch>
                </Suspense>
            </Layout>
        );
    }
}
 
export default PatientLayout;