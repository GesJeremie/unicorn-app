import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  token: DS.attr(),
  insertedAt: DS.attr('date'),
  updatedAt: DS.attr('date')
});
