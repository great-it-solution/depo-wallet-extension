import React from 'react';

class Header extends React.PureComponent {
	render() {
		return (
			<div className="header">
				<div className="contents">{this.props.children}</div>
			</div>
		);
	}
}

class Content extends React.PureComponent {
	render() {
		return <div style={{flex: 1, overflowY: 'auto'}}>{this.props.children}</div>;
	}
}

export {Header, Content};
