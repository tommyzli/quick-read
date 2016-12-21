import { fromJS, List, Map } from 'immutable';
import { combineReducers } from 'redux';

import * as actionTypes from './actionTypes';

const initialState = Map({
  parsedText: List([]),
  text: '',
  wpm: 300,
  wpmOptions: List([
    200,
    250,
    300,
    350,
    400,
    450,
    500,
  ]),
});

function app(state = initialState,  action) {
  switch (action.type) {
    case actionTypes.CHANGED_TEXT:
      return state.set('text', action.value);

    case actionTypes.CHANGED_WPM:
      return state.set('wpm', parseInt(action.value, 10));

    case actionTypes.PLAY:
      return state.set(
        'parsedText',
        fromJS(state.get('text').replace(/\n/g, ' ').split(' '))
      );

    default:
      return state;
  }
}

export default combineReducers({
  app,
});
