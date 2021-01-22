import { Dispatch } from 'redux';
import * as actionTypes from 'store/actions/actionTypes';
import axios from 'axios';

export const getData = () => (dispatch: Dispatch<actionTypes.GetDataDispatchTypes>) => {
  dispatch({
    type: actionTypes.GET_DATA_START,
  });

  axios
    .get(
      `https://api.mapbox.com/isochrone/v1/mapbox/walking/-73.97403573766653%2C40.78055140065905?contours_minutes=10&polygons=true&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
    )
    .then((response: any) => {
      console.log(response);
      dispatch({
        type: actionTypes.GET_DATA_SUCCESS,
        payload: 'data',
      });
    })
    .catch((error) => {
      console.log('Error: ', error);
      dispatch({
        type: actionTypes.GET_DATA_FAILED,
      });
    });
};
