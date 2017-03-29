import { combineReducers } from 'redux';
import PeopleReducer from './people_reducer'
import ActivePersonReducer from './active_person_reducer'
import ErrorStatusReducer from './error_status_reducer'
import ErrorMessagesReducer from './error_messages_reducer'


const rootReducer = combineReducers({
	people: PeopleReducer,
	activePerson: ActivePersonReducer,
	errorStatus: ErrorStatusReducer,
	errors: ErrorMessagesReducer
})

export default rootReducer
