import React, { Component } from 'react';
import { connect } from 'react-redux'

import { signIn } from '../../store/actions/authActions';
import { Redirect } from 'react-router-dom';

class SignIn extends Component {
	state = {
		email: '',
		password: ''
	}

	componentDidMount() {
		const $ = el => {
			return document.querySelector(el)
		}
		
		let panel2 = $('.form-panel.two');
		let form = $('.form');

		panel2.addEventListener('click', (e) => {
			e.preventDefault();
			
			$('.form-toggle').classList.add('visible');
			$('.form-panel.one').classList.add('hidden');
			$('.form-panel.two').classList.add('active');
			form.classList.add('long')
		})
	}


	handleChange = e => {
		const {id, value} = e.target;

		this.setState({
			[id]: value
		});
	}

	handleSubmit = e => {
		e.preventDefault()
		this.props.signIn(this.state)
	}
	
	render() {
		const { email, password } = this.state;
		const { authError, auth } = this.props

		if (auth.uid) {
			return <Redirect to='/' />
		}

		return (

			<div className="form-panel one">
				<div className="form-header">
					<h1>Войти</h1>
				</div>

				<form onSubmit={this.handleSubmit}>
					<div className="input-field form-group">
						<label htmlFor="email">Email</label>
						<input 
							id="email" 
							type="email" 
							value={email}
							onChange={this.handleChange}
						/>
					</div>

					<div className="input-field form-group">
						<label htmlFor="password">Password</label>
						<input 
							id="password" 
							type="password"
							value={password}
							onChange={this.handleChange}
							/>
					</div>

					<div className="form-group">
						<button type="submit" onClick={this.handleSubmit}>Войти</button>
						<div className="red-text center">
							{
								authError ? <p>{authError}</p> : null
							}
						</div>
					</div>
				</form>
			</div>
		)
	}
}


const mapStateToProps = state => {
	const authError = state.auth.authError;
	const auth = state.firebase.auth
	return {
		authError,
		auth
	}
}

const mapDispatchToProps = {
	signIn
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
