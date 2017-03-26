import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import baseUrl from '../base_url'
import ErrorMessages from './error_messages'
import Form from './form'

class EditPerson extends Component {
	constructor(props){
		super(props)
		this.state = {
			newName: props.name,
			newInstrument: props.instrument,
			newFavoriteCity: props.favoriteCity,
			errors: false
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
			.then( res => {
				return res.json()
			})
			.then( updatedData => {
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
			<div>
				{ this.state.errors? <ErrorMessages /> : null }
				<Form
					name={ this.state.newName }
					instrument={ this.state.newInstrument }
					favoriteCity={ this.state.newFavoriteCity }
					handleChange={ this.handleChange.bind(this) }
					handleSubmit={ this.handleSubmit.bind(this) }
					buttonText='Update'
				/>
			</div>
		)
	}
}

function mapDispatchToProps(dispatch){
	return({
		actions: bindActionCreators(actions, dispatch)
	})
}

export default connect(null, mapDispatchToProps)(EditPerson)
