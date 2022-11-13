import {PureComponent} from 'react';
import {Navigate, useSearchParams} from 'react-router-dom';
import {Main} from './layout';

function SearchParams({children}) {
	let [searchParams] = useSearchParams();
	return children(searchParams);
}

export default class Analytic extends PureComponent {
	state = {
		forward: false,
		agree: true,
	};
	onDisagree = () => {
		this.setState({forward: true, agree: false});
	};
	onAgree = () => {
		this.setState({forward: true, agree: true});
	};
	render() {
		const {agree, forward} = this.state;
		return (
			<Main>
				<SearchParams>
					{sp =>
						forward ? <Navigate to={`/${sp.get('next')}?analytic=${agree ? 'agree' : 'disagree'}`} replace={true} /> : null
					}
				</SearchParams>
				<div className="title">Help us improve DepoWallet</div>
				<div className="analytic">
					<div>
						{'DepoWallet would like to gather usage data to better understand how our users interact with the ' +
							'extension. This data will be used to continually improve the usability and user experience ' +
							'of our product and the Ethereum ecosystem.'}
					</div>
					<div>DepoWallet will..</div>
					<ul>
						<li>Always allow you to opt-out via Settings</li>
						<li>Send anonymized click &amp; pageview events</li>
					</ul>
					<ul>
						<li>
							<span>Never</span>
							{' collect keys, addresses, transactions, balances, hashes, or any personal information a'}
						</li>
						<li>
							<span>Never</span> collect your full IP address
						</li>
						<li>
							<span>Never</span> sell data for profit. Ever!
						</li>
					</ul>
					<div>
						<a className={'bp3-button bp3-intent-primary bp3-large'} onClick={this.onDisagree}>
							No Thanks
						</a>
						<a className={'bp3-button bp3-intent-primary bp3-large'} onClick={this.onAgree}>
							I Agree
						</a>
					</div>
					<div>
						This data is aggregated and is therefore anonymous for the purposes of General Data Protection Regulation (EU)
						2016/679. For more information in relation to our privacy practices, please see our{' '}
						<a href="https://DepoWallet.io/privacy.html" target="_blank" rel="noopener noreferrer">
							Privacy Policy here
						</a>
					</div>
				</div>
			</Main>
		);
	}
}
