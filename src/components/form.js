import React from 'react'

export default function(props){
	return(
  	<form
  		onSubmit={ (e) => { props.handleSubmit(e) } }
		>
			<p>
				<label htmlFor='name'>
					Name: </label>
				<input
					value={ props.name }
					onChange={ (e) => {
						props.handleChange(e, 'name')
					} }
					name='person[name]'
					id='name'
				/>
			</p>
			<p>
				<label htmlFor='instrument'>
					Instrument: </label>
				<input
					value={ props.instrument }
					onChange={ (e) => {
						props.handleChange(e, 'instrument')
					} }
					name='person[instrument]'
					id='instrument'
				/>
			</p>
			<p>
				<label htmlFor='favorite-city'>
					Favorite City: </label>
				<input
					value={ props.favoriteCity }
					onChange={ (e) => {
						props.handleChange(e, 'favoriteCity')
					} }
					name='person[favorite_city]'
					id='favorite-city'
				/>
				<input type='submit' />
			</p>
		</form>
	)

}

