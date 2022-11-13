import generateGuid from '../helper/guid';
import chrome from '../helper/chrome';
import {messageField} from '../helper/msg';
import ChromeApi from '../helper/api';
import {handleMessage, registerRequestHandler} from './msgs';

const api = new ChromeApi(chrome);

const clientPorts = {};

function clearClientPort(portId) {
	delete clientPorts[portId];
}

class ClientPort {
	port = null;
	portId = null;
	constructor(portId, port) {
		this.portId = portId;
		this.port = port;
		this.init();
	}
	init = () => {
		this.port.postMessage({[messageField.type]: 'port-id', portId: this.portId});
		this.port.onMessage.addListener(this.onMessage);
		this.port.onDisconnect.addListener(this.onDisconnect);
	};
	onMessage = (message, sender) => {
		console.log('incomming:', message, sender);
		handleMessage(message, sender, this);
	};
	onDisconnect = () => {
		console.log('onDisconnect: ', this.portId);
		clearClientPort(this.portId);
	};
}

class Main {
	constructor() {
		this.init();
		this.clientPorts = {};
	}
	handleConnect = p => {
		const portId = generateGuid();
		clientPorts[portId] = new ClientPort(portId, p);
	};
	registerReqHandler = () => {
		registerRequestHandler({
			click: ({params:{clickData}}) => ({info: 'this is from background script', clickData}),
		});
	};
	init = () => {
		console.log('chrome ===>', chrome);
		this.registerReqHandler();
		chrome.runtime.onConnect.addListener(this.handleConnect);
		chrome.runtime.onInstalled.addListener(({reason}) => {
			if (reason === 'install' && !(process.env.DEPO_DEBUG || process.env.IN_TEST)) {
				api.openExtensionInBrowser();
			}
		});
	};
}

new Main();
