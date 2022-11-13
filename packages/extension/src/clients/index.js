import chrome from '../helper/chrome';
import {messageField, messageType} from '../helper/msg';

class Client {
	port = null;
	portId = null;
	name = null;
	chrome = chrome;
	_reqListener = {};
	constructor(name = 'client-script') {
		this.name = name;
		this.init();
	}
	handleResponse = msg => {
		const requestId = msg[messageField.requestId];
		const error = msg[messageField.error];
		const response = msg[messageField.response];
		if (this._reqListener[requestId]) {
			this._reqListener[requestId](error, response);
			delete this._reqListener[requestId];
		}
	};
	handleMessage = message => {
		const {t: msgType, ...msg} = message;
		if (!msgType) {
			console.log('[Client]', 'handleMessage', 'msgType is null');
		}
		if (msgType === 'port-id') {
			this.portId = msg.portId;
			console.log(`${this.name} portId: ${this.portId}`);
		} else if (msgType === messageType.response) {
			this.handleResponse(msg);
		} else {
			console.log(`${this.name} unknown message type: ${msgType}`, msg);
		}
	};
	connect = () => {
		this.port = chrome.runtime.connect({name: this.name});
		this.port.onMessage.addListener(this.handleMessage);
	};
	request = (reqType, params) =>
		new Promise((resolve, reject) => {
			const requestId = Math.random().toString(36).substr(2, 9);
			this._reqListener[requestId] = (error, response) => {
				if (error) return reject(new Error(error));
				resolve(response);
			};
			this.port.postMessage({
				[messageField.type]: messageType.request,
				[messageField.requestType]: reqType,
				[messageField.requestId]: requestId,
				...(params ? {[messageField.requestParams]: params} : {}),
			});
		});
	init = () => {
		this.connect();
	};
	// getActiveTab = () => {
	// 	const qry = {active: true, currentWindow: true};
	// 	// if (winId) {
	// 	// 	qry.windowId = winId;
	// 	// }
	// 	return new Promise(resolve => {
	// 		chrome.tabs.query(qry, tabs => {
	// 			resolve(tabs[0]);
	// 		});
	// 	});
	// };
}

export default Client;
