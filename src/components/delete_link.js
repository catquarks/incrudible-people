import React from 'react'

export default function DeleteLink(props){
	return(
		<div
			className='link crud'
			onClick={ props.handleDelete }
		>
			Click to Delete This Person
		</div>
	)
}
