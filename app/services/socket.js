import Ember from 'ember';
import ENV from '../config/environment';
import { Socket } from 'phoenix';

export default Ember.Service.extend(Ember.Evented, {

  socket: null,
  isHealthy: false,

  connect(url) {
    const socket = this._createSocket();

    socket.onOpen(() => {
      if (this.isDestroyed || this.isDestroying) {
        return;
      }

      this.set('isHealthy', true);
      this.trigger('open', ...arguments);
    });

    socket.onClose(() => {
      if (this.isDestroyed || this.isDestroying) {
        return;
      }

      this.set('isHealthy', false);
      this.trigger('close', ...arguments);
    });

    socket.onError(() => {
      if (this.isDestroyed || this.isDestroying) {
        return;
      }

      this.set('isHealthy', false);
      this.trigger('error', ...arguments);
    });

    this.set('socket', socket);

    return socket.connect();
  },

  _createSocket() {
    return new Socket(ENV.socketHost);
  },

  channel(name, params) {
    const socket = this.get('socket');
    Ember.assert('must connect to a socket first', socket);

    return socket.channel(name, params);;
  }

});
