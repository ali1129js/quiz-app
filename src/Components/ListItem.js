/**
 * @Author: Ali
 * @Date:   2019-02-25T18:58:38+01:00
 * @Last modified by:   Ali
 * @Last modified time: 2019-02-27T10:45:39+01:00
 */
import React, { Component } from "react";

class ListItem extends Component {
  render() {
    const { id, option, handleClick, answerSubmitted, isCorrect } = this.props;

    return (
      <li data-index={id} onClick={handleClick}>
        <span
          style={{
            color: isCorrect ? "inherit" : "red"
          }}
        >
          {" "}
          {option}{" "}
        </span>
      </li>
    );
  }
}
export default ListItem;
