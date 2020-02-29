import React from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import BarChart from "./components/BarChart/barChart.component";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Link to="/">Home</Link>

        <Switch>
          <Route path="/" exact component={BarChart} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
