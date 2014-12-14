var React = require('react');

var Navbar = React.createClass({

	render: function() {
		return (
			<div className='navbar'>
				<div className='logo'><img src='http://fc03.deviantart.net/fs71/f/2013/206/1/9/simple_linux_logo_by_dablim-d5k4ghu.png'/></div>
				<div className='links'>
					<span>Feedback</span>
					<span>Support</span>
					<span>Account</span>
					<span>test@testimonion.org</span>
				</div>
			</div>
		);
	}

});

module.exports = Navbar;