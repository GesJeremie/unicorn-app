import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('server', {path: '/unicorn/:unicorn_name'});
  this.route('create', {path: '/unicorn/create'});
  this.route('join', {path: '/unicorn/join/:unicorn_name'});
  this.route('pick', {path: '/unicorn/pick'});
});

export default Router;
