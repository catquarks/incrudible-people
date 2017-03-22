export function fetchPeople(){
	const people = fetch('/people')
	.then(response => {
		return response.json()
	})
	.then(people => {
		return people
	})

	return({
		type: 'FETCH_PEOPLE',
		payload: people
	})
}

export function changeActivePerson(person){
	return({
		type: 'CHANGE_ACTIVE_PERSON',
		payload: person
	})
}