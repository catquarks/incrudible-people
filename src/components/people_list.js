import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'

class PeopleList extends Component {
	constructor(props){
		super(props)
		this.state = {
			query: '',
			placeholder: 'Search here'
		}

		this.getPeople = this.getPeople.bind(this)
	}

	handleActivePerson(person){
		this.props.actions.changeActivePerson(person)
	}

	getPeople(query){
		const people = this.alphabetizePeopleByName(this.props.people)
		return people.filter( person => {
			return person.name.toLowerCase().includes(query.toLowerCase())
		} )
	}

	handleChange(e){
		this.setState({
			query: e.target.value
		})
	}

	handleBlur(){
		this.setState({
			placeholder: 'Search here'
		})
	}

	handleSubmit(e){
		e.preventDefault()
		e.stopPropagation()
		this.setState({
			placeholder: 'Try clicking a name!'
		})
	}

	alphabetizePeopleByName(people){
		const alphabeticalPeople = people.sort( (a, b) => {
		const aName = a.name.toLowerCase()
		const bName = b.name.toLowerCase()

		if (aName < bName){
			return -1
		}

		if (aName > bName){
			return 1
		}

		return 0

		})
		return alphabeticalPeople
	}

	render(){
		const people = this.getPeople(this.state.query)

		return(
	    <div id="people-list">
	    	<h1>Search for People</h1>

	    	<form onSubmit={ this.handleSubmit.bind(this) }>
	    		<input type='text'
	    			value={ this.state.query }
	    			onChange={ this.handleChange.bind(this) }
	    			placeholder={ this.state.placeholder }
	    			onBlur={ this.handleBlur.bind(this) }
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
