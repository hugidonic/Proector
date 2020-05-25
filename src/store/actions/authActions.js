export const signIn = (credentials) => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();

		const {
			email,
			password
		} = credentials

		return firebase.auth()
			.signInWithEmailAndPassword(email, password)
			.then(() => {
				dispatch({
					type: 'SIGNIN_SUCCESS'
				})
			})
			.catch(error => {
				dispatch({
					type: 'SIGNIN_FAILURE',
					error
				})
			})
	}
}

export const signOut = () => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase()
		
		firebase.auth()
			.signOut()
			.then(() => {
				dispatch({
					type: 'SIGNOUT_SUCCESS'
				})
			})
	}
}


export const signUp = (newUser) => {
	return (dispatch, getState, {getFirebase, getFirestore}) => {
		const firebase = getFirebase();
		const firestore = getFirestore();

		const {
			regemail,
			regpassword,
			firstName,
			lastName
		} = newUser

		const initials = firstName[0] + lastName[0];
		const projects = []
		const notifications = []

		firebase.auth().createUserWithEmailAndPassword(regemail, regpassword)
			.then((response) => {
				firestore.collection('users').doc(response.user.uid).set({
					firstName,
					lastName,
					initials,
					projects,
					notifications,
					createdAt: new Date()
				})
			})
			.then(() => {
				dispatch({
					type: 'SIGNUP_SUCCESS'
				})
			})
			.catch(error => {
				dispatch({
					type: 'SIGNUP_FAILURE',
					error
				})
			})
	}
}