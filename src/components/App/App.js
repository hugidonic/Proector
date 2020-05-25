import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../Dashboard';
import CreateProject from '../CreateProject';
import ProjectDetails from '../ProjectDetails';
import Navbar from '../Navbar';
import Auth from '../Auth';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

const App = () => {
	return (
		<div>
			<Navbar />

			<Switch>
			
				<PrivateRoute 
					path='/'
					exact
					component={Dashboard}
				/>

				<PrivateRoute 
					path='/create'
					component={CreateProject}
				/>

				<PrivateRoute
					path='/project/:id'
					component={ProjectDetails}
				/>
				
				<Route 
					path='/auth'
					component={Auth}
				/>

			</Switch>
		</div>
	)
}

export default App
