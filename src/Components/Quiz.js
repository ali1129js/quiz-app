/**
 * @Author: Ali
 * @Date:   2019-01-23T16:35:52+01:00
 * @Last modified by:   Ali
 * @Last modified time: 2019-01-24T13:32:01+01:00
 */
import React, { Component } from "react";
class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      questions: [
        {
          question: "What is 10 + 10",
          options: ["3", "20", "34", "45"],
          answer: "20"
        },
        {
          question: "What is Athena's favourite animal",
          options: ["otters", "dogs", "cats", "horses"],
          answer: "otters"
        }
      ],
      correct: 0,
      questionNumber: 1
    };
  }
  handleClick(e) {
    const selectedAnswer = e.target.innerText;
    const correctAnswer = "otters";
    console.log(selectedAnswer, typeof selectedAnswer);
    console.log(correctAnswer, typeof correctAnswer);
    console.log(selectedAnswer === correctAnswer);
  }
  render() {
    const { questionNumber } = this.state;
    const questions = this.state.questions.map(rawdata => (
      <div className="">
        <div className="question">{rawdata.question}</div>
        {typeof (rawdata.options === "object") ? (
          <div className="options">
            {" "}
            {rawdata.options.map(subdata => (
              <li onClick={this.handleClick}> {subdata} </li>
            ))}{" "}
          </div>
        ) : null}
      </div>
    ));

    return (
      <div className="quiz">
        <div className="jumbotron">
          {questions[questionNumber]}

          <a
            className="btn btn-primary btn-lg"
            href="https://github.com"
            role="button"
          >
            Learn more
          </a>
        </div>
      </div>
    );
  }
}
export default Quiz;
