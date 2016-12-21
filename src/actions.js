import * as actionTypes from './actionTypes';


export const changedText = (value) => {
  return {
    type: actionTypes.CHANGED_TEXT,
    value,
  };
};

export const changedWPM = (value) => {
  return {
    type: actionTypes.CHANGED_WPM,
    value,
  };
};

export const play = () => {
  return { type: actionTypes.PLAY };
}
