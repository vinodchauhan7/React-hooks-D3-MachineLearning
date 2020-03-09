import React from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import BarChart from "./components/BarChart/barChart.component";
import GuageChartExample from "./components/GuageChart/gchart.component";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <div className="heading">
          <Link to="/">Home</Link>
          <Link to="/barChart">Bar Chart</Link>
        </div>

        <Switch>
          <Route path="/" exact component={GuageChartExample} />
          <Route path="/barChart" exact component={BarChart} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
