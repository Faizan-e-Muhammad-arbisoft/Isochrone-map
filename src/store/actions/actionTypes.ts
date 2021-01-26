// ActionTypes for Get Data
export const GET_DATA_START = 'GET_DATA_START';
export const GET_DATA_SUCCESS = 'GET_DATA_SUCCES';
export const GET_DATA_FAILED = 'GET_DATA_FAILED';

export interface GetDataStart {
  type: typeof GET_DATA_START;
}

export interface GetDataSuccess {
  type: typeof GET_DATA_SUCCESS;
  payload: any;
}

export interface GetDataFailed {
  type: typeof GET_DATA_FAILED;
}

export type GetDataDispatchTypes = GetDataStart | GetDataSuccess | GetDataFailed;
