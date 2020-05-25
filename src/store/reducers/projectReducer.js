const initState = {
	projects: []
}

const projectReducer = (state = initState, action) => {
	switch (action.type) {
		case 'CREATE_PROJECT_SUCCESS':
			return state
	
		case 'CREATE_PROJECT_FAILURE':
			return state

		case 'DELETE_PROJECT_SUCCESS':
			return state
	
		case 'DELETE_PROJECT_FAILURE':
			return state

		case 'EDIT_PROJECT_SUCCESS':
			return state
	
		case 'EDIT_PROJECT_FAILURE':
			return state
	
		default:
			return state
	}
}

export default projectReducer