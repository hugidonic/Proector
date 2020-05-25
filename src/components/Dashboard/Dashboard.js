import React from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux'


import Notifications from './Notifications';
import ProjectList from '../ProjectList';
import Spinner from '../Spinner'
import { firestoreConnect } from 'react-redux-firebase';

const Dashboard = (props) => {
	const { projects, usersProjects, notifications} = props
 
	if (projects && usersProjects && notifications) {

		let list = []
		usersProjects.forEach(id => {
			let proj = projects.filter(proj => proj.id === id)
			list.push(proj)
		})
		const projectList = list.flat()

		return (
			<div className="container">
				<div className="row">

					<div className="col s12 m6">
						<div className="section">
							<h5 className="center">Проекты</h5>
							<ProjectList projects={projectList}/>
						</div>
					</div>
	
					<div className="col s12 m5 offset-m1">
						<Notifications notifications={notifications} />
					</div>
					
				</div>
			</div>
		)
	}

	return <div className="center"><Spinner /></div>
	
}

const mapStateToProps = (state) => {
	const projects = state.firestore.ordered.projects;
	const usersProjects = state.firebase.profile.projects;
	const notifications = state.firebase.profile.notifications
	
	return {
		projects,
		usersProjects,
		notifications
	}
}

export default compose(
	connect(mapStateToProps),
	firestoreConnect([
		{collection: 'projects', orderBy: ['createdAt', 'desc'] },
		{collection: 'users', orderBy: ['createdAt', 'desc'] },
	])
)(Dashboard)
