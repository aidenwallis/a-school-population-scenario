import {
  MAIN_MENU,
  CHANGE_SCREEN,
} from '../constants';

const initialState = {
  currentScreen: MAIN_MENU,
};

export default function (state = initialState, action) {
  switch(action.type) {
    case CHANGE_SCREEN:
      return {
        currentScreen: action.screen,
      };
    default:
      return state;
  };
};
