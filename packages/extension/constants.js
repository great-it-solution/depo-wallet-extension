const generateGuid = require('./src/helper/guid');
const constants = {
	appConfig: {
		appName: 'DepoWallet',
		urls: {
			chrome: 'CHROME_STORE_URL',
			firefox: 'FIREFOX_STORE_URL',
			edge: 'EDGE_STORE_URL',
		},
		// put extension key here if required which would only be used in development mode
		key: 'SSH_PUBLIC_KEY', // gather it from extension store
	},
	contentScript: {
		mountId: generateGuid(),
	},
	browser: {
		firefox: {
			manifest: {
				browser_specific_settings: {
					gecko: {
						id: 'GECKO_ID',
						strict_min_version: '42.0',
					},
				},
			},
		},
	},
	support: {
		// donate: "https://www.patreon.com/fxnoob",
		howToVideoLink: 'https://www.youtube.com/watch?v=tutorial',
		uninstallFeedbackForm: 'https://depo.io/feedback/',
	},
};

module.exports = constants;
