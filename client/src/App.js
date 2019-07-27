import React from "react";
import Home from "./shared/home";
import "./App.css";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="contentBody">
        <React.Fragment>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </React.Fragment>
      </div>
    </Router>
  );
}

export default App;
