// import KeyringController from 'eth-keyring-controller';
import {ethers} from 'ethers';

export default class DepoWalletController {
	constructor(options) {
		// const additionalKeyrings = [TrezorKeyring, LedgerBridgeKeyring];
		// const additionalKeyrings = [];
		// this.keyringController = new KeyringController({
		// 	keyringTypes: additionalKeyrings,
		// 	initState: initState.KeyringController,
		// 	encryptor: opts.encryptor || undefined,
		// });
	}
	// async createNewVaultAndKeychain(password) {
	// 	const releaseLock = await this.createVaultMutex.acquire();
	// 	try {
	// 		let vault;
	// 		const accounts = await this.keyringController.getAccounts();
	// 		if (accounts.length > 0) {
	// 			vault = await this.keyringController.fullUpdate();
	// 		} else {
	// 			vault = await this.keyringController.createNewVaultAndKeychain(password);
	// 			const addresses = await this.keyringController.getAccounts();
	// 			this.preferencesController.setAddresses(addresses);
	// 			this.selectFirstIdentity();
	// 		}

	// 		return vault;
	// 	} finally {
	// 		releaseLock();
	// 	}
	// }
	createWallet = async password => {
		const mnemonic = await ethers.utils.HDNode.entropyToMnemonic(ethers.utils.randomBytes(16));
		const wallet = ethers.Wallet.fromMnemonic(mnemonic);
	};
}
