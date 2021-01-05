import React, { Component } from 'react';
import LangService from '../../api/LangService';
import './learningform.css';

export default class LearningForm extends Component {
	state = {
		guess: '',
	}

	onGuessChange = e => {
		this.setState({ guess: e.target.value });
	}

	onSubmit = async e => {
		try {
			e.preventDefault();
			const
			{
			isCorrect,
			nextWord,
			totalScore,
			wordCorrectCount,
			wordIncorrectCount,
			answer,
			}
			= await LangService.postGuess(this.state.guess);
			this.props.updateHead({
				isCorrect,
				answer,
				nextWord,
				totalScore,
				wordCorrectCount,
				wordIncorrectCount,
				},
				this.state.guess
			);
			this.props.startShowingResults();
			this.setState({ guess: '' });
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	render() {
    return (
			<form onSubmit={this.onSubmit} id='guess-form'>
				<label htmlFor='learn-guess-input'>
					{"What's the translation for this word?"}
				</label>
				<br/>
				<input id='learn-guess-input' onChange={this.onGuessChange} value={this.state.guess} type='text' required />
				<button type='submit'>Submit your answer</button>
			</form>
    );
  }
};
