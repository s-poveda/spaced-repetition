import React, { Component } from 'react';
import LangService from '../../api/LangService';
import LearningForm from '../../components/LearningForm/LearningForm';
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

	updateHead = head => {
		this.setState({head});
	}

  render() {
    return (
      <section id='learning-section'>
        <div>
          <h2>Translate the word:</h2>
          <span>{this.state.head.nextWord}</span>
        </div>
        <LearningForm updateHead={this.updateHead} />
        <div className='DisplayScore'>
          <p>{`Your total score is: ${this.state.head.totalScore}`}</p>
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
