var React = require('react');
var Button = require('react-bootstrap/Button');
/** Views */
var Playlists = require('./Playlists.jsx');
var Videos = require('./Videos.jsx');
var VideoSlider = require('./VideoSlider.jsx');
var Navbar = require('./Navbar.jsx');
/** Models */
var VideoModel = require('../../models/VideoModel');
var PlaylistModel = require('../../models/PlaylistModel');
/** Collections */
var VideoCollection = require('../../collections/VideoCollection');
var PlaylistCollection = require('../../collections/PlaylistCollection');
/** api */
var apiJson = require('../../assets/api.json');

var About = React.createClass({

	getInitialState: function() {
		return {
			videoCollection: {},
			playlistCollection: new PlaylistCollection(),
			activePlaylist: null
		};
	},

	render: function() {
		return (<div className='app'>
					<Navbar />
					<VideoSlider addVideoToPlaylist={this.addVideoToPlaylist}/>
					<Button onClick={this.addNewPlaylist} className='create-new-playlist'>create new playlist</Button>
					<div className='playlists-videos'>
						<Playlists 	playlistCollection={this.state.playlistCollection} 
									setActivePlaylist={this.setActivePlaylist} 
									activePlaylist={this.state.activePlaylist}
									addVideoToPlaylist={this.addVideoToPlaylist}/>
						<Videos 
								videoCollection={this.state.videoCollection}
								addVideoToPlaylist={this.addVideoToPlaylist}/>
					</div>
				</div>);
	},

	componentDidMount: function() {
		this.setVideoCollection();		
		this.addNewPlaylist();
	},

	setVideoCollection: function() {
		var that = this;
		videoCollection = new VideoCollection();
		videoCollection.fetch({
			success: function(response) {
				that.setState({
					videoCollection: response
				});
			}
		});
	},

	addNewPlaylist: function() {
		var playlist = new PlaylistModel({name: 'Playlist ' + (this.state.playlistCollection.length+1)});

		this.state.playlistCollection.add(playlist);
		this.setState({
			playlistCollection: this.state.playlistCollection,
			activePlaylist: playlist
		});
	},

	addVideoToPlaylist: function(video) {
		var playlist = this.state.playlistCollection.get(this.state.activePlaylist),
			playlistVideos = playlist.get('videos'),
			playlistVideo = video.cid ? video : this.state.videoCollection.get(video);

		playlistVideos.push(playlistVideo);
		playlist.set("videos", playlistVideos);
		this.setState({
			playlistCollection: this.state.playlistCollection
		});
	},

	setActivePlaylist: function(playlist) {
		this.setState({
			activePlaylist: playlist
		});
	},

	toString: function() {
		return '[App] ';
	}

});

module.exports = About;