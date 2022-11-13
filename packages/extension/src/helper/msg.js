const requestField = {
	requestId: 'ri',
	requestType: 'rt',
	requestParams: 'rp',
};
const responseField = {
	response: 'r',
	error: 'e',
};

const messageType = {
	request: 'i',
	response: 'o',
};

const messageField = {
	type: 't',
	...requestField,
	...responseField,
};

export {messageField, messageType};
