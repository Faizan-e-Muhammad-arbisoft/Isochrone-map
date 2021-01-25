import { Dispatch } from 'redux';
import * as actionTypes from 'store/actions/actionTypes';
import axios from 'axios';

export const getData = (profile: string, lng: number, lat: number, minutes: number) => (
  dispatch: Dispatch<actionTypes.GetDataDispatchTypes>
) => {
  dispatch({
    type: actionTypes.GET_DATA_START,
  });

  axios
    .get(
      `https://api.mapbox.com/isochrone/v1/mapbox/${profile}/${lng},${lat}?contours_minutes=${minutes}&polygons=true&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
    )
    .then((response: any) => {
      console.log(response.data);
      dispatch({
        type: actionTypes.GET_DATA_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log('Error: ', error);
      dispatch({
        type: actionTypes.GET_DATA_FAILED,
      });
    });
};
