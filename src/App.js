/**
 * @Author: Ali
 * @Date:   2019-01-23T16:15:58+01:00
 * @Last modified by:   Ali
 * @Last modified time: 2019-01-23T16:47:30+01:00
 */

import React, { Component } from "react";
import Quiz from "./Components/Quiz";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Quiz />
      </div>
    );
  }
}

export default App;
