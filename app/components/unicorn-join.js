import Ember from 'ember';

export default Ember.Component.extend({

  /**
   * Services
   */
  socket: Ember.inject.service(),
  store: Ember.inject.service(),

  /**
   * The socket channel to use
   */
  channel: null,

  /**
   * Setup the component
   */
  didInsertElement() {
    this.setupSocket();
    this.setupChannel();
    this.setupEventsChannel();

    this.get('channel').push('new_device', {});
  },

  /**
   * Connect the socket
   */
  setupSocket() {
    this.get('socket').connect();
  },

  /**
   * Join right channel
   */
  setupChannel() {
    const serverName = this.get('model.server.name'),
          channel = this.get('socket').channel('unicorn:' + serverName);

    channel.join();
    this.set('channel', channel);
  },

  /**
   * Register channel events to listen
   */
  setupEventsChannel() {
    this.get('channel').on('new_song', this.onChannelNewSong.bind(this));
  },

  /**
   * When the channel received a new song
   * @param {Object} song
   */
  onChannelNewSong(song) {
    this.set('currentSong', song);
  },

  actions: {
    onPushSong(song) {

      song.set('pushButtonLabel', 'Pushing ...');

      this.get('channel').push('new_song', {
        id: song.get('id'),
        title: song.get('title'),
        thumbnail: song.get('thumbnail')
      }).receive('ok', (reply) => {
        song.set('pushButtonLabel', 'Push Song');
      });

    }
  }
});
