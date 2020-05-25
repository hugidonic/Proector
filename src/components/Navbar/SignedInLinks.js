import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = ({signOut, profile}) => {
	return (
		<ul className="right">
			<li><NavLink to='/create' >Создать Задание</NavLink></li>
			<li><NavLink to='/' onClick={signOut} >Выйти</NavLink></li>
			<li><button className="btn btn-floating">{profile.initials}</button></li>
		</ul>
	)
}

const mapDispatchToProps = {
	signOut
}

export default connect(null, mapDispatchToProps)(SignedInLinks)
