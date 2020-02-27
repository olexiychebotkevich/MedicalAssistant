import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Layout from './Layout';
import doctorRoutes from '../../../routes/doctorRoutes';
import SpinnerWidget from '../../spinner';


class PatientLayout extends Component {

    render() { 

        return (
            <Layout>
                <Suspense fallback={<SpinnerWidget loading="true"/>}>
                    <Switch>
                        {doctorRoutes.map((route, idx) => {
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
                         <Redirect from="/doctor/pagedoctor" to="/home" />
                    </Switch>
                </Suspense>
            </Layout>
        );
    }
}
 
export default PatientLayout;