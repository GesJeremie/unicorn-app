import Ember from 'ember';
import { Socket } from 'phoenix';

export default Ember.Service.extend({

  init() {
  },

  connect() {
    let options = {};
    const socket = new Socket('ws:localhost:4000/socket', options);
    socket.onOpen(() => {
      console.log('youuu');
    });
    socket.onClose(() => {
      console.log('disconnect')
    });

    socket.onError(() => {
      console.log('error');
    });

    this.set('socket', socket);
    return socket.connect();
  },

  joinChannel(name, params) {
    const socket = this.get('socket');
    const channel = socket.channel(name, params);
    return channel;
  }

});
