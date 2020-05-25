import React from 'react';
import Notify from './Notify';
import Spinner from '../Spinner';

const Notifications = ({notifications}) => {

	if (notifications) {
		return (
			<div className="section">
				<h5 className="center">Уведомления</h5>
				<ul>
					{
						notifications && notifications.map((item, idx) => {
							return <Notify key={idx} notify={item} />
						})
					}
				</ul>
			</div>
		)
	}
	return <Spinner />
	
}

export default Notifications