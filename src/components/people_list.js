import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'

class PeopleList extends Component {

	handleActivePerson(person){
		this.props.actions.changeActivePerson(person)
	}

	render(){
		return(
	    <div id="people-list">
	    	<h1>People</h1>

	    	{this.props.people.map( (person)=>{
	    		return(
	    			<p key={ person.id }
	    				onClick={()=>{
	    					this.handleActivePerson(person)
	    				}}
	    			>{ person.name }</p>
    			)
	    	} )}
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
