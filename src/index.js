// React & Redux & Router
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'

// Components
import App from './components/App/App';
import ErrorBoundry from './components/ErrorBoundry'

// Store
import { store, rrfProps } from './store/store'

// Firebase
import { ReactReduxFirebaseProvider, isLoaded } from "react-redux-firebase";

import './index.css';
import Spinner from './components/Spinner';

const AuthIsLoaded = ({ children }) => {
	const auth = useSelector(state => state.firebase.auth)
	if (!isLoaded(auth)) {
		return (
			<div className="center">
				<Spinner />
			</div>
		)
	}

	return children
}



ReactDOM.render(
	<Provider store={store}>
		<ReactReduxFirebaseProvider {...rrfProps} >
			<AuthIsLoaded>
				<ErrorBoundry>
					<Router>
						<App />
					</Router>
				</ErrorBoundry>
			</AuthIsLoaded>
		</ReactReduxFirebaseProvider>
	</Provider>
	,document.getElementById('root')
)