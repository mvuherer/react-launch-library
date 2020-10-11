import { combineReducers } from 'redux';

import agencies from './agencies';
import launches from './launches';

export default combineReducers({
  agencies,
  launches,
});
