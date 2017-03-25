import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import baseUrl from '../base_url'

class EditPerson extends Component {
	constructor(props){
		super(props)
		this.state = {
			newName: props.name,
			newInstrument: props.instrument,
			newFavoriteCity: props.favoriteCity
		}
	}

	componentWillReceiveProps(props){
		this.setState({
			newName: props.name,
			newInstrument: props.instrument,
			newFavoriteCity: props.favoriteCity			
		})
	}

	handleSubmit(e){
		e.preventDefault()
		e.stopPropagation()

		const name = this.state.newName
		const instrument = this.state.newInstrument
		const favoriteCity = this.state.newFavoriteCity

		const updatedPerson = fetch(`${baseUrl}/people/${this.props.id}`, {
			method: 'PUT',
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
		this.props.handleEditMode()
	}

	handleChange(e, field){

		switch(field){
			case 'name':
				this.setState({
					newName: e.target.value
				})
				break	
			case 'instrument':
				this.setState({
					newInstrument: e.target.value
				})
				break	
			case 'favoriteCity':
				this.setState({
					newFavoriteCity: e.target.value
				})
				break
			default:
				return null
		}
	}

	render(){
		return(
    	<form
    		onSubmit={ (e) => { this.handleSubmit(e) } }
  		>
				<p>
					<label htmlFor='name'>
						Name: </label>
					<input
						value={ this.state.newName }
						onChange={ (e) => {
							this.handleChange(e, 'name')
						} }
						name='person[name]'
						id='name'
					/>
				</p>
				<p>
					<label htmlFor='instrument'>
						Instrument: </label>
					<input
						value={ this.state.newInstrument }
						onChange={ (e) => {
							this.handleChange(e, 'instrument')
						} }
						name='person[instrument]'
						id='instrument'
					/>
				</p>
				<p>
					<label htmlFor='favorite-city'>
						Favorite City: </label>
					<input
						value={ this.state.newFavoriteCity }
						onChange={ (e) => {
							this.handleChange(e, 'favoriteCity')
						} }
						name='person[favorite_city]'
						id='favorite-city'
					/>
					<input type='submit' value='Update' />
				</p>
			</form>
		)
	}
}

function mapDispatchToProps(dispatch){
	return({
		actions: bindActionCreators(actions, dispatch)
	})
}

export default connect(null, mapDispatchToProps)(EditPerson)
