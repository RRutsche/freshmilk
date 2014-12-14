var React = require('react');

React.Backbone = {

	listenToProps: function(props) {
		_.each(this.updateOnProps, function(events, propName) {
			switch (events) {
				case 'collection':
					events = 'add remove reset sort';
					break;
				case 'model':
					events = 'change';
			}
			this.listenTo(props[propName], events, function() {
				this.forceUpdate();
			});
		}, this);
	},

	componentDidMount: function() {
		this.listenToProps(this.props);
	},

	componentWillReceiveProps: function(nextProps) {
		this.stopListening();
		this.listenToProps(nextProps);
	},

	componentWillUnmount: function() {
		this.stopListening();
	}
};

_.extend(React.Backbone, Backbone.Events);

module.exports = React.Backbone;