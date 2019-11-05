/**
 * @Author: Ali
 * @Date:   2019-01-23T16:15:58+01:00
 * @Last modified by:   Ali
 * @Last modified time: 2019-11-05T06:17:33+01:00
 */

import React, { Component } from "react";
import Quiz from "./Components/Quiz";
import MyModal from "./Components/MyModal";
import SelectQuiz from "./Components/SelectQuiz";
import { QuestionsDeck, Scope } from "./QuestionsDeck";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      deck: Scope
    };
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  changeDeck = currentDeck => this.setState({ currentDeck });

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
