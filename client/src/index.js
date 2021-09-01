import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ContextProvider } from './Context';
import { CookiesProvider } from 'react-cookie';

ReactDOM.render(
	<ContextProvider>
		<CookiesProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</CookiesProvider>
	</ContextProvider>,
	document.getElementById('root'),
);
