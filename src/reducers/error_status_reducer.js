export default function ErrorStatusReducer(state=false, action) {
	switch(action.type) {
		case 'TOGGLE_ERROR_STATUS':
			return !state
		default:
			return state
	}
}
