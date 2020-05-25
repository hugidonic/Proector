import React, { Component } from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { deleteProject, editProject } from '../../store/actions/projectActions'

import moment from 'moment';
import 'moment/locale/ru';

import Spinner from '../Spinner';
import './ProjectDetails.css';

class ProjectDetails extends Component {

	state = {
		isEditing: false,
		editedTitle: '',
		editedContent: '',
	}

	handleDelete = () => {
		const id = this.props.match.params.id
		this.props.deleteProject(id)
		this.props.history.push('/')
	}

	startEditing = () => {
		this.setState({
			isEditing: true,
			editedTitle: this.props.project.title,
			editedContent: this.props.project.content,
		})
	}

	sendEdited = e => {
		e.preventDefault()
		this.setState({
			isEditing: false
		})

		const newProject = {
			title: this.state.editedTitle,
			content: this.state.editedContent,
		}
		
		const id = this.props.match.params.id
		this.props.editProject(id, newProject)
	}

	handleChange = e => {
		const {id, value} = e.target;
		this.setState({
			[id]: value
		});
	}
	
	render() {
		if (this.props.project) {
			const { isEditing, editedTitle, editedContent } = this.state
	
			const {
				title,
				content,
				authorFirstName,
				authorLastName,
				createdAt
			} = this.props.project;
			
			moment.locale('ru');
			const date = moment(createdAt.toDate()).calendar();

			const details = (
				<div className="card-content">
					<span className="card-title">{title}</span>
					<p>{content}</p>
				</div>
			)

			const editingDetails = (
				<form className="card-content input-field">
					<input
						type="text"
						value={editedTitle}
						id='editedTitle'
						onChange={this.handleChange}
					/>
					<input
						type="text"
						value={editedContent}
						id='editedContent'
						onChange={this.handleChange}
					/>
				</form>
			)

			const buttons = (
				<>
					<button
						className="btn btn-floating btn-outline btn-info"
						onClick={this.startEditing}
					>
						<i className="fas fa-pen"></i>
					</button>

					<button
						className="btn btn-floating btn-outline btn-danger"
						onClick={this.handleDelete}
					>
						<i className="fas fa-trash-alt"></i>
					</button>
				</>
			)

			const editingButtons = (
				<button
					type='submit'
					className="btn btn-floating btn-outline btn-info"
					onClick={this.sendEdited}
				>
					<i className="far fa-check-circle"></i>
				</button>
			)
		
			const DetailsJsx = !isEditing ? details : editingDetails
			const Buttons = !isEditing ? buttons : editingButtons
			
			return (
				<div className="container section">
					<div className="card z-depth-1">

						{DetailsJsx}
						
						<div className="card-action project-details-footer">
							<div>
								<div>Автор: {authorLastName} {authorFirstName}</div>
								<div>{date}</div>
							</div>
							<div className="project-details-buttons">
								{Buttons}
							</div>
						</div>
					</div>
				</div>
			)
		}
			// 	return (
			// 		<div className="container section">
			// 			<div className="card z-depth-1">
			// 				<form className="card-content input-field">

			// 					<input
			// 						type="text"
			// 						value={editedContent}
			// 						id='editedContent'
			// 						onChange={this.handleChange}
			// 					/>
			// 				</form>
			// 				<div className="card-action project-details-footer">
			// 					<div>
			// 						<div>Автор: {authorLastName} {authorFirstName}</div>
			// 						<div>{date}</div>
			// 					</div>
			// 					<div className="project-details-buttons">
			// 						<button type="submit">

			// 						</button>
			// 					</div>
			// 				</div>
			// 			</div>
			// 		</div>
			// 	)
			// }

		return (
			<div className="container center">
				<Spinner />
			</div>
		)
		
	}
}

const mapStateToProps = (state, ownProps) => {
	const id = ownProps.match.params.id;
	const projects = state.firestore.data.projects;
	const project = projects ? projects[id] : null
	return {
		project
	}
}

const mapDispatchToProps = {
	deleteProject,
	editProject
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect([
		{collection: 'projects'},
		{collection: 'users', orderBy: ['createdAt', 'desc'] },
	])
)(ProjectDetails)
