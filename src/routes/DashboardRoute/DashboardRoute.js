import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LanguageContext from '../../contexts/LanguageContext';
import LangService from '../../api/LangService';
import './DashboardRoute.css';

class DashboardRoute extends Component {
  state = { language: {}, words: [], error: null, loading: true };

	static contextType = LanguageContext;

  async componentDidMount() {
    try {
      const { language, words } = await LangService.getLangInfo();
			this.context.updateLang(language);
			this.context.updateWords(words);
      this.setState({
        language,
        words,
				loading: false,
      });
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  renderWords() {
    const words = this.state.words.map((word, i) => (
      <li key={i} style={{ border: '2px #8d99ae solid', }}>
        <h4>{word.original}</h4>
				<span className=''>
        <p className='correct-count'>{`correct answer count: ${word.correct_count}`}</p>
        <p className='incorrect-count'>{`incorrect answer count: ${word.incorrect_count}`}</p>
				</span>
      </li>
    ));
    return (
      <>
        <h3>Words to practice</h3>
        <ul
				style={{ listStyleType: 'none', paddingLeft: 0, }}>
					{words}
				</ul>
      </>
    );
  }

  render() {
		if (this.state.loading) return (
			<section>
				Loading . . .
			</section>
		);

    return (
        <section id='dashboard'>
          <h2>{this.state.language.name}</h2>
          <Link to='/learn'>Start practicing</Link>
          <p>
            <strong>{`Total correct answers: ${this.state.language.total_score}`}</strong>
          </p>
          {this.renderWords()}
        </section>
    );
  }
}

export default DashboardRoute;
