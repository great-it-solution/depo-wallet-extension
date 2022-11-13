import {PureComponent} from 'react';
import {HashRouter, Routes, Route, Link} from 'react-router-dom';
// import Analytic from './analytic';
// import CreatePassword from './create-password';
// import ImportWallet from './import-wallet';
// import Initialize from './initialize';
import {Layout} from './layout';

class Welcome extends PureComponent {
	render() {
		return (
			<div className="welcome">
				<img src="/images/depo.svg" alt="DepoWalletLogo" width="128" height="128" />
				<div className="title">Welcome to DepoWallet</div>
				<div className="description">
					<p>Connecting you to Blockchain and Decentralized Web.</p>
					<p>{"We're happy to see you."}</p>
				</div>
				<Link className={'bp3-button bp3-intent-primary bp3-large'} to="/initialize">
					Get Started
				</Link>
			</div>
		);
	}
}

// function createNewVault(password) {
// 	return new Promise((resolve, reject) => {
// 		background.createNewVaultAndKeychain(password, error => {
// 			if (error) {
// 				reject(error);
// 				return;
// 			}

// 			resolve(true);
// 		});
// 	});
// }

// actions.js
// function createNewVaultAndGetSeedPhrase(password) {
// 	return async dispatch => {
// 		// dispatch(showLoadingIndication());

// 		try {
// 			await createNewVault(password);
// 			const seedWords = await verifySeedPhrase();
// 			return seedWords;
// 		} catch (error) {
// 			// dispatch(displayWarning(error.message));
// 			throw new Error(error.message);
// 		} finally {
// 			// dispatch(hideLoadingIndication());
// 		}
// 	};
// }

// const createNewAccount = (password) => createNewVaultAndGetSeedPhrase(password);

// createNewAccount: (password) =>
//       dispatch(createNewVaultAndGetSeedPhrase(password)),
//     createNewAccountFromSeed: (password, seedPhrase) => {
//       return dispatch(createNewVaultAndRestore(password, seedPhrase));
//     },
//     unlockAccount: (password) => dispatch(unlockAndGetSeedPhrase(password)),
// 	verifySeedPhrase: () => verifySeedPhrase()

export default class App extends PureComponent {
	constructor(props) {
		super(props);
	}
	// createNewVault = password => this.props.client.request('createNewVaultAndKeychain', password);
	// createNewAccount = password => {
	// 	return async dispatch => {
	// 		// dispatch(showLoadingIndication());

	// 		try {
	// 			await createNewVault(password);
	// 			const seedWords = await verifySeedPhrase();
	// 			return seedWords;
	// 		} catch (error) {
	// 			// dispatch(displayWarning(error.message));
	// 			throw new Error(error.message);
	// 		} finally {
	// 			// dispatch(hideLoadingIndication());
	// 		}
	// 	};
	// };
	/* 
	<Route path="initialize" element={<Initialize />} />
						<Route path="analytic" element={<Analytic />} />
						<Route path="create-password" element={<CreatePassword client={client} />} />
						<Route path="import-wallet" element={<ImportWallet />} />
	*/
	render() {
		// const {client} = this.props;
		return (
			<HashRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Welcome />} />
						<Route path="*" element={<NoMatch />} />
					</Route>
				</Routes>
			</HashRouter>
		);
	}
}

function NoMatch() {
	return (
		<div>
			<h2>Nothing to see here!</h2>
			<p>
				<Link to="/">Go to the home page</Link>
			</p>
		</div>
	);
}
