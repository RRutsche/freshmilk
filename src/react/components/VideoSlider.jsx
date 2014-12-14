var React = require('react');
/** dummy api */
var dummyApi = require('../../assets/dummyVideos.json');
/** Models */
var VideoModel = require('../../models/VideoModel');
/** Collections */
var DummyCollection = require('../../collections/DummyCollection');

var VideoSlider = React.createClass({

	getInitialState: function() {
		return {
			dummyCollection: [] 
		};
	},

	render: function() {

		return (
			<div className='video-slider'>
				<div className='slider-title'>some recommendations ready for being embedded!</div>
				<div className='video-slider-inner'>
					<ul>
						{
							this.state.dummyCollection.map(function(videoModel) {
								return <li onClick={this.addVideoToPlaylist.bind(this, videoModel)}><img src={videoModel.get('img')}/><span className='title'>{videoModel.get('title')}</span></li>;
							}, this)
						}
					</ul>
				</div>
			</div>
		);
	},

	componentDidMount: function() {
		this.getSliderVideos();
	},

	getSliderVideos: function() {
		var videos = [],
			dummyVideos = dummyApi.results,
			dummyCollection;

		dummyVideos.forEach(function(dummyVideo) {
			videos.push(new VideoModel(dummyVideo));
		});
		dummyCollection = new DummyCollection(videos);
		this.setState({
			dummyCollection: dummyCollection
		});
	},

	addVideoToPlaylist: function(video) {
		this.props.addVideoToPlaylist(video);
	}

});

module.exports = VideoSlider;