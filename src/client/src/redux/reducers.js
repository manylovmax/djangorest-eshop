import C from '../constants';

export const changeActiveSuggestion = currentFocus => ({
  type: C.ACTION_CHANGE_ACTIVE_SUGGESTION,
  currentFocus
});