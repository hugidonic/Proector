import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = (props) => {

	const {
		component: Component,
		auth,
		...rest
	} = props

	return (
		<Route 
			{...rest}
			render={
				(props) => auth.uid? <Component {...props} /> : <Redirect to='/auth' />
			}
		/>
	)
}

const mapStateToProps = state => {
	return {
		auth: state.firebase.auth
	}
}

export default connect(mapStateToProps)(PrivateRoute)
