// eslint-disable-next-line no-unused-vars
import ReactDOM from 'react-dom';
import Client from '../clients';
import ChromeApi from '../helper/api';
import App from './App';

const client = new Client('popup');
const api = new ChromeApi(client.chrome);
// const Element = document.createElement("div");
// Element.setAttribute("id", "dfghbnjmERHJKFGHNMVBNMFBNMbmvvxnbdgf");
// document.body.appendChild(Element);
ReactDOM.render(<App client={client} api={api} />, document.getElementById('app'));
