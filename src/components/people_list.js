import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'

class PeopleList extends Component {
	constructor(props){
		super(props)
		this.state = {
			query: ''
		}

		this.getPeople = this.getPeople.bind(this)
	}

	handleActivePerson(person){
		this.props.actions.changeActivePerson(person)
	}

	getPeople(query){
		return this.props.people.filter( person => {
			return person.name.toLowerCase().includes(query.toLowerCase())
		} )
	}

	handleChange(e){
		this.setState({
			query: e.target.value
		})
	}

	render(){
		const people = this.getPeople(this.state.query)

		return(
	    <div id="people-list">
	    	<h1>Search for People</h1>

	    	<form onSubmit={ this.handleSubmit }>
	    		<input type='text'
	    			value={ this.state.query }
	    			onChange={ this.handleChange.bind(this) }
	    			autoFocus
    			/>
	    	</form>
	    	<div className='people-names'>
		    	{people.map( (person)=>{
		    		return(
		    			<p key={ person.id }
		    				className='link'
		    				onClick={()=>{
		    					this.handleActivePerson(person)
		    				}}
		    			>{ person.name }</p>
	    			)
		    	} )}
		    </div>
	    </div>
		)
	}
}

function mapStateToProps(state){
	return({
		people: state.people,
		activePerson: state.activePerson
	})
}

function mapDispatchToProps(dispatch){
	return({
		actions: bindActionCreators(actions, dispatch)
	})
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleList)
