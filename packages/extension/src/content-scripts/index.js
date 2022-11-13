import ReactDOM from 'react-dom';
import App from './App';
import Client from '../clients';
import ChromeApi from '../helper/api';
import Constants from '../../constants';

const client = new Client();
const api = new ChromeApi(client.chrome);
window.document.body.addEventListener('click', (event) => {
	client.request('click', {clickData: {x: event.clientX, y: event.clientY}}).then(r => {
		console.log('DepoWallet test. Rensponse from backgroundscript:', r);
	});
});

const mountId = Constants.contentScript.mountId;
const Element = window.document.createElement('div');
Element.setAttribute('id', mountId);
document.body.appendChild(Element);
ReactDOM.render(<App clinet={client} api={api} />, document.getElementById(mountId));
