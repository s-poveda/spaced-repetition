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
				<span>{this.state.head.original}</span>
				</div>
			</section>
		);
  }
}

export default LearningRoute;
