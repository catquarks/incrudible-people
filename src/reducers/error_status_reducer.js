export default function ErrorStatusReducer(state=false, action) {
	switch(action.type) {
		case 'TOGGLE_ERROR_STATUS':
			return !state
		case 'RESET_ERROR_STATUS':
			return false
		default:
			return state
	}
}
