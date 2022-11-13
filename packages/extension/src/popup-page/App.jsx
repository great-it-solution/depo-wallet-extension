import {PureComponent} from 'react';
import {Button, Position, Menu, MenuDivider, MenuItem} from '@blueprintjs/core';
import {Popover2} from '@blueprintjs/popover2';
import {Jazzicon} from '../components/icon';
import {Header, Content} from '../components/layout';
// import chrome from '../helper/chrome';

class Network extends PureComponent {
	render() {
		return (
			<Popover2
				position={Position.BOTTOM_LEFT}
				content={
					<div className="network-popup">
						<div className="popup-header">Networks</div>
						<div className="popup-content">
							<Menu large>
								<MenuDivider title="Ethereum" />
								<div className="menu-info">{'The default networks for Ether transaction is Mainnet'}</div>
								<MenuItem text="Ethereum Mainnet" onClick={this.props.onMainClick} />
								<MenuItem text="Ropsten Test Network" onClick={this.props.onRopstenClick} />
								<MenuItem text="Kovan Test Network" />
								<MenuItem text="Rinkby Test Network" />
								<MenuItem text="Goerli Test Network" />
								<MenuDivider />
								<MenuItem text="Localhost 8545" />
								<MenuItem text="Custom RPC" />
							</Menu>
						</div>
					</div>
				}
			>
				<Button className="network-button">{'Ethereum Mainnet'}</Button>
			</Popover2>
		);
	}
}

class Account extends PureComponent {
	render() {
		return (
			<Popover2
				position={Position.BOTTOM_LEFT}
				content={<div style={{width: '200px', height: '300px'}}>{'account list here'}</div>}
			>
				<a onClick={this.open}>
					<Jazzicon className="identicon" address={'0x21632186183bcs'} diameter={30} />
				</a>
			</Popover2>
		);
	}
}

export default class App extends PureComponent {
	constructor(props) {
		super(props);
	}
	mainClick = () => {
		const {client} = this.props;
		client
			.request('select-network', 'mainnet')
			.then(r => {
				console.log('renspon ==>', r);
			})
			.catch(e => {
				console.log('error ==>', e);
			});
	};
	ropstenClick = () => {
		// this.props.client.getActiveTab().then(tab => {
		// 	console.log('tab ==>', tab);
		// });
	};
	render() {
		return (
			<div style={{display: 'flex', width: '357px', height: '600px', flexDirection: 'column'}}>
				<Header>
					<img src="/images/depo.svg" alt="DepoWalletLogo" width="34" height="34" />
					<div className="account-menu">
						<Network onMainClick={this.mainClick} onRopstenClick={this.ropstenClick} />
						<Account />
					</div>
				</Header>
				<Content />
			</div>
		);
	}
}
