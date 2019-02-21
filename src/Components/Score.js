/**
 * @Author: Ali
 * @Date:   2019-02-14T12:20:29+01:00
 * @Last modified by:   Ali
 * @Last modified time: 2019-02-21T08:36:13+01:00
 */
import React from "react";

const Score = props => ({
  render() {
    return (
      <div className="finish">
        <h2> End of Deck </h2>
        <p>
          {" "}
          Your score is {props.score} of {props.length}{" "}
        </p>
      </div>
    );
  }
});
export default Score;
