import { createStore } from 'redux';
import rootReducer from './reducer';

const store = createStore(rootReducer); // Create the Redux store with root reducer

export default store;
