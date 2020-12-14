import React, { Component } from 'react';
import ItemList from '../itemList';
import ItemDetails, { Field } from '../itemDetails';
import ErrorMessage from '../error/error';
import GotService from '../../services/gotService';
import RowBlock from '../rowBlock/rowBlock';


export default class CharacterPage extends Component {

	gotService = new GotService();

	state = {
		selectedChar: 155,
		error: false
	}

	componentDidCatch() {
		console.log('cath!!!');
		this.setState({ error: true })
	}

	onItemSelected = (id) => {
		this.setState({ selectedChar: id })
	}

	render() {

		if (this.state.error) {
			return <ErrorMessage />
		}

		const itemList = (
			<ItemList
				onItemSelected={this.onItemSelected}
				getData={this.gotService.getAllCharacters}
				renderItem={(item) => item.name} />
		)

		const charDetails = (
			<ItemDetails
				itemId={this.state.selectedChar}
				getData={this.gotService.getCharacter}>
				<Field field='gender' lable='Gender' />
				<Field field='born' lable='Born' />
				<Field field='died' lable='Died' />
				<Field field='culture' lable='Culture' />
			</ItemDetails>
		)

		return (
			< RowBlock left={itemList} right={charDetails} />
		)
	}
}