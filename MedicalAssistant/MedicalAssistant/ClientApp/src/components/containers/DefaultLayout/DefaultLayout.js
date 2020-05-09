import React, { Component, Suspense } from './node_modules/react';
import { Redirect, Route, Switch } from './node_modules/react-router-dom';
import Layout from './Layout';
import defaultRoutes from '../../../routes/defaultRoutes';
import SpinnerWidget from '../../spinner';


import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Layout from './Layout';
import defaultRoutes from '../../../routes/defaultRoutes';
import SpinnerWidget from '../../spinner';



class DefaultLayout extends Component {
    state = {}
    render() {
        return (
            <Layout>
                <Suspense fallback={<SpinnerWidget loading="true" />}>
                    <Switch>
                        {defaultRoutes.map((route, idx) => {
                            return route.component ? (
                                <Route
                                    key={idx}
                                    path={route.path}
                                    exact={route.exact}
                                    name={route.name}
                                    render={props => (
                                        <route.component {...props} />
                                    )} />
                            ) : (null);
                        })}
                        <Redirect from="/" to="/home" />
                    </Switch>
                </Suspense>

            </Layout>
        );
    }
}

export default DefaultLayout;