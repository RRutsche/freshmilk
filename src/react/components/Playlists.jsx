var React = require('react/addons');
var Input = require('react-bootstrap/Input');
var Dropzone = require('react-dropzone');

var Playlists = React.createClass({
	mixins: [React.addons.LinkedStateMixin],

	getInitialState: function() {
		return {
			searchString: '' 
		};
	},

	getDefaultProps: function() {
		return {
			playlistCollection: []
		};
	},

	render: function() {

		var playlists = this.props.playlistCollection;

		if (this.state.searchString.length > 0) {
			playlists = this.props.playlistCollection.filterName(this.state.searchString);
		}
		return (
			<div className='playlists'>
				<div className='playlists-title'>Playlists</div>
				<div className='playlists-inner'>
					<div className='search-playlists'>
						<Input type='text' valueLink={this.linkState('searchString')} placeholder='search playlist name'/>
					</div>
					<div className='playlist-selection'>
						<div className='playlist-names'>
							{
								playlists.map(function(playlist) {
									var cx = React.addons.classSet({
										'playlist-name': true,
										'active': playlist.cid === this.props.activePlaylist.cid
									});
									return (<div onClick={this.setActivePlaylist.bind(this, playlist)} className={'id'+playlist.cid} key={playlist.cid}>
												<div className={cx}>{playlist.get('name')}</div>
											</div>);
								}, this)
							}
						</div>
						<div className='playlist-videos' onDrop={this.onDrop} onDragOver={this.onDragOver}>
							<ul>
								{this.getPlaylistVideos()}
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	},

	onDrop: function(event) {
		event.preventDefault();
		var data;
		try {
			data = JSON.parse(event.dataTransfer.getData('text'));
		} catch (e) {
			return;
		}
		this.props.addVideoToPlaylist(data.cid);
	},

	onDragOver: function (event) {
		event.preventDefault();
	},

	setActivePlaylist: function(playlist) {
		this.props.setActivePlaylist(playlist);
	},

	getPlaylistVideos: function() {
		var playlist = this.props.playlistCollection.get(this.props.activePlaylist),
			videos = [];

		if (playlist) {
			playlist.get('videos').forEach(function(video) {
				videos.push(<li>{video.get('title')}</li>);
			});
		}
		return videos;
	}

});

module.exports = Playlists;