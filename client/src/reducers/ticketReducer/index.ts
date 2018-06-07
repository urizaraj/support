import { view } from 'reducers/ticketReducer/view'
import { combineReducers } from 'redux'
import { collection } from './collection'
import { form } from './form'

export const ticketReducer = combineReducers({
  form,
  collection,
  view
})
