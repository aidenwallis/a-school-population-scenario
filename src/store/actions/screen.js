import { CHANGE_SCREEN } from '../constants';

export function changeScreen(screen) {
  return {
    type: CHANGE_SCREEN,
    screen,
  };
}
