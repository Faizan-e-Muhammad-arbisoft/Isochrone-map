import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from 'store/reducers';
import thunk from 'redux-thunk';

const storeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, storeEnhancers(applyMiddleware(thunk)));

export type RootStore = ReturnType<typeof rootReducer>;

export default store;
