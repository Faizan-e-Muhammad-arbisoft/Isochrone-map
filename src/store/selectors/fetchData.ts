import { RootStore } from 'store';

export const getJsonData = (state: RootStore) => state.fetchData.data;

export const getLoading = (state: RootStore) => state.fetchData.loading;

export const getError = (state: RootStore) => state.fetchData.error;
