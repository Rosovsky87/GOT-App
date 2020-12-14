import React from 'react';
import './error.css';
import img from './daeneris.jpg';


const ErrorMessage = () => {
	return (
		<>
			<img className='random-block' src={img} alt='error' />
			<span>Somthing goes wrong</span>
		</>
	)
}


export default ErrorMessage;