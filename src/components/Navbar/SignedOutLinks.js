import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedInLinks = () => {
	return (
		<ul className="right">
			<li><NavLink to='/auth' >Зарегистрироваться</NavLink></li>
		</ul>
	)
}

export default SignedInLinks
