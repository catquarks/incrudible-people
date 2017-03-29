import React from 'react'

export default function ErrorMessages(props){
	return(
		<div className='error'>
			<p>There were errors with your request:</p>
			<ul>
				{ props.messages.map( message => {
					return <li>{ message }!</li>
				} ) }
			</ul>
		</div>
	)
}
