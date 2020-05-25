const initState = {
	authError: null
}

const authReducer = (state = initState, action) => {
	switch (action.type) {
		// Sign in
		case 'SIGNIN_SUCCESS':
			return {
				...state,
				authError: null
			}
		
		case 'SIGNIN_FAILURE':
			return {
				...state,
				authError: 'Не удалось войти в систему'
			}

		// Sign out
		case 'SIGNOUT_SUCCESS':
			return state

		// Sign up
		case 'SIGNUP_SUCCESS':
			return {
				...state,
				authError: null
			}

		case 'SIGNUP_FAILURE':
			return {
				...state,
				authError: 'Не удалось зарегистрироваться'
			}
			
	
		default:
			return state
	}
}

export default authReducer