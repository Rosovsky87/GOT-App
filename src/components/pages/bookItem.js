import React, { Component } from 'react';
import GotService from '../../services/gotService';
import ItemDetails, { Field } from '../itemDetails';



export default class BookItem extends Component {
	gotService = new GotService();

	render() {
		return (
			<ItemDetails
				itemId={this.props.bookId}
				getData={this.gotService.getBook}>
				<Field field='numberOfPages' lable='Pages' />
				<Field field={'released'} lable='Released' />
			</ItemDetails>
		)
	}
}
