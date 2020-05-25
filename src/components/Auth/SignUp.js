import React, { Component } from 'react'
import { connect } from 'react-redux';
import { signUp } from '../../store/actions/authActions';
import { Redirect } from 'react-router-dom';

class SignUp extends Component {
	state = {
		regemail: '',
		regpassword: '',
		firstName: '',
		lastName: '',
	}
	
	componentDidMount() {
		const $ = el => {
			return document.querySelector(el)
		}
		
		let toggle = $('.form-toggle')
		let form = $('.form')

		toggle.addEventListener('click', (e) => {
			e.preventDefault();
		
			$('.form-toggle').classList.remove('visible');
			$('.form-panel.one').classList.remove('hidden');
			$('.form-panel.two').classList.remove('active');
			form.classList.remove('long')
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
		this.props.signUp(this.state)
	}
	
	render() {
		const {
			regemail,
			regpassword,
			firstName,
			lastName
		} = this.state
		
		const { authError, auth } = this.props
		
		if (auth.uid) {
			return <Redirect to='/' />
		}
		
		return (
			<div className="form-panel two">

				<div className="form-header">
					<h1>Регистрация</h1>
				</div>

				<form >

					<div className="input-field form-group">
						<label htmlFor="regemail">Email</label>
						<input 
							id="regemail" 
							type="email" 
							value={regemail}
							onChange={this.handleChange}
						/>
					</div>

					<div className="input-field form-group">
						<label htmlFor="regpassword">Пароль</label>
						<input 
							id="regpassword" 
							type="password" 
							value={regpassword}
							onChange={this.handleChange}
						/>
					</div>

					<div className="input-field form-group">
						<label htmlFor="firstName">Имя</label>
						<input 
							id="firstName" 
							type="text" 
							value={firstName}
							onChange={this.handleChange}
						/>
					</div>

					<div className="input-field form-group">
						<label htmlFor="lastName">Фамилия</label>
						<input 
							id="lastName" 
							type="text" 
							value={lastName}
							onChange={this.handleChange}
						/>
					</div>

					<div className="form-group">
						<button type="submit" onClick={this.handleSubmit}>Зарегистрироваться</button>

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
	const authError = state.auth.authError
	const auth = state.firebase.auth
	
	return {
		authError,
		auth
	}
}

const mapDispatchToProps = {
	signUp
}


export default connect(mapStateToProps, mapDispatchToProps)(SignUp)