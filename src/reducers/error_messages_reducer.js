export default function ErrorMessagesReducer(state=[], action) {
	switch(action.type) {
		case 'SET_ERROR_MESSAGES':
			return action.payload
		default:
			return state
	}
}
