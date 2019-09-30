import React, { Fragment } from "react";
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainComponent from './main-component/main-component';



function App() {
  return (
    <div className="App">
        <Router>
          <Fragment>
            <Switch>
            <Route exact path="/:id" component={MainComponent} />
            <Route exact path="/" component={MainComponent} />              
            </Switch>
          </Fragment>
        </Router>
      </div>
  );
}

export default App;
