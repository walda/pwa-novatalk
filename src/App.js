import React, { Fragment } from "react";
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainComponent from './main-component/main-component';
import SearchResultsComponent from './search-results-component/search-results-component';

function App() {
  return (
    <div className="App">
        <Router>
          <Fragment>
            <Switch>
            <Route exact path="/search" component={SearchResultsComponent} />
            <Route exact path="/" component={MainComponent} />
            </Switch>
          </Fragment>
        </Router>
      </div>
  );
}

export default App;
