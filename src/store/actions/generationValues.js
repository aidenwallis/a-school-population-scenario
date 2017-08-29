import { SAVE_GENERATION_VALUES } from '../constants';

export function setValues(genData) {
  return {
    type: SAVE_GENERATION_VALUES,
    genData,
  };
}
