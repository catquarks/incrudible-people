import React from 'react'

export default function DeletedPerson(props){
	return(
		<div>
			<p>This person has been deleted!</p>
			<p>
				<span
					className='link crud'
					onClick={ props.handleReloadPeopleList }
				>
					Please click here to reload the People List.
				</span>
			</p>
		</div>
	)
}
