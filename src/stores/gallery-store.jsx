var React = require('react');
var Api = require('../utils/api.jsx');
var Redux = require('redux');

var GalleryStore = {
  store: false, 
  state: false,
  _events: {},
  getInitialState: function() {
    return {
      section: 'hot',
      sort: 'viral',
      window: 'day',
      viral: false,
      images: false
    }
  },
  dispatch: function (event, data) {
      if (!this._events[event]) return;
      for (var i = 0; i < this._events[event].length; i++) {
        this._events[event][i](data);
      }
  },
  subscribe: function (event, callback) {
    if (!this._events[event]) this._events[event] = [];
    this._events[event].push(callback);
  },
  storeActions: function( state , action ) { // Reducer
    var state = this.state?this.state:this.getInitialState();
    switch (action.type) {
      case 'IMAGES':
        state.images = action.images;
        break;
      case 'section':
        state.section = action.value;
        break;
      case 'sort':
        state.sort = action.value;
        break;
      case 'window':
        state.window = action.value;
        break;
    }
    return state;
  },
  createStore: function() {
    this.store = Redux.createStore( this.storeActions.bind(this) );
  },
  updateState: function() {
    this.dispatch('changed', this.store.getState() );
  },
  getGallery: function( newState ) {
    if ( !this.store ) {
      this.createStore();
      this.state = this.getInitialState();
      this.store.subscribe( () => this.updateState() );
    }

    for( var propName in newState ) {
      this.store.dispatch({ type: propName, value: newState[propName] });
    }

    return Api.get('gallery/' + this.state.section + '/' + this.state.sort + '/' + this.state.window + '?showViral=' + this.state.viral)
      .then(function(json) {
        this.store.dispatch({ type: 'IMAGES' , images: json.data });
      }.bind(this));
  },
};

module.exports = GalleryStore;