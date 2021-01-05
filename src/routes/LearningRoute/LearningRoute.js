import React, { Component } from 'react';
import LangService from '../../api/LangService';
import LearningForm from '../../components/LearningForm/LearningForm';
import './LearningRoute.css';
class LearningRoute extends Component {
  state = { head: {}, previousWord: null, showingResults: false };

  async componentDidMount() {
    try {
      const head = await LangService.getHead();
      this.setState({ head });
    } catch (e) {
      throw new Error(e.message);
    }
  }

  updateHead = (head, guess) => {
    const previousWord = Object.assign({ guess }, this.state.head);
    this.setState({ head, previousWord });
  };

  startShowingResults = () => this.setState({ showingResults: true });
  stopShowingResults = () => this.setState({ showingResults: false });

  render() {
    if (this.state.showingResults) {
      if (this.state.head.isCorrect) return (
				<section id='learning-section'>
          <h2>You were correct! :D</h2>
          <div className='DisplayScore'>
            <p>{`Your total score is: ${this.state.head.totalScore}`}</p>
          </div>
          <div className='DisplayFeedback'>
            <p>
              The correct translation for {this.state.previousWord.nextWord} was{' '}
              {this.state.head.answer} and you chose{' '}
              {this.state.previousWord.guess}!
            </p>
          </div>
          <button onClick={this.stopShowingResults}>Try another word!</button>
        </section>
			);
      return (
        <section id='learning-section'>
          <h2>Good try, but not quite right :(</h2>
          <div className='DisplayScore'>
            <p>{`Your total score is: ${this.state.head.totalScore}`}</p>
          </div>
          <div className='DisplayFeedback'>
            <p>
              The correct translation for {this.state.previousWord.nextWord} was{' '}
              {this.state.head.answer} and you chose{' '}
              {this.state.previousWord.guess}!
            </p>
          </div>
          <button onClick={this.stopShowingResults}>Try another word!</button>
        </section>
      );
    }
    return (
      <section id='learning-section'>
        <div>
          <h2>Translate the word:</h2>
          <span>{this.state.head.nextWord}</span>
        </div>
        <LearningForm
          updateHead={this.updateHead}
          startShowingResults={this.startShowingResults}
        />
        <div className='DisplayScore'>
          <p>{`Your total score is: ${this.state.head.totalScore}`}</p>
        </div>
        <div>
          <p>
            You have answered this word correctly{' '}
            {this.state.head.wordCorrectCount} times.
          </p>
          <p>
            You have answered this word incorrectly{' '}
            {this.state.head.wordIncorrectCount} times.
          </p>
        </div>
      </section>
    );
  }
}

export default LearningRoute;
