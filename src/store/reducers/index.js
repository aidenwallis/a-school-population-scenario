import { combineReducers } from 'redux';

import screenReducer from './screen';
import generationValuesReducer from './generationValues';

const reducers = combineReducers({
  screen: screenReducer,
  generationValues: generationValuesReducer,
});

export default reducers;
