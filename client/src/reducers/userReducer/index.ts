import form from 'reducers/userReducer/form'
import { combineReducers } from 'redux'
import { collection } from './collection'

const userReducer = combineReducers({
  form,
  collection
})

export default userReducer
