import React from 'react'

export default function PersonData(props) {
	if (props.name){
		return(
			<div className='person-data'>
				<h1>{ props.name }</h1>
				<p>
					<a
						href={`http://coolpeople.herokuapp.com/api/v1/people/${props.id}`}
						target='_blank'
						className='link'
						>
						Click to View JSON
					</a>
				</p>
	  		<p>
	  			Instrument: { props.instrument }
	  		</p>
	  		<p>
	    		Favorite City: { props.favoriteCity }
	  		</p>
			</div>
		)
	} else {
		return(
			<div>
				<h3>Click someone's name to learn more about them!</h3>
			</div>
		)
	}
}
