/**
 * @Author: Ali
 * @Date:   2019-01-23T16:35:52+01:00
 * @Last modified by:   Ali
 * @Last modified time: 2019-01-24T14:17:38+01:00
 */
import React, { Component } from "react";
class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      questions: [
        {
          questionNumber: 0,
          question: "What is 10 + 10",
          options: ["3", "20", "34", "45"],
          answer: "20"
        },
        {
          questionNumber: 1,
          question: "What is Athena's favourite animal",
          options: ["otters", "dogs", "cats", "horses"],
          answer: "otters"
        },
        {
          questionNumber: 2,
          question: "How old is the PLanet",
          options: [
            "6000 Years",
            "300,000 Years",
            "1 million years",
            "4.7 billion Years"
          ],
          answer: "4.7 billion Years"
        },
        {
          questionNumber: 3,
          question: "Which is a valid JavaScript type for numerical data?",
          options: ["float", "int", "number", "long"],
          answer: "number"
        },
        {
          questionNumber: 4,
          question: "What is the output of console.log(typeof [])?",
          options: ["undefined", "object", "array", "null"],
          answer: "object"
        },
        {
          questionNumber: 5,
          question:
            "What is the main difference between an array and an object?",
          options: [
            "the maximum length of values they can hold",
            "positions in arrays begin from 0 and in objects from 1",
            "arrays hold values with indexed positions instead of key/value pairs",
            "anything can be stored in objects but only strings and numbers in an array"
          ],
          answer:
            "arrays hold values with indexed positions instead of key/value pairs"
        }
      ],
      correct: 0,
      questionNumber: 5
    };
  }
  handleClick(e) {
    const selectedAnswer = e.target.innerText;
    const correctAnswer = document.getElementById("answer").innerText;
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
        <div id="answer" className="hidden">
          {rawdata.answer}
        </div>
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
            Next
          </a>
        </div>
      </div>
    );
  }
}
export default Quiz;
