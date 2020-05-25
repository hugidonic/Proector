import React from 'react';
import moment from 'moment';
import 'moment/locale/ru'


const Notify = ({notify}) => {
	const {content, time} = notify

	moment.locale('ru')
	const date = moment(time.toDate()).fromNow()

 	return (
		<li className='notify-item'>
			<div className="card z-depth-1">
				<div className="card-content">
					<h6>{content}</h6>
					<div className="grey-text">{date}</div>
				</div>
			</div>
		</li>
	)
}

export default Notify
