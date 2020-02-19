/**
 * @Author: Ali
 * @Date:   2019-01-23T16:15:58+01:00
 * @Last modified by:   Ali
 * @Last modified time: 2020-02-19T22:59:03+01:00
 */

import React, { Component } from "react";
import Quiz from "./Components/Quiz";
import MyModal from "./Components/MyModal";
import SelectQuiz from "./Components/SelectQuiz";
import { QuestionsDeck, Scope } from "./QuestionsDeck";
import "./App.css";

class App extends Component {
  state = {
    isOpen: false,
    deck: QuestionsDeck
  };

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  changeDeck = () => {
    console.log("logged");
    this.setState(state => ({
      deck: Scope
    }));
  };

  render() {
    return (
      <div className="container">
        <SelectQuiz changeDeck={this.changeDeck} />
        <MyModal show={this.state.isOpen} onClose={this.toggleModal} />
        <Quiz toggleModal={this.toggleModal} questions={this.state.deck} />
      </div>
    );
  }
}
export default App;
