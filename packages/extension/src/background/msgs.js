import {messageField, messageType} from '../helper/msg';
const requestHandler = {};

const registerRequestHandler = obj => {
	Object.keys(obj).forEach(key => {
		requestHandler[key] = obj[key];
	});
};

const sendResponse = (response, {requestId, client}) => {
	client.port.postMessage({
		[messageField.type]: messageType.response,
		[messageField.requestId]: requestId,
		[messageField.response]: response,
	});
};

const sendErrorResponse = (errorMessage, {requestId, client}) => {
	client.port.postMessage({
		[messageField.type]: messageType.response,
		[messageField.requestId]: requestId,
		[messageField.error]: errorMessage,
	});
};

const handleMessage = (message, sender, client) => {
	const {t: msgType, ...msg} = message;
	const {ri: requestId, rt: requestType, rp: params} = msg;
	if (!msgType) {
		console.log('message type not found: ', message);
		return sendErrorResponse('message type not found', {requestId, client});
	}
	if (msgType === messageType.request) {
		if (!requestType) {
			return sendErrorResponse('request type not found', {requestId, client});
		}
		if (!requestId) {
			return sendErrorResponse('request id not found', {requestId, client});
		}
		if (requestHandler[requestType]) {
			const r = requestHandler[requestType]({requestId, params, sender, client});
			if (r instanceof Promise) {
				r.then(sendResponse).catch(sendErrorResponse);
			} else {
				sendResponse(r, {requestId, client});
			}
		} else {
			sendErrorResponse(`no handler for ${requestType}`, {requestId, client});
		}
	} else {
		console.log('invalid message type: ', msgType);
		sendErrorResponse(`invalid message type: ${msgType}`, {requestId, client});
	}
};

export {handleMessage, registerRequestHandler};
