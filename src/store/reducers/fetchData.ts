import * as actionTypes from 'store/actions/actionTypes';
import { initialStateData } from 'store/reducers/initialState';

const reducer = (state = initialStateData, action: actionTypes.GetDataDispatchTypes) => {
  switch (action.type) {
    case actionTypes.GET_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: false,
      };
    case actionTypes.GET_DATA_START:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case actionTypes.GET_DATA_FAILED:
      return {
        ...state,
        data: [],
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default reducer;
