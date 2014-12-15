/**
 * REACT Component representing the Videos collection with searchbar and filter options
 * @module 	react/components/Videos
 */
var React = require('react');
var Input = require('react-bootstrap/Input');
var Util = require('../../util/Util.js');

var Videos = React.createClass({
	mixins: [React.addons.LinkedStateMixin],

	getInitialState: function() {
		return {
			searchString: '',
			filterWeek: false,
			filterMonth: false,
			filterYear: true,
			filter2013: false,
			filter2012: false,
		};
	},

	render: function() {

		var videos = this.props.videoCollection;

		if (this.props.videoCollection.customFilter) {
			videos = this.props.videoCollection.customFilter(
												this.state.searchString,
												this.state.filterWeek,
												this.state.filterMonth,
												this.state.filterYear,
												this.state.filter2013,
												this.state.filter2012
											);
		}

		return (
			<div className='videos'>
				<div className='videos-title'>Choose Content</div>
				<div className='videos-inner'>
					<div className='search-videos'>
						<Input type='text' valueLink={this.linkState('searchString')} placeholder='search by title name and description'/>
					</div>
					<div className='video-selection'>
						<div className='video-filter'>
							<div>date modified</div>
							<Input type="checkbox" label="this week" checkedLink={this.linkState('filterWeek')} readOnly name='modified'/>
							<Input type="checkbox" label="this month" checkedLink={this.linkState('filterMonth')} readOnly name='modified'/>
							<Input type="checkbox" label="this year" checkedLink={this.linkState('filterYear')} readOnly name='modified'/>
							<Input type="checkbox" label="2013" checkedLink={this.linkState('filter2013')} readOnly name='modified'/>
							<Input type="checkbox" label="2012" checkedLink={this.linkState('filter2012')} readOnly name='modified'/>
						</div>
						<div className='video-titles'>
							<ul>
								{
									videos.map && videos.map(function(video) {
										return <li
											data-id={video.cid}
											key={video.cid}
											draggable='true'
											onDragStart={this.onDragStart}>
											{video.get('title')}</li>;
									}, this)
								}
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	},

	/**
	 * Get cid of dragged list item and add datatransfer
	 * @param  {Event} e drag event
	 */
	onDragStart: function(e) {
		e.dataTransfer.effectAllowed = 'move';
		var data = {
			cid: e.currentTarget.getAttribute('data-id')
		};
		e.dataTransfer.setData("text/plain", JSON.stringify(data));
	}

});

module.exports = Videos;