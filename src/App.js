import React, {Component, Suspense} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Spinner from './components/UI/Spinner/Spinner';

const Register = React.lazy(() => import('./containers/Register/Register'));
const Ready = React.lazy(() => import('./components/Ready/Ready'));
const Questionnaire = React.lazy(() => import('./containers/Questionnaire/Questionnaire'));
const Finished = React.lazy(() => import('./components/Finished/Finished'));
const Consent = React.lazy(() => import('./components/Consent/Consent'));

class App extends Component {
  render(){
    return(
        <Switch>
          <Suspense fallback={<Spinner/>}>

            <Route path="/register" component={Register}/>
            <Route path="/start" component={Ready}>
              {this.props.pID === "" ? <Redirect to="/"/> : null}
            </Route>
            <Route path="/questionnaire" component={Questionnaire}>
              {this.props.pID === "" ? <Redirect to="/"/> : null}
            </Route>
            <Route path="/finished" component={Finished}>
              {this.props.pID === "" ? <Redirect to="/"/> : null}
            </Route>
            <Route path="/" exact component={Consent}/>
          </Suspense>
        </Switch>
    );
  }
}

const mapStateToProps = state => {
  return {
      reg: state.register.register,
      pos: state.register.registerPos,
      nam: state.register.name,
      ema: state.register.email,
      lev: state.register.level,
      pID: state.register.participantID
  }
}

export default connect(mapStateToProps)(App);
