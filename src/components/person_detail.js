import React, { Component } from 'react'
import { connect } from 'react-redux'

class PersonDetail extends Component {

	render(){
		return(
	    <div className="people-detail">
	    	<h1>{ this.props.name }</h1>
    		<p>Instrument: { this.props.instrument }</p>
    		<p>Favorite City: { this.props.favoriteCity }</p>
	    </div>
		)
	}
}

function mapStateToProps(state){
	const activePerson = state.activePerson
	return({
		name: activePerson.name,
		instrument: activePerson.instrument,
		favoriteCity: activePerson.favorite_city
	})
}

export default connect(mapStateToProps)(PersonDetail)
