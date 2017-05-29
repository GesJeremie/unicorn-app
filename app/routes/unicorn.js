import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    token: ''
  },

  model(params) {
    return Ember.RSVP.hash({
      server: this.get('store').findRecord('server', params.unicorn_name)
    });

    /*
    return [
      {
        title: "Haezer - Control",
        duration: "3:40",
        cover: "https://i.ytimg.com/vi/znIIKOuSjIw/hq720.jpg?sqp=-oaymwEhCNACELwBSFryq4qpAxMIARUAAAAAGAElAADcQj0AgKJD&rs=AOn4CLC-ZymY6cjUOcsPpXtkZA8bep_0qw"
      },
      {
        title: "Haezer - Bass Addict [Tasty Release]",
        duration: "4:27",
        cover: "https://i.ytimg.com/vi/gthKNQQRO74/hq720.jpg?sqp=-oaymwEhCNACELwBSFryq4qpAxMIARUAAAAAGAElAADcQj0AgKJD&rs=AOn4CLBKrgjqCsTd99cBp9XM2emw111rsw"
      },
      {
        title: "Haezer - Minted [Tasty Release]",
        duration: "4:01",
        cover: "https://i.ytimg.com/vi/KhRVxpWh3SI/hq720.jpg?sqp=-oaymwEhCNACELwBSFryq4qpAxMIARUAAAAAGAElAADcQj0AgKJD&rs=AOn4CLBXJkR7Na1vfHirMLErXwnBFH98mA"
      },
      {
        title: "HAEZER on ORIGINAL ELECTRO",
        duration: "43:42",
        cover: "https://i.ytimg.com/vi/h0rMRNu2urM/hqdefault.jpg?custom=true&w=336&h=188&stc=true&jpg444=true&pt=325&jpgq=90&dct_sp=110&sigh=WW2VK7V9c5fWsfbEy_DPSeLZ5eo"
      },
      {
        title: "Haezer - You Feel Me (feat. Born I Music)",
        duration: "3:12",
        cover: "https://i.ytimg.com/vi/Vxlhewll28w/hq720.jpg?custom=true&w=336&h=188&stc=true&jpg444=true&pt=325&jpgq=90&dct_sp=110&sigh=WHm7oyxVOFUe8Jg_g9U1glMXWy8"
      },
      {
        title: "HAEZER x Holly - BEASTS",
        duration: "3:34",
        cover: "https://i.ytimg.com/vi/gGe6rNLN6IU/hq720.jpg?sqp=-oaymwEhCNACELwBSFryq4qpAxMIARUAAAAAGAElAADcQj0AgKJD&rs=AOn4CLBbyDnJLc4D47R4gr_i6QKvm1tFfQ"
      },
      {
        title: "HAEZER - Black (Original Mix)",
        duration: "4:08",
        cover: "https://i.ytimg.com/vi/ppzE2AIyLNw/hq720.jpg?sqp=-oaymwEhCNACELwBSFryq4qpAxMIARUAAAAAGAElAADcQj0AgKJD&rs=AOn4CLBN-iyOCQfVMr6R9dKgegA19jTiuA"
      },
      {
        title: "HAEZER - James Bond",
        duration: "4:17",
        cover: "https://i.ytimg.com/vi/S-L746gczkQ/hqdefault.jpg?sqp=-oaymwEhCNACELwBSFryq4qpAxMIARUAAAAAGAElAADcQj0AgKJD&rs=AOn4CLBISeYBhV1dlGGERVTG0jjN04h66w"
      }
    ];
    */
  },

  afterModel(model, transition) {
    if (transition.queryParams.token !== model.server.get('token')) {
      this.transitionTo('index');
    }
  }
});
