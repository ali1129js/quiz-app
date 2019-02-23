/**
 * @Author: Ali
 * @Date:   2019-01-23T16:35:52+01:00
 * @Last modified by:   Ali
 * @Last modified time: 2019-02-23T11:30:16+01:00
 */
import React, { Component } from "react";
import Score from "./Score";
import { QuestionsDeck, Scope } from "../QuestionsDeck";

class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      questions: Scope,
      score: 0,
      questionNumber: 0,
      correct: true
    };
  }
  handleClick(e, i) {
    console.log(e.target.elements);
    const selectedAnswer = e.target.innerText;
    const correctAnswer = document.getElementById("answer").innerText;
    if (selectedAnswer === correctAnswer) {
      this.props.toggleModal();

      this.setState({
        score: this.state.score + 1,
        questionNumber: this.state.questionNumber + 1,
        correct: true
      });
    } else {
      this.props.toggleModal();

      this.setColor(i);
    }
  }
  setColor = i => {
    console.log(i);
  };

  render() {
    const { questionNumber, questions, score } = this.state;
    const question = questions.map((rawdata, i) => (
      <div key={i}>
        <div className="question">{rawdata.question}</div>
        {typeof (rawdata.options === "object") ? (
          <div className="options">
            {" "}
            {rawdata.options.map((subdata, i) => (
              <li key={i} index={i} onClick={e => this.handleClick(e, i)}>
                <span>{subdata}</span>
              </li>
            ))}{" "}
          </div>
        ) : null}
        <div id="answer" className="hidden" hidden>
          {rawdata.answer}
        </div>
        <div className="explain" hidden>
          {" "}
          {rawdata.explain}{" "}
        </div>
      </div>
    ));

    while (questionNumber < questions.length) {
      return (
        <div className="quiz">
          <div className="jumbotron">
            {question[questionNumber]}
            <button
              className="btn btn-warning mt-3 mr-3"
              onClick={() =>
                this.setState({
                  questionNumber: this.state.questionNumber - 1
                })
              }
            >
              {" "}
              Previous Question{" "}
            </button>
            <button
              className="btn btn-warning  mt-3"
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
