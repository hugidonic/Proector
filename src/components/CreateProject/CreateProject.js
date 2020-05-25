import React, { Component } from 'react';
import { connect } from 'react-redux'
import { createProject } from '../../store/actions/projectActions'

import './Sign.css';

class CreateProject extends Component {

	state = {
		title: '',
		content: ''
	}

	handleChange = e => {
		const {id, value} = e.target;

		this.setState({
			[id]: value
		});
	}

	handleSubmit = e => {
		e.preventDefault()
		this.props.createProject(this.state)
		this.props.history.push('/')
	}
	
	render() {

		const { title, content } = this.state;
		
		return (
			<div className="container">
				<form onSubmit={this.handleSubmit} className="white sign-form">
					<h3 className="grey-text text-darken-3">Создать проект</h3>

					<div className="input-field">
						<label htmlFor="title">Название проекта</label>
						<input 
							type="text" 
							id="title"
							value={title}
							onChange={this.handleChange}
							required
						/>
					</div>

					<div className="input-field">
						<label htmlFor="content">Описание</label>
						<input 
							type="text" 
							id="content"
							value={content}
							onChange={this.handleChange}
							required
						/>
					</div>

					<div className="input-field">
						<button className="btn darkgreen lighten-1 z-depth-0">Создать</button>
					</div>

				</form>
			</div>
		)
	}
}

const mapDispatchToProps = {
	createProject
}

export default connect(null, mapDispatchToProps)(CreateProject)