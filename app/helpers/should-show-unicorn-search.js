import Ember from 'ember';

export function shouldShowUnicornSearch(params, hash) {
  const media = params[0],
        search = params[1]

  if (media.get('isSmall') || media.get('isMedium')) {
    return;
  }

  return search;

}

export default Ember.Helper.helper(shouldShowUnicornSearch);
