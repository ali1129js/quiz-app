/**
 * @Author: Ali
 * @Date:   2019-01-23T16:35:52+01:00
 * @Last modified by:   Ali
 * @Last modified time: 2019-02-27T10:45:24+01:00
 */
import React, { Component } from "react";
import uuid from "uuid";
import Score from "./Score";
import ListItem from "./ListItem";
class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: this.props.questions,
      score: 0,
      questionNumber: 0,
      answerSubmitted: false,
      isCorrect: false
    };
  }
  handleClick = e => {
    const index = e.target.dataset.index;
    console.log(index);
    const selectedAnswer = e.target.innerText;
    const correctAnswer = document.getElementById("answer").innerText;
    if (selectedAnswer === correctAnswer) {
      this.setState({
        score: this.state.score + 1,
        questionNumber: this.state.questionNumber + 1,
        answerSubmitted: true,
        isCorrect: true
      });
    } else {
      this.props.toggleModal();
      this.setState({
        answerSubmitted: true
      });
    }
  };

  render() {
    const {
      questionNumber,
      questions,
      score,
      answerSubmitted,
      isCorrect
    } = this.state;
    const question = questions.map((rawdata, i) => (
      <div key={i}>
        <div className="question">{rawdata.question}</div>
        {typeof (rawdata.options === "object") ? (
          <div className="options">
            {" "}
            {rawdata.options.map((option, i) => {
              return (
                <ListItem
                  key={i}
                  id={uuid.v4()}
                  option={option}
                  handleClick={this.handleClick}
                  answerSubmitted={answerSubmitted}
                  isCorrect={isCorrect}
                />
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
