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
			nextWord,
			totalScore,
			wordCorrectCount,
			wordIncorrectCount,
			}
			= await LangService.postGuess(this.state.guess);
			this.props.updateHead({
			nextWord,
			totalScore,
			wordCorrectCount,
			wordIncorrectCount,
			});
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	render() {
    return (
			<form onSubmit={this.onSubmit}>
				<label htmlFor='learn-guess-input'>
					{"What's the translation for this word?"}
				</label>
				<input id='learn-guess-input' onChange={this.onGuessChange} value={this.state.guess} type='text' required />
				<button type='submit'>Submit your answer</button>
			</form>
    );
  }
};
