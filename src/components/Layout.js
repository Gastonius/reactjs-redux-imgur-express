import React from 'react';
import { Link } from 'react-router';
var GalleryStore = require('../stores/gallery-store.jsx');
var ImagePreview = require('./image-preview.jsx');
import Dropdown from '../classes/dropdown.jsx';
import Switch from '../classes/switch.jsx';


var Layout = React.createClass({
  getInitialState: function() {
    return { images: [] }
  },

  componentWillMount: function() {
    GalleryStore.getGallery();
    GalleryStore.subscribe('changed', function(data) {
      this.setState(data);
    }.bind(this) );
  },

  renderGallery: function() {
    if ( this.state && this.state.images ) {
      return this.state.images.slice(0,10).map( function( image ) {
        return <ImagePreview key={image.id} {...image} />
      }.bind(this));  
    }
  },

  render: function() {
    var sections = [
      { name: "Hot", value: "hot" }, 
      { name: "Top", value: "top" }, 
      { name: "User", value: "user" }
    ];

    var sortoptions = [
      { name: "Viral", value: 'viral'},
      { name: "Top", value: 'top'},
      { name: "Time", value: 'time'}
    ];

    var windowoptions = [
      { name: "Day", value: 'day'},
      { name: "Week", value: 'week'},
      { name: "Month", value: 'month'},
      { name: "Year", value: 'year'},
      { name: "All", value: 'all'}
    ];

    var window_dropdown = '', show_viral = '';
    if ( this.refs.section_dropdown ) {
      if ( this.refs.section_dropdown.state.value == 'top') {
        window_dropdown = <Dropdown ref="window_dropdown" name="window" label="Window" list={windowoptions} selected={windowoptions[0]} />;
      } else if ( this.refs.section_dropdown.state.value == 'user') {
        sortoptions.push({ name: "Rising", value: 'rising'});
        show_viral = <Switch ref="show_viral" name="viral" label="Show viral?" />;
      }
    }

    return (
      <div className="app-container">
        <div className="row green darken-4">
          <div className="col s12 m6">
            <Link to="/" className="navbar-brand"><img src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Imgur_logo.svg" /><span className="greenLight"> Imgur Image Browser</span></Link>
          </div>
          <div className="col s12 m6 aligner">{show_viral}</div>
          <div className="green darken-3 col s12">
            <Dropdown ref="section_dropdown" name="section" label="Section" list={sections} selected={sections[0]} />
            <Dropdown ref="sort_dropdown" name="sort" label="Sort" list={sortoptions} selected={sortoptions[0]} />
            {window_dropdown}
          </div>
        </div>
        <div class="gallery-container">
          {this.renderGallery()}
        </div>
      </div>
    );
  }
})

module.exports = Layout;