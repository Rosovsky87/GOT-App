import React, { Component } from 'react';
import './itemDetails.css';
import GotService from '../../services/gotService';


const Field = ({ item, field, lable }) => {
	return (
		<li className="list-group-item d-flex justify-content-between">
			<span className="term">{lable}</span>
			<span>{item[field]}</span>
		</li>
	)
}
export { Field };


export default class ItemDetails extends Component {

	gotService = new GotService();

	state = {
		item: null
	}

	componentDidMount() {
		this.updateItem();
	}

	componentDidUpdate(prevProps) {
		if (this.props.itemId !== prevProps.itemId) { this.updateItem() }
	}

	updateItem = () => {
		const { itemId, getData } = this.props;
		if (!itemId) {
			return
		}

		getData(itemId)
			.then((item) => {
				this.setState({ item })
			})
	}

	render() {

		if (!this.state.item) {
			return <span className='select-error'>Please, select a character</span>
		}
		const { item } = this.state;
		const { name } = item;

		return (

			<div className="char-details rounded">
				<h4>{name}</h4>
				<ul className="list-group list-group-flush">
					{
						React.Children.map(this.props.children, (child) => {
							return React.cloneElement(child, { item })
						})
					}
				</ul>
			</div>
		);
	}
}

