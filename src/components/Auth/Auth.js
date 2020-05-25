import React from 'react'
import './Auth.css';
import SignIn from './SignIn';
import SignUp from './SignUp';

const Auth = () => {
	
	return (
		<div className="form">
			<div className="form-toggle"></div>
			<SignIn />
			<SignUp />
		</div>
	)
}

export default Auth
