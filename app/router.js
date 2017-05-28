import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('create');
  this.route('unicorn', {path: '/unicorn/:unicorn_name'});
  this.route('empty');
});

export default Router;
