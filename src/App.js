/**
 * @Author: Ali
 * @Date:   2019-01-23T16:15:58+01:00
 * @Last modified by:   Ali
 * @Last modified time: 2019-02-23T11:31:20+01:00
 */

import React, { Component } from "react";
import Quiz from "./Components/Quiz";
import MyModal from "./Components/MyModal";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }
  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return (
      <div className="container">
        <MyModal show={this.state.isOpen} onClose={this.toggleModal} />
        <Quiz
          toggleModal={this.toggleModal}
          handleBackground={this.handleBackground}
        />
      </div>
    );
  }
}

export default App;
