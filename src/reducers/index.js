import { combineReducers } from 'redux';
import PeopleReducer from './people_reducer'
import ActivePersonReducer from './active_person_reducer'

const rootReducer = combineReducers({
	people: PeopleReducer,
	activePerson: ActivePersonReducer
})

export default rootReducer
