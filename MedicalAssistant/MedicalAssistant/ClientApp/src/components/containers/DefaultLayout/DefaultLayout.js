import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Layout from './Layout';
import defaultRoutes from '../../../routes/defaultRoutes'


class DefaultLayout extends Component {
    state = {  }
    render() { 
        return (
            <Layout>
              <Suspense fallback={<div>Загрузка...</div>}>
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