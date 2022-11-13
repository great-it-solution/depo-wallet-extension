const hasChrome = typeof chrome !== 'undefined';
const hasWindow = typeof window !== 'undefined';
const hasBrowser = typeof browser !== 'undefined';

const apis = [
	'alarms',
	'bookmarks',
	'browserAction',
	'commands',
	'contextMenus',
	'cookies',
	'downloads',
	'events',
	'extension',
	'extensionTypes',
	'history',
	'i18n',
	'idle',
	'notifications',
	'pageAction',
	'runtime',
	'storage',
	'tabs',
	'webNavigation',
	'webRequest',
	'windows',
];

class Chrome {
	constructor() {
		for (let api of apis) {
			this[api] = null;
			if (hasChrome && api in chrome) {
				this[api] = chrome[api];
			}

			if (hasWindow && api in window) {
				this[api] = window[api];
			}

			if (hasBrowser) {
				if (api in browser) {
					this[api] = browser[api];
				}
				if (browser.extension && api in browser.extension) {
					this[api] = browser.extension[api];
				}
			}
		}
		if (hasBrowser) {
			if (browser.runtime) {
				this.runtime = browser.runtime;
			}
			if (browser.browserAction) {
				this.browserAction = browser.browserAction;
			}
		}
	}
}

export default new Chrome();
