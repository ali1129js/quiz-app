/**
 * @Author: Ali
 * @Date:   2019-01-23T16:35:52+01:00
 * @Last modified by:   Ali
 * @Last modified time: 2019-02-14T12:28:18+01:00
 */
import React, { Component } from "react";
import Score from "./Score";
class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      questions: [
        {
          questionNumber: 0,
          question: "What is the most appropriate use of an object?",
          options: [
            "to have numeric properties (keys)",
            "to only store strings",
            "to hold pairs of named properties and values",
            "to find out the count of properties"
          ],
          answer: "to hold pairs of named properties and values",
          explain:
            "You theoretically could use an array as a normal object with your own named properties, or you could use an object but only give it numeric properties (0, 1, etc.) similar to an array. However, this would generally be considered improper usage of the respective types. The best and most natural approach is to use arrays for numerically positioned values and use objects for named properties."
        },
        {
          questionNumber: 1,
          question: "What is the return value of: typeof null?",
          options: ["boolean", "object", "undefined", "number"],
          answer: "object",
          explain:
            "typeof null is an interesting case, because it errantly returns 'object', when you'd expect it to return 'null' (just like typeof undefined returns undefined)"
        },
        {
          questionNumber: 2,
          question: "Which of the following is an array property?",
          options: ["values", "count", "limit", "length"],
          answer: "length",
          explain:
            "Because arrays are special objects (as typeof implies), they can also have properties, including the automatically updated length property."
        },
        {
          questionNumber: 3,
          question: "Which is a valid JavaScript type for numerical data?",
          options: ["float", "int", "number", "long"],
          answer: "number",
          explain:
            "Unlike many coding languages, JavaScript has only one primitve numerical type: number. This is used for both integers and floating point values."
        },
        {
          questionNumber: 4,
          question: "What is the output of console.log(typeof [])?",
          options: ["undefined", "object", "array", "null"],
          answer: "object",
          explain:
            "In JavaScript, arrays are a type of object. There is no array type."
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
            "arrays hold values with indexed positions instead of key/value pairs",

          explain:
            "An array is an object that holds values (of any type) not particularly in named properties/keys, but rather in numerically indexed positions. Languages that start counting at zero, like JS does, use 0 as the index of the first element in the array."
        }
      ],
      score: 0,
      questionNumber: 0,
      correct: true
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    const selectedAnswer = e.target.innerText;
    const correctAnswer = document.getElementById("answer").innerText;
    if (selectedAnswer === correctAnswer) {
      alert("Correct");
      this.setState({
        score: this.state.score + 1,
        questionNumber: this.state.questionNumber + 1,
        correct: true
      });
    } else {
      alert("Incorrect! Try Again!");
      this.setState({
        correct: false
      });
    }
  }

  render() {
    const { questionNumber, questions, score } = this.state;
    const question = this.state.questions.map((rawdata, i) => (
      <div key={i}>
        <div className="question">{rawdata.question}</div>
        {typeof (rawdata.options === "object") ? (
          <div className="options">
            {" "}
            {rawdata.options.map((subdata, i) => (
              <li key={i} onClick={this.handleClick}>
                <span>{subdata}</span>
              </li>
            ))}{" "}
          </div>
        ) : null}
        <div id="answer" className="hidden" hidden>
          {rawdata.answer}
        </div>
      </div>
    ));
    while (questionNumber < questions.length) {
      return (
        <div className="quiz">
          <div className="jumbotron">
            {question[questionNumber]}
            <div className="results"> Your Score is {this.state.score} </div>
            <button
              onClick={() =>
                this.setState({
                  questionNumber: this.state.questionNumber + 1
                })
              }
            >
              {" "}
              Skip This Question{" "}
            </button>
          </div>
        </div>
      );
    }
    return <Score score={score} length={questions.length} />;
  }
}
export default Quiz;
