/**
 * @Author: Ali
 * @Date:   2019-02-23T11:54:58+01:00
 * @Last modified by:   Ali
 * @Last modified time: 2019-05-22T09:15:23+02:00
 */
import React, { Component } from "react";
import { QuestionsDeck, Scope } from "../QuestionsDeck";
class SelectQuiz extends Component {
  constructor() {
    super();
    this.state = {
      changeDeck: null,
      isOpen: false,
      inputValue: null
    };
  }
  toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });
  handleClose = e => {
    let currentDeck = e.target.value;
    if (currentDeck === undefined) {
      console.log("currentDeck undefined");
    } else {
      this.setState(
        { changeDeck: currentDeck },
        this.props.changeDeck(currentDeck)
      );
    }
  };
  render() {
    const menuClass = `dropdown-menu${this.state.isOpen ? " show" : ""}`;
    return (
      <div className="selectquiz">
        <div
          className="dropdown"
          style={{ margin: "0 auto" }}
          onClick={this.toggleOpen}
        >
          <button
            className="btn btn-warning dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
          >
            Change Deck
          </button>
          <div className={menuClass} aria-labelledby="dropdownMenuButton">
            <button
              value={"QuestionsDeck"}
              className="dropdown-item"
              onClick={this.handleClose}
            >
              QuestionsDeck
            </button>
            <button
              value={"Scope"}
              className="dropdown-item"
              onClick={this.handleClose}
            >
              Scope
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default SelectQuiz;
