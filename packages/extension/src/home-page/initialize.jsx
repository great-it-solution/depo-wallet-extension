import {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import {Card, Elevation} from '@blueprintjs/core';
import {Main} from './layout';
import Plus from '../components/icons/plus.svg';
import Download from '../components/icons/download.svg';

export default class Initialize extends PureComponent {
	render() {
		return (
			<Main>
				<div className="title">New to DepoWallet?</div>
				<div className="initialize">
					<Card interactive={true} elevation={Elevation.TWO}>
						<div className="icon">
							<Download height="38" width="38" />
						</div>
						<div>
							<h5 className="bp3-heading">No, I already have a Secret Recovery Phrase</h5>
							<p>Import your existing wallet using a Secret Recovery Phrase</p>
						</div>
						<Link className={'bp3-button bp3-intent-primary bp3-large'} to="/analytic?next=import-wallet">
							Import Wallet
						</Link>
					</Card>
					<Card interactive={true} elevation={Elevation.TWO}>
						<div className="icon">
							<Plus height="38" width="38" />
						</div>
						<div>
							<h5 className="bp3-heading">Yes, let’s get set up!</h5>
							<p>This will create a new wallet and Secret Recovery Phrase</p>
						</div>
						<Link className={'bp3-button bp3-intent-primary bp3-large'} to="/analytic?next=create-password">
							Create Wallet
						</Link>
					</Card>
				</div>
			</Main>
		);
	}
}
