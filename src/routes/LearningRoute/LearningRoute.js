import React, { Component } from 'react';
import LangService from '../../api/LangService';
import './LearningRoute.css';
class LearningRoute extends Component {
  state = { head: {} };
  async componentDidMount() {
    try {
      const head = await LangService.getHead();
      this.setState({ head });
    } catch (e) {
      throw new Error(e.message);
    }
  }

  render() {
    return (
			<section>
				<div>
				<h2>Translate the word:</h2>
				<span>{this.state.head.nextWord}</span>
				</div>
        <form>
          <label htmlFor='learn-guess-input'>{"What's the translation for this word?"}</label>
          <input id='learn-guess-input' type='text' required />
          <button type='submit'>Submit your answer</button>
        </form>
        <div>
          // REVIEW: this may need fixing with state properties. Unable to test code ATM
          // Just going off of what tests have
          <p>
            You have answered this word correctly ${this.state.head.correct_count} times.
          </p>
          <p>
            You have answered this word incorrectly ${this.state.head.incorrect_count} times.
          </p>
        </div>
			</section>
		);
  }
}

export default LearningRoute;
