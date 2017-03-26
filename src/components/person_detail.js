import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import EditPerson from './edit_person'
import EditLink from './edit_link'
import PersonData from './person_data'
import DeleteLink from './delete_link'
import DeletedPerson from './deleted_person'
import baseUrl from '../base_url'
import Modal from 'react-responsive-modal'

class PersonDetail extends Component {
	constructor(props){
		super(props)
		this.state = {
			editMode: false,
			deleted: false,
			modalIsOpen: false
		}
	}

	componentWillReceiveProps(props){
		this.setState({
			deleted: false
		})
	}

	handleEditMode(){
		const newEditMode = !this.state.editMode
		this.setState({
			editMode: newEditMode
		})
	}

	onOpenModal(){
		this.setState({
			modalIsOpen: true
		})
	}

	onCloseModal(){
		this.setState({
			modalIsOpen: false
		})
	}

	handleDelete(){
		fetch(`${baseUrl}/people/${this.props.id}`, {
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
			.then( res => {

				this.setState({
					deleted: true
				})

				return res
			})
	}

	handleReloadPeopleList(){
		this.props.actions.fetchPeople()
	}

	render(){
		const editMode = this.state.editMode
		const deleted = this.state.deleted
		const personClicked = this.props.personClicked

		return(
	    <div className="person-detail">
	    	<Modal open={ this.state.modalIsOpen }
	    		onClose={ this.onCloseModal.bind(this) }
	    	>
	    		hello
	    	</Modal>
				{
					deleted ? <DeletedPerson handleReloadPeopleList={ this.handleReloadPeopleList.bind(this) } /> : null
				}
				{ !editMode ?
					<PersonData name={ this.props.name }
						instrument={ this.props.instrument }
						favoriteCity={this.props.favoriteCity }
						id={ this.props.id }
						onOpenModal={ this.onOpenModal.bind(this) }
						onCloseModal={ this.onCloseModal.bind(this) }
					/> :
					<EditPerson
						name={ this.props.name }
						instrument={ this.props.instrument }
						favoriteCity={this.props.favoriteCity }
						id={ this.props.id }
						handleEditMode={ this.handleEditMode.bind(this) }
					/>
				}

				{
					personClicked ?
						<div>
							<DeleteLink
								handleDelete={ this.handleDelete.bind(this) }
							/>
							<EditLink
								editMode={ this.state.editMode }
								handleEditMode={ this.handleEditMode.bind(this) }
							/>
						</div> :
						null
				}

	    </div>
		)
	}
}

function mapStateToProps(state){

	const activePerson = state.activePerson
	const clicked = !(activePerson.name === undefined)

	return({
		personClicked: clicked,
		name: activePerson.name,
		instrument: activePerson.instrument,
		favoriteCity: activePerson.favorite_city,
		id: activePerson.id
	})
}

function mapDispatchToProps(dispatch){
	return({
		actions: bindActionCreators(actions, dispatch)
	})
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonDetail)
