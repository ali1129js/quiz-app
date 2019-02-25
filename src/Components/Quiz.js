/**
 * @Author: Ali
 * @Date:   2019-01-23T16:35:52+01:00
 * @Last modified by:   Ali
 * @Last modified time: 2019-02-24T11:23:44+01:00
 */
import React, { Component } from "react";
import Score from "./Score";

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: this.props.questions,
      score: 0,
      questionNumber: 0,
      answerSubmitted: null
    };
  }
  handleClick = e => {
    const index = e.target.dataset.index;
    const selectedAnswer = e.target.innerText;
    const correctAnswer = document.getElementById("answer").innerText;
    if (selectedAnswer === correctAnswer) {
      this.setState({
        score: this.state.score + 1,
        questionNumber: this.state.questionNumber + 1,
        answerSubmitted: true
      });
    } else {
      this.props.toggleModal();
      this.setState({
        answerSubmitted: false
      });
    }
  };

  render() {
    const { questionNumber, questions, score, answerSubmitted } = this.state;
    const question = questions.map((rawdata, i) => (
      <div key={i}>
        <div className="question">{rawdata.question}</div>
        {typeof (rawdata.options === "object") ? (
          <div className="options">
            {" "}
            {rawdata.options.map((subdata, i) => {
              let answerColor;
              if (answerSubmitted) {
                answerColor = { color: "green" };
              } else {
                answerColor = { color: "red" };
              }

              return (
                <li key={i} data-index={i} onClick={this.handleClick}>
                  <span style={answerColor}>{subdata}</span>
                </li>
              );
            })}
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
