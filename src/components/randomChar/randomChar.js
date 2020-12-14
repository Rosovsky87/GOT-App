import React, { Component } from 'react';
import gotService from '../../services/gotService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../error/error';
import './randomChar.css';


export default class RandomChar extends Component {

	gotService = new gotService();

	state = {
		char: {},
		loading: true,
		error: false
	}

	componentDidMount = () => {
		this.updateCharacter();
		this.timeinterval = setInterval(this.updateCharacter, 40000);
	}

	componentWillUnmount = () => {
		clearInterval(this.timeinterval);
	}

	onCharLoaded = (char) => {
		this.setState({
			char: char,
			loading: false
		});
	}

	onError = () => {
		this.setState({
			error: true,
			loading: false
		})
	}

	updateCharacter = () => {
		const id = Math.floor(Math.random() * 120 + 15);
		this.gotService.getCharacter(id)
			.then(this.onCharLoaded)
			.catch(this.onError)
	}

	render() {
		let classNames = "random-block rounded";
		const { char, loading, error } = this.state;
		const err = error ? <ErrorMessage /> : null;
		const spinner = loading ? <Spinner /> : null;
		const view = loading || error ? null : <View char={char} />;

		return (
			<div
				className={classNames}>
				{err}
				{spinner}
				{view}
			</div>
		);
	}
}

const View = ({ char }) => {
	const { name, gender, born, died, culture } = char;

	return (
		<>
			<h4>Random Character: {name}</h4>
			<ul className="list-group list-group-flush">
				<li className="list-group-item d-flex justify-content-between">
					<span className="term">Gender</span>
					<span>{gender}</span>
				</li>
				<li className="list-group-item d-flex justify-content-between">
					<span className="term">Born</span>
					<span>{born}</span>
				</li>
				<li className="list-group-item d-flex justify-content-between">
					<span className="term">Died</span>
					<span>{died}</span>
				</li>
				<li className="list-group-item d-flex justify-content-between">
					<span className="term">Culture</span>
					<span>{culture}</span>
				</li>
			</ul>
		</>
	)
}