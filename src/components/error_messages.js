import React from 'react'

export default function ErrorMessages(props){
	return(
		<div className='error'>
			<p>There were errors with your request:</p>
			<ul>
				{ props.messages.map( message => {
					var count = 0
					var key = count
					++count
					return <li key={ key }>{ message }!</li>
				} ) }
			</ul>
		</div>
	)
}
