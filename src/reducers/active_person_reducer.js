export default function ActivePersonReducer(state={name: null}, action) {
	switch(action.type) {
		case 'CHANGE_ACTIVE_PERSON':
			return action.payload
		default:
			return state
	}
}