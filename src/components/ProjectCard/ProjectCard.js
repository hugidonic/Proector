import React from 'react';
import moment from 'moment';
import 'moment/locale/ru';

const ProjectCard = ({project}) => {

	const {
		title,
		authorFirstName,
		authorLastName,
		createdAt
	} = project

	moment.locale('ru')
	const date = moment(createdAt.toDate()).calendar()
	
	return (
		<div className="card z-depth-1 project-card">
			<div className="card-content grey-text text-darken-3">
				<span className="card-title">{title}</span>
				<p>Автор: {authorLastName} {authorFirstName}</p>
				<p className="grey-text">{date}</p>
			</div>
		</div>
	)
}

export default ProjectCard
