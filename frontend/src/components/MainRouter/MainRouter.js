import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Home from '../Home/Home';
import AddPrediction from '../AddPrediction/AddPredction';
import Predictions from '../Predictions/Predictions';
import Settings from '../Settings/Settings';
import Stats from '../Stats/Stats';
import Login from '../Login/Login';
import Register from '../Register/Register';
import WelcomeMessage from '../WelcomeMessage/WelcomeMessage';
import { connect } from 'react-redux';

function MainRouter({ isLoggedIn, location }) {
  // console.log('Rendering MainRouter, location: ' + location.pathname);
  return (
    <div>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        {!isLoggedIn && <Route path='/*' component={WelcomeMessage} />}
        <Route path='/settings' component={Settings} />
        <Route path='/add_prediction' component={AddPrediction} />
        <Route path='/predictions/:username?' component={Predictions} />
        <Route path='/stats' component={Stats} />
        <Route path='/' component={Home} />
      </Switch>
    </div>
  );
}

const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn
});

export default withRouter(connect(mapStateToProps)(MainRouter));
