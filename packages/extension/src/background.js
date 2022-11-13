// import {PureComponent} from 'react';
// import Demo from '../components/Demo';
import chrome from './helper/chrome';

// return <Demo />;
var portFromCS;

// let ports = {};

class Main {
	constructor() {
		this.init();
	}
	handleDisconnect = p => {
		console.log('Disconnected from the extension:', p);
	};
	handleConnect = p => {
		portFromCS = p;
		console.log('p==>', p);
		portFromCS.postMessage({greeting: 'hi there content script!'});
		portFromCS.onMessage.addListener(function (m) {
			console.log('In background script, received message from content script: ', m);
			// if (m.greeting === 'ini dari popup') {
			portFromCS.postMessage({greeting: 'Iya sudah diterima'});
			// }
			// chrome.notifications.create({
			// 	type: 'basic',
			// 	// .extension.getURL("icons/link-48.png"),
			// 	iconUrl: chrome.extension.getURL('images/icon-48.png'),
			// 	title: 'Message',
			// 	message: m.greeting,
			// });
		});
	};
	init = () => {
		console.log('chrome ===>', chrome);
		chrome.runtime.onConnect.addListener(this.handleConnect);
		// chrome.runtime.onDisconnect.addListener(this.handleDisconnect);
	};
}
new Main();

// import '@babel/polyfill';
// import chromeService from './services/chromeService';
// import constants from '../constants';
// import db from './services/dbService';
// import schema from './services/schema';
// import Routes from './routes';
// import chrome from './helper/chrome';

// let AppInitState = 0; // it means app is off on startup

// /**
//  * Main extension functionality
//  *
//  * @class Main
//  */
// class Main {
// 	constructor() {
// 		// set feedback form url
// 		this.setFeedbackFormUrl();
// 		this.init().catch(() => {});
// 	}

// 	init = async () => {
// 		await this.initDb();
// 		this.popUpClickSetup();
// 		await Routes();
// 	};
// 	/**
// 	 * initialize db settings
// 	 * @method
// 	 * @memberof Main
// 	 */
// 	initDb = async () => {
// 		const res = await db.get('_loaded');
// 		if (!res.hasOwnProperty('_loaded')) {
// 			await db.set({_loaded: true, ...schema.data});
// 			chromeService.openHelpPage('welcome');
// 		}
// 	};
// 	popUpClickSetup() {
// 		chrome.browserAction.onClicked.addListener(() => {
// 			if (this.toggleApp()) {
// 				chromeService.openHelpPage('');
// 			} else {
// 				this.stopApp();
// 			}
// 		});
// 	}
// 	/**
// 	 * toggle app
// 	 *
// 	 * @method
// 	 * @memberof Main
// 	 */
// 	toggleApp = () => {
// 		AppInitState = AppInitState ? 0 : 1;
// 		return AppInitState;
// 	};
// 	/**
// 	 * stop app
// 	 *
// 	 * @method
// 	 * @memberof Main
// 	 */
// 	stopApp = () => {
// 		AppInitState = 0;
// 	};
// 	/**
// 	 *set feedback form url shown while uninstalling
// 	 * */
// 	setFeedbackFormUrl = () => {
// 		chrome.runtime.setUninstallURL(constants.support.uninstallFeedbackForm);
// 	};
// }

// new Main();
