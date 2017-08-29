import { SAVE_GENERATION_VALUES } from '../constants';

const initialState = {
  set: false,
  genData: {},
};

export default function (state = initialState, action) {
  switch(action.type) {
    case SAVE_GENERATION_VALUES:
      return {
        set: true,
        genData: action.genData,
      };
    default:
      return state;
  }
};
