import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getJsonData, getLoading, getError } from 'store/selectors/fetchData';
import { getData } from 'store/actions/fetchData';
import { RootStore } from 'store';
import Map from 'components/Map';

const mapStateToProps = (state: RootStore) => {
  return {
    data: getJsonData(state),
    loading: getLoading(state),
    error: getError(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    fetchDataHandler: () => dispatch<any>(getData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
