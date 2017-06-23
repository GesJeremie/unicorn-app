import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('unicorn', {path: '/unicorn/:unicorn_name'});
  this.route('unicorn-create', {path: '/unicorn/create'});
  this.route('unicorn-join', {path: '/unicorn/join/:unicorn_name'});
  this.route('unicorn-pick', {path: '/unicorn/pick'});
});

export default Router;
