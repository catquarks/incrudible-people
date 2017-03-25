const baseUrl = 'https://coolpeople.herokuapp.com/api/v1'


export function fetchPeople(){
	const people = fetch(`${baseUrl}/people`)
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

export function filterPeople(people){
	return({
		type: 'FILTER_PEOPLE',
		payload: people
	})
}

export function changeActivePerson(person){
	return({
		type: 'CHANGE_ACTIVE_PERSON',
		payload: person
	})
}
