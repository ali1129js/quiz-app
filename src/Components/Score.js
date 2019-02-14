/**
 * @Author: Ali
 * @Date:   2019-02-14T12:20:29+01:00
 * @Last modified by:   Ali
 * @Last modified time: 2019-02-14T12:26:46+01:00
 */
import React from "react";

const Score = props => ({
  render() {
    return (
      <div className="finish">
        <h2> Game Over </h2>
        <p>
          {" "}
          Your score is {props.score} of {props.length}{" "}
        </p>
      </div>
    );
  }
});
export default Score;
