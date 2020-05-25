const createNotifications = (notifyName, userRef, currentUser) => {
	let newNotification = {
		time: new Date(),
	}

	switch (notifyName) {
		case 'create':
			newNotification = {
				...newNotification,
				content: `Создан новый проект`,
			}
			break;

		case 'delete':
			newNotification = {
				...newNotification,
				content: `Проект удален`,
			}
			break;

		case 'edit':
			newNotification = {
				...newNotification,
				content: `Проект отредактирован`,
			}
			break;
	
		default:
			break;
	}
	
	// User's Notifications
	let userNotifications = currentUser.notifications;

	if (userNotifications.length >= 3) {
		userNotifications = userNotifications.slice(0, 2)
		userRef.update({
			notifications: userNotifications
		})
	}

	userRef.update({
		notifications: [newNotification, ...userNotifications]
	})
}

const getDataFromFirestore = (getState ,firestore) => {
	//Current user
	const currentUsersId = getState().firebase.auth.uid
	const currentUser = getState().firestore.ordered.users.find(user => user.id === currentUsersId)
	
	const userRef = firestore.collection('users').doc(currentUsersId);
	return {
		userRef,
		currentUser,
		currentUsersId,
	}
}


export const createProject = (project) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		// Make Async call
		const firestore = getFirestore();
		const { userRef, currentUser, currentUsersId } = getDataFromFirestore(getState, firestore)

		// Profile
		const {
			firstName,
			lastName,
		} = getState().firebase.profile
		
		// Current user's id's
		const authorId = currentUsersId

		return firestore.collection('projects').add({
			...project,
			authorFirstName: firstName,
			authorLastName: lastName,
			authorId,
			createdAt: new Date(),
		})
			.then(() => {

				// New project Added
				const newProject = getState().firestore.ordered.projects[0].id;
				console.log('newProject', newProject)

				// User's Projects 
				const userProjects = currentUser.projects;

				createNotifications('create', userRef, currentUser)

				userRef.update({
					projects: [...userProjects, newProject],
				})
			})
			.then((res) => {
				// Dispatch SUCCESS
				dispatch({
					type: 'CREATE_PROJECT_SUCCESS',
					project
				})
			})
			.catch(error => {
				// Dispatch FAILURE
				dispatch({
					type: 'CREATE_PROJECT_FAILURE',
					error
				})
			})

	}
}

export const deleteProject = (projectId) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();
		const { userRef, currentUser, currentUsersId } = getDataFromFirestore(getState, firestore)

		createNotifications('delete', userRef, currentUser)
		
		// User's Projects
		const usersProjects = currentUser.projects;

		// New array of projects w/out project that was deleted
		const newProjects = usersProjects.filter(projId => projId !== projectId);

		return firestore.collection('projects')
			.doc(projectId).delete()
			.then(() => {
				firestore.collection('users').doc(currentUsersId).update({
					projects: newProjects
				})
			})
			.then(() => {
				dispatch({
					type: 'PROJECT_DELETED_SUCCESS'
				})
			})
			.catch(error => {
				dispatch({
					type: 'PROJECT_DELETED_FAILURE'
				})
			})
	}
}

export const editProject = (projectId, newProject) => {
	return (dispatch, getState, {getFirebase, getFirestore}) => {
		const firestore = getFirestore();
		const { userRef, currentUser } = getDataFromFirestore(getState, firestore)

		return firestore.collection('projects').doc(projectId)
			.update({
				title: newProject.title,
				content: newProject.content
			})

			.then(() => {
				createNotifications('edit', userRef, currentUser)
			})

			.then(() => {
				dispatch({
					type: "EDIT_PROJECT_SUCCESS"
				}) 
			})
			.catch(error => {
				dispatch({
					type: "EDIT_PROJECT_FAILURE",
					error
				}) 
			})
	}
}