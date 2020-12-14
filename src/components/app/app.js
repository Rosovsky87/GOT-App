import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../error/error';
import GotService from '../../services/gotService';
import CharacterPage from '../pages/characterPage';
import BookPage from '../pages/bookPage';
import HousePage from '../pages/housePage'
import BookItem from '../pages/bookItem';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './app.css';


export default class App extends Component {

	gotService = new GotService();

	state = {
		showRandomCharacter: true,
		error: false
	}

	componentDidCatch() {
		console.log('cath!!!');
		this.setState({ error: true })
	}


	onToggleCharacter = () => {
		this.setState((state) => {
			return {
				showRandomCharacter: !state.showRandomCharacter
			}
		});
	}


	render() {
		const char = this.state.showRandomCharacter ? <RandomChar /> : null;

		if (this.state.error) {
			return <ErrorMessage />
		}

		return (
			<Router>
				<div className="app">
					<Container>
						<Header />
					</Container>
					<Container>
						<Row>
							<Col lg={{ size: 5, offset: 0 }}>
								{char}
								<button
									className="toggle-btn"
									onClick={this.onToggleCharacter}>Toggle random character</button>
							</Col>
						</Row>
						<Route path='/characters' component={CharacterPage} />
						<Route path='/houses' component={HousePage} />
						<Route path='/books' exact component={BookPage} />
						<Route path='/books/:id' render={
							({ match }) => {
								const { id } = match.params;
								return <BookItem bookId={id} />
							}} />
					</Container>
				</div>
			</Router>
		);
	}
};

