import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducers';
import { applyMiddleware, compose } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

export const store = configureStore({
  reducer: reducer,
},compose(applyMiddleware(thunk)));