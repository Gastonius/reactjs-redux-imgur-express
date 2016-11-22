var React = require('react');
var ReactDom = require('react-dom');
var GalleryStore = require('../stores/gallery-store.jsx');

var Dropdown = React.createClass({
	getInitialState: function() {
		return {
			options: [],
			value: false
		};
	},
	componentDidUpdate: function() {
		$( ReactDom.findDOMNode(this) ).find('select').off('change').on('change', this.handleChange).material_select();
	},
	
	componentDidMount: function() {
		if ( this.props.selected ) this.setState({ value: this.props.selected.value });
		$( ReactDom.findDOMNode(this) ).find('select').on('change', this.handleChange).material_select();
	},
	handleChange: function() {
		this.setState({ value: $( ReactDom.findDOMNode(this) ).find('select').val(), options: this.props.list });

		var parms = {};
		parms[this.props.name] = this.state.value;
		GalleryStore.getGallery( parms );
	},
	render: function() {
		return <div className="input-field col m4 s12">
			<select name={this.props.name} defaultValue={this.props.selected.value}>
				{this.renderListItems()}
    		</select>
			<label>{this.props.label}</label>
		</div>
	},
	
	renderListItems: function() {
		var items = [];
		for (var i = 0; i < this.props.list.length; i++) {
			var item = this.props.list[i];
			items.push(<option value={item.value} key={i}>{item.name}</option>);
		}
		return items;
	}
});

module.exports = Dropdown;