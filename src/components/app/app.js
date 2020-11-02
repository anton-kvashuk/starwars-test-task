import React, { Component } from "react";

import Header from "../header";

import ErrorBoundry from "../error-boundry";
import SwapiService from "../../services/swapi-service";

import PlanetsPage from "../pages/planets-page";

import { SwapiServiceProvider } from "../swapi-service-context";

import "./app.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PlanetDetails from "../sw-components/planet-details";

export default class App extends Component {
  state = {
    swapiService: new SwapiService(),
  };

  render() {
    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <div className="stardb-app">
              <Header />
              <Switch>
                <Route 
                  path="/"
                  render={() => (
                    <h2>Welcome to SWAPI test-task click on Planets Please</h2>
                  )}
                  exact 
                />
                <Route path="/planets" exact component={PlanetsPage} />
                <Route
                  path="/planets/:id"
                  render={({ match }) => {
                    const { id } = match.params;
                    return <PlanetDetails itemId={id} />;
                  }}
                />
                <Route render={() => <h2>Page not found</h2>} />
              </Switch>
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
