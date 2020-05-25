import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

const Navbar = (props) => {

	const {
		isLoggedIn,
		profile
	} = props

	
	return (
		<nav className="nav-wrapper bg-dark-green">
			<div className="container">
				<Link to='/' className='brand-logo h1 mb0"'>ПроектМэйкер</Link>
				{
					isLoggedIn ? <SignedInLinks profile={profile} /> : <SignedOutLinks />
				}
			</div>
		</nav>
	)
}

const mapStateToProps = state => {

	const auth = state.firebase.auth;
	const profile = state.firebase.profile

	return {
		profile,
		isLoggedIn: !auth.isEmpty,
	}
}

export default connect(mapStateToProps)(Navbar)
