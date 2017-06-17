import DS from 'ember-data';

export default DS.Model.extend({
  video_id: DS.attr(),
  title: DS.attr(),
  thumbnail: DS.attr()
});
