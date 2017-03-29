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

		function handleErrors(res) {
	    if (!res.ok) {
	    	this.props.actions.toggleErrorStatus()
	    }
	    return res.json()
		}

		function handleData(res){
			if (res[0] !== undefined){
				this.props.actions.setErrorMessages(res)
			} else {
				this.props.actions.changeActivePerson(res)
				this.props.handleEditMode()
			}
		}

		fetch(`${baseUrl}/people/${this.props.id}`, {
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
		.then( handleErrors.bind(this) )
		.then( handleData.bind(this) )
		.catch( err => {
			console.log(err)
		})

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
				{ this.props.errorStatus? <ErrorMessages messages={ this.props.errorMessages } /> : null }
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

function mapStateToProps(state){
	return({
		errorStatus: state.errorStatus,
		errorMessages: state.errorMessages
	})
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPerson)
