import Ember from 'ember';

export function progressBar(params/*, hash*/) {
  const currentTime = Math.round(params[0]),
        totalTime = Math.round(params[1]);

  let percentage;

  if (totalTime === 0) {
    return;
  }

  percentage = (currentTime * 100) / totalTime;

  return percentage + '%';
}

export default Ember.Helper.helper(progressBar);
