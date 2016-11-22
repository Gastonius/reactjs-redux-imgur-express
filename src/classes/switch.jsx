var React = require('react');
var ReactDom = require('react-dom');
var GalleryStore = require('../stores/gallery-store.jsx');

var Switch = React.createClass({
	handleChange: function() {
		var parms = {};
		parms[this.props.name] = $( ReactDom.findDOMNode(this) ).find('input[type=checkbox]').prop('checked');
		GalleryStore.getGallery( parms );
	},
	render: function() {
		return <div><span className="switch_label greenLight">{this.props.label}</span>
          <div className="switch">
            <label>
              No
              <input type="checkbox" onChange={this.handleChange}/>
              <span className="lever"></span>
              Yes
            </label>
          </div></div>;
	},
});

module.exports = Switch;