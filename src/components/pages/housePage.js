import React, { Component } from 'react';
import ItemList from '../itemList';
import ItemDetails, { Field } from '../itemDetails';
import ErrorMessage from '../error/error';
import GotService from '../../services/gotService';
import RowBlock from '../rowBlock/rowBlock';


export default class HousePage extends Component {

	gotService = new GotService();

	state = {
		selectedHouse: 3,
		error: false
	}

	componentDidCatch() {
		console.log('cath!!!');
		this.setState({ error: true })
	}

	onItemSelected = (id) => {
		this.setState({ selectedHouse: id })
	}

	render() {

		if (this.state.error) {
			return <ErrorMessage />
		}

		const itemList = (
			<ItemList
				onItemSelected={this.onItemSelected}
				getData={this.gotService.getAllHouses}
				renderItem={(item) => item.name} />
		)

		const houseDetails = (
			<ItemDetails
				itemId={this.state.selectedHouse}
				getData={this.gotService.getHouse}>
				<Field field='region' lable='Region' />
				<Field field='words' lable='Words' />
			</ItemDetails>
		)

		return (
			< RowBlock left={itemList} right={houseDetails} />
		)
	}
}