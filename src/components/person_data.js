import React from 'react'

export default function PersonData(props) {
	if (props.name){
		return(
			<div className='person-data'>
				<h1>{ props.name }</h1>
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
