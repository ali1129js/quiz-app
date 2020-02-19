/**
 * @Author: Ali
 * @Date:   2019-02-23T11:54:58+01:00
 * @Last modified by:   Ali
 * @Last modified time: 2020-02-19T22:51:03+01:00
 */
import React, { Component } from "react";

class SelectQuiz extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false
    };
  }
  toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

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
              onClick={this.props.changeDeck}
            >
              QuestionsDeck
            </button>
            <button
              value={"Scope"}
              className="dropdown-item"
              onClick={this.props.changeDeck}
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
