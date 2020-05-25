// Redux
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { compose } from 'redux'

// React & Redux & Firebase
import { getFirebase } from "react-redux-firebase";

// Redux & Firestore
import {
	reduxFirestore,
	getFirestore,
	createFirestoreInstance,
} from 'redux-firestore'

// Cfg & firebase
import fbConfig from "../config/fbconfig";
import firebase from 'firebase/app'

// Reducer
import reducer from './reducers/index';


const store = createStore(reducer,
	compose(
		applyMiddleware( thunk.withExtraArgument({ getFirebase, getFirestore }) ),
		reduxFirestore(fbConfig)
	)
)

// React & Redux & Firebase Props
const profileProps = {
	userProfile: 'users',
	useFirestoreForProfile: true,
	presence: 'presence',
	sessions: 'sessions'
}

const rrfProps = {
	firebase,
	config: profileProps, 
	dispatch: store.dispatch,
	createFirestoreInstance,
}

export {
	store,
	rrfProps
}