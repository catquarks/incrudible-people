import React from 'react'

export default function EditLink(props){
	return(
		<div
			className="link crud"
			onClick={ props.handleEditMode }
		>
			{
				props.editMode ? 'Click to Cancel Editing' :
				'Click to Edit'
			}
		</div>
	)
}
