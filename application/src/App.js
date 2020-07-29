import React from 'react';
import { Route } from 'react-router';
import { Layout } from './containers/Layout/Layout';
import Dashboard from './containers/Home/Dashboard';
import Settings from './containers/Settings/Settings';

function App() {
  return (
    <Layout>
      <Route exact path='/' component={Dashboard} />
      <Route exact path='/settings' component={Settings} />
    </Layout>
  );
}

export default App;
