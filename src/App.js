/**
 * @Author: Ali
 * @Date:   2019-01-23T16:15:58+01:00
 * @Last modified by:   Ali
 * @Last modified time: 2019-02-21T08:57:14+01:00
 */

import React, { Component } from "react";
import Quiz from "./Components/Quiz";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      background: ""
    };
  }

  handleBackground = () => {
    //change the background
    this.setState({
      background: "red"
    });
  };
  render() {
    return (
      <div className="container">
        <div style={{ backgroundColor: this.state.background }}>
          {" "}
          <Quiz handleBackground={this.handleBackground} />{" "}
        </div>
      </div>
    );
  }
}

export default App;
