import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import baseUrl from '../base_url'
import ErrorMessages from './error_messages'
import Form from './form'

class NewPerson extends Component {
	constructor(props){
		super(props)
		this.state = {
			name: '',
			instrument: '',
			favoriteCity: '',
			errors: false,
			errorMessages: []
		}
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit(e){
		e.preventDefault()
		e.stopPropagation()

		const name = this.state.name
		const instrument = this.state.instrument
		const favoriteCity = this.state.favoriteCity

		function handleErrors(res) {
	    if (!res.ok) {
    		this.setState({
    			errors: true
    		})
	    }
	    return res.json()
		}

		function handleData(res){
			if (res[0] !== undefined){
				this.setState({
					errorMessages: res
				})
			} else {
				this.props.actions.changeActivePerson(res)
			}
		}

		fetch(`${baseUrl}/people`, {
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
		.then( handleErrors.bind(this) )
		.then( handleData.bind(this) )
		.catch( err => {
			console.log(err)
		})
		
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
				{ this.state.errors? <ErrorMessages messages={ this.state.errorMessages } /> : null }
				<Form
					name={ this.state.name }
					instrument={ this.state.instrument }
					favoriteCity={ this.state.favoriteCity }
					handleChange={ this.handleChange.bind(this) }
					handleSubmit={ this.handleSubmit.bind(this) }
					buttonText='Submit'
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
		messages: state.activePerson
	})
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPerson)
