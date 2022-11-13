import {PureComponent} from 'react';
import {Outlet} from 'react-router-dom';

class Layout extends PureComponent {
	render() {
		return (
			<div className="container">
				<Outlet />
			</div>
		);
	}
}

class Main extends PureComponent {
	render() {
		const {className} = this.props;
		return (
			<div className="main">
				<div className="section top">
					<div className="section-content">
						<div className="topbar">
							<img src="/images/depo.svg" alt="DepoWalletLogo" width="32" height="32" />
							<div className="title">{'Depo Wallet'}</div>
						</div>
					</div>
				</div>
				<div className="section content">
					<div className={`section-content ${className || ''}`}>{this.props.children}</div>
				</div>
			</div>
		);
	}
}

export {Layout, Main};
