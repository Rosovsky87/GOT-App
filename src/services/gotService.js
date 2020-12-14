
export default class GotService {
	constructor() {
		this._apiBase = 'https://www.anapioficeandfire.com/api';
	}

	getResource = async (url) => {
		const res = await fetch(`${this._apiBase}${url}`);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}` +
				`, received ${res.status}`);
		}
		return await res.json();
	}

	getAllBooks = async () => {
		const res = await this.getResource(`/books/`);
		return await res.map(this._transformBook);
	}

	getBook = async (id) => {
		const book = await this.getResource(`/books/${id}/`);
		return this._transformBook(book);
	}

	getAllCharacters = async () => {
		const res = await this.getResource(`/characters?page=5&pageSize=10`);
		return await res.map(this._transformCharacter);
	}

	getCharacter = async (id) => {
		const character = await this.getResource(`/characters/${id}`)
		return await this._transformCharacter(character);
	}

	getAllHouses = async () => {
		const res = await this.getResource(`/houses/`);
		return res.map(this._transformgetHouse);
	}

	getHouse = async (id) => {
		const hous = await this.getResource(`/houses/${id}/`);
		return this._transformgetHouse(hous);
	}

	setInfo = (data) => {
		if (data) {
			return data
		} else {
			return 'извините, данные отсутствуют=('
		}
	}

	_setId = (data) => {
		let dataId = data.url.match(/\d/g);
		const id = dataId.join('');
		return id
	}

	_transformCharacter = (char) => {
		return {
			id: this._setId(char),
			name: this.setInfo(char.name),
			gender: this.setInfo(char.gender),
			born: this.setInfo(char.born),
			died: this.setInfo(char.died),
			culture: this.setInfo(char.culture)
		}
	}

	_transformgetHouse = (house) => {
		return {
			id: this._setId(house),
			name: this.setInfo(house.name),
			region: this.setInfo(house.region),
			words: this.setInfo(house.words),
			titles: this.setInfo(house.titles),
			overlord: this.setInfo(house.overlord),
			ancestralWeapons: this.setInfo(house.ancestralWeapons)
		}
	}

	_transformBook = (book) => {
		return {
			id: this._setId(book),
			name: this.setInfo(book.name),
			numberOfPages: this.setInfo(book.numberOfPages),
			publiser: this.setInfo(book.publiser),
			released: this.setInfo(book.released)
		}
	}
}
