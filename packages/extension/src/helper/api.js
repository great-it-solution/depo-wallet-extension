import {
	ENVIRONMENT_TYPE_BACKGROUND,
	ENVIRONMENT_TYPE_POPUP,
	ENVIRONMENT_TYPE_FULLSCREEN,
	ENVIRONMENT_TYPE_NOTIFICATION,
} from './constants';

const memoize = cb => {
	let cache = {};
	return (...args) => {
		const key = JSON.stringify(args);
		if (cache[key]) {
			return cache[key];
		}
		return (cache[key] = cb(...args));
	};
};

const getEnvironmentTypeMemo = memoize(url => {
	const parsedUrl = new URL(url);
	if (parsedUrl.pathname === '/popup.html') {
		return ENVIRONMENT_TYPE_POPUP;
	} else if (['/home.html', '/phishing.html'].includes(parsedUrl.pathname)) {
		return ENVIRONMENT_TYPE_FULLSCREEN;
	} else if (parsedUrl.pathname === '/notification.html') {
		return ENVIRONMENT_TYPE_NOTIFICATION;
	}
	return ENVIRONMENT_TYPE_BACKGROUND;
});

class ChromeApi {
	chrome = null;
	constructor(chrome) {
		this.chrome = chrome;
	}
	getEnvironmentType = (url = window.location.href) => getEnvironmentTypeMemo(url);
	checkForError = () => {
		const {lastError} = this.chrome.runtime;
		if (!lastError) {
			return undefined;
		}
		// if it quacks like an Error, its an Error
		if (lastError.stack && lastError.message) {
			return lastError;
		}
		// repair incomplete error object (eg chromium v77)
		return new Error(lastError.message);
	};
	reload = () => {
		this.chrome.runtime.reload();
	};
	openTab = options =>
		new Promise((resolve, reject) => {
			this.chrome.tabs.create(options, newTab => {
				const error = this.checkForError();
				if (error) {
					return reject(error);
				}
				return resolve(newTab);
			});
		});
	openWindow = options =>
		new Promise((resolve, reject) => {
			this.chrome.windows.create(options, newWindow => {
				const error = this.checkForError();
				if (error) {
					return reject(error);
				}
				return resolve(newWindow);
			});
		});
	focusWindow = windowId =>
		new Promise((resolve, reject) => {
			this.chrome.windows.update(windowId, {focused: true}, () => {
				const error = this.checkForError();
				if (error) {
					return reject(error);
				}
				return resolve();
			});
		});
	updateWindowPosition = (windowId, left, top) =>
		new Promise((resolve, reject) => {
			this.chrome.windows.update(windowId, {left, top}, () => {
				const error = this.checkForError();
				if (error) {
					return reject(error);
				}
				return resolve();
			});
		});
	getLastFocusedWindow = () =>
		new Promise((resolve, reject) => {
			this.chrome.windows.getLastFocused(windowObject => {
				const error = this.checkForError();
				if (error) {
					return reject(error);
				}
				return resolve(windowObject);
			});
		});
	closeCurrentWindow = () =>
		this.chrome.windows.getCurrent(windowDetails => {
			return this.chrome.windows.remove(windowDetails.id);
		});
	getVersion = () => {
		const {version, version_name: versionName} = this.chrome.runtime.getManifest();

		const versionParts = version.split('.');
		if (versionName) {
			// On Chrome, the build type is stored as `version_name` in the manifest, and the fourth part
			// of the version is the build version.
			const buildType = versionName;
			if (versionParts.length < 4) {
				throw new Error(`Version missing build number: '${version}'`);
			}
			const [major, minor, patch, buildVersion] = versionParts;

			return `${major}.${minor}.${patch}-${buildType}.${buildVersion}`;
		} else if (versionParts.length === 4) {
			// On Firefox, the build type and build version are in the fourth part of the version.
			const [major, minor, patch, prerelease] = versionParts;
			const matches = prerelease.match(/^(\w+)(\d)+$/u);
			if (matches === null) {
				throw new Error(`Version contains invalid prerelease: ${version}`);
			}
			const [, buildType, buildVersion] = matches;
			return `${major}.${minor}.${patch}-${buildType}.${buildVersion}`;
		}

		// If there is no `version_name` and there are only 3 version parts, then this is not a
		// prerelease and the version requires no modification.
		return version;
	};
	openExtensionInBrowser = (route = null, queryString = null, keepWindowOpen = false) => {
		let extensionURL = this.chrome.runtime.getURL('home.html');

		if (queryString) {
			extensionURL += `?${queryString}`;
		}

		if (route) {
			extensionURL += `#${route}`;
		}
		this.openTab({url: extensionURL});
		if (this.getEnvironmentType() !== ENVIRONMENT_TYPE_BACKGROUND && !keepWindowOpen) {
			window.close();
		}
	};
	getI18nMessage = key => this.chrome.i18n.getMessage(key);
	getActiveTab = winId => {
		const qry = {active: true};
		winId && (qry.windowId = winId);
		return new Promise((resolve, reject) => {
			try {
				this.chrome.tabs.query(qry, tabs => {
					resolve(tabs[0]);
				});
			} catch (e) {
				reject(e);
			}
		});
	};

	// sendMessageToActiveTab = async (payload, callback) => {
	// 	const tab = await this.getActiveTab();
	// 	chrome.tabs.sendMessage(tab.id, payload, callback);
	// 	return true;
	// };

	setBadgeText = badge => this.chrome.browserAction.setBadgeText({text: badge});
	openHelpPage = (path = 'home', data = '') => {
		const helpUrl = `${this.chrome.runtime.getURL('option.html')}?path=${path}&url=${data}`;
		this.chrome.tabs.create({url: helpUrl}, () => {});
	};

	createContextMenu = opts => chrome.contextMenus.create(opts);

	speak = (text, callback) => {
		this.chrome.tts.speak(text, {
			requiredEventTypes: ['end'],
			onEvent: event => {
				if (event.type === 'end') {
					callback();
				}
			},
		});
	};
	stop = () => {
		chrome.tts.stop();
	};
}

export default ChromeApi;
