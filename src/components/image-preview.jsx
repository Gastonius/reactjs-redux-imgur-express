var React = require('react');
var ReactDom = require('react-dom');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
import ImageLoader from 'react-imageloader';

function lowrez( src ) {
	return <img src={src} />;
}

module.exports = React.createClass({
	getInitialState: function() {
		return {
			hovering: false
		}
	},
	componentDidMount: function() {
    	$('.materialboxed').materialbox();
	},
	render: function() {
		var the_link = '',extra = false;
		if ( this.props.is_album ) {
			the_link = this.cover();
		} else {
			the_link = this.image();
		}

		return (
			<div className="cardImage"
				onClick={this.handleOnClick}
			>
					{the_link}
					{extra}
					<p>{this.props.title}</p>
					<div className="details">
						<p><span className="title">Title</span>{this.props.title}</p>
						<p><span className="title">Description</span>{this.props.description?this.props.description:'No description given'}</p>
						<p><span className="title">Ups</span>{this.props.ups}</p>
						<p><span className="title">Downs</span>{this.props.downs}</p>
						<p><span className="title">Score</span>{this.props.score}</p>
					</div>
			</div>
		);
	},
	cover: function() {
		var link_low = 'http://i.imgur.com/' + this.props.cover + 'b.jpg';
		var link = 'http://i.imgur.com/' + this.props.cover + '.jpg';
		return <ImageLoader
    			src={ link }
    			wrapper={React.DOM.div}
    			preloader={lowrez.bind(this,link_low)}>
    				Image load failed!
  			</ImageLoader>;
	},
	image: function() {
		var link_low = 'http://i.imgur.com/' + this.props.id + 'b.jpg';
		var link = 'http://i.imgur.com/' + this.props.id + '.jpg';
		return <ImageLoader
    			src={ link }
    			wrapper={React.DOM.div}
    			preloader={lowrez.bind(this,link_low)}>
    				Image load failed!
  			</ImageLoader>;

	},
	video: function() {
		return (
			<div className="the_video" >
				<video preload='auto' className="responsive-video" autoPlay='autoplay' loop='loop' webkit-playsinline>
					<source src={this.props.mp4} type='video/mp4'></source>
				</video>
			</div>
		
		);
	},
	icon: function() {
		return <i className="material-icons">play_circle_outline</i>
	},
	handleOnClick: function() {
		var card = $( ReactDom.findDOMNode(this) ).closest('.cardImage');
		
		if ( !card.hasClass('big') ) {
			card.addClass('big');
			card.find('.details').show();
			card.prepend('<div id="materialbox-overlay" style="opacity:1;">');

			setTimeout( function() {
				$(window).one('click', function() {
					$('#materialbox-overlay').remove();
					$('.big').find('.details').hide();
					$('.big').removeClass('big');
				});
			
			},0);
			
		}
	
		//$( this.getDOMNode() ).closest('.cardImage').
		//$( this.getDOMNode() ).closest('.cardImage').find('.the_video').toggle();
	}
});