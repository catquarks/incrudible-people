import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'

class NewPerson extends Component {
	constructor(props){
		super(props)
		this.state = {
			name: '',
			instrument: '',
			favoriteCity: ''
		}
	}

	handleSubmit(e){
		e.preventDefault()
		e.stopPropagation()

		const name = this.state.name
		const instrument = this.state.instrument
		const favoriteCity = this.state.favoriteCity

		const updatedPerson = fetch('http://localhost:3000/api/v1/people', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: name,
				instrument: instrument,
				favorite_city: favoriteCity
			})
		})
			.then(function(res){
				return res.json()
			})
			.then(function(updatedData){
				return updatedData
			})

		this.props.actions.changeActivePerson(updatedPerson)
		this.clearForm()
	}

	handleChange(e, field){
		if (field === 'name') {
			this.setState({
				name: e.target.value
			})
		}
		else if (field === 'instrument') {
			this.setState({
				instrument: e.target.value
			})
		} else if (field === 'favoriteCity') {
			this.setState({
				favoriteCity: e.target.value
			})
		}
	}

	clearForm(){
		this.setState({
			name: '',
			instrument: '',
			favoriteCity: ''
		})
	}

	render(){
		return(
			<div id="new-person">
				<h1>Create a New Person</h1>
	    	<form
	    		onSubmit={ (e) => { this.handleSubmit(e) } }
	  		>
					<p>
						Name: <input
							value={ this.state.name }
							onChange={ (e) => {
								this.handleChange(e, 'name')
							} }
							name='person[name]'
						/>
					</p>
					<p>
						Instrument: <input
							value={ this.state.instrument }
							onChange={ (e) => {
								this.handleChange(e, 'instrument')
							} }
							name='person[instrument]'
						/>
					</p>
					<p>
						Favorite City: <input
							value={ this.state.favoriteCity }
							onChange={ (e) => {
								this.handleChange(e, 'favoriteCity')
							} }
							name='person[favorite_city]'
						/>
						<input type='submit' />
					</p>
				</form>
			</div>
		)
	}
}

function mapDispatchToProps(dispatch){
	return({
		actions: bindActionCreators(actions, dispatch)
	})
}

export default connect(null, mapDispatchToProps)(NewPerson)
