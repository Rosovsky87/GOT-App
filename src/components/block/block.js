import React, { Component } from "react";
import './block.css';



export default class Block extends Component {

	constructor() {
		super();
		this.state = {
			score: 1
		}
	}

	toggleScore = () => {
		let a = this.state.score;
		a++;
		this.setState(({ score }) => {
			return {
				score: a
			}
		});
	}


	render() {
		const { score } = this.state;

		return (
			<>
				<div className='wrapper'>
					<div
						className='block-style'
					>score: {score}
					</div>
					<button
						className='button-style'
						onClick={this.toggleScore}>
						Нажми!
					</button>
				</div>
			</>
		)
	}
}