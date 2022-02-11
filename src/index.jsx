import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const colors = [
	'#ffd146',
	'#56b3ff',
	'#ff3460',
	'#222222'
];

const picked = colors[Math.floor(Math.random() * colors.length)];

ReactDOM.render(
	<React.StrictMode>
		<App color={picked} />
	</React.StrictMode>,
	document.getElementById('root')
);