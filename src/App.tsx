import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// Route Components
import { LandingPage } from './components/pages/LandingPage';
import { Activation } from './components/pages/Activated';
import { Dashboard } from './components/pages/Dashboard';
import { PrivateRoute } from './components/common';

const App: React.FC = () => {
  return (
    <div className="App">
      <Switch>
        {/* Public Routes */}
        <Route
          exact
          path={['/', '/login', '/register', '/signup', '/info']}
          component={() => <LandingPage />}
        />
        <Route path="/activated/:token" component={Activation} />

        {/* Private Routes */}
        <PrivateRoute path="/dashboard" component={Dashboard} />

        {/* Fallback Redirect to Dashboard */}
        <Route path="/" component={() => <Redirect to="/dashboard" />} />
      </Switch>
    </div>
  );
};

export default App;
