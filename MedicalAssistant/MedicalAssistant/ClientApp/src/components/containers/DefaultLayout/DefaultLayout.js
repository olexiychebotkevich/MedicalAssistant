import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Layout from './Layout';
import defaultRoutes from '../../../routes/defaultRoutes'


class DefaultLayout extends Component {
    state = {  }
    render() { 
        console.log('-------this-----', this.props);
        console.log('-------default routes-----', defaultRoutes);
        return (
            <Layout>
              <h1>Hello default Layout</h1>
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