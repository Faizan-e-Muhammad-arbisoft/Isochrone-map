import { combineReducers } from 'redux';
import fetchDataReducer from 'store/reducers/fetchData';

const rootReducer = combineReducers({
  fetchData: fetchDataReducer,
});

export default rootReducer;
