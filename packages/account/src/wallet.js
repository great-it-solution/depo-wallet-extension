import Wallet from 'ethereumjs-wallet';

const getAddress = wallet => wallet.getChecksumAddressString();
const fromPrivateKey = privateKey => typeof privateKey === 'string' ? Wallet.fromPrivateKey(Buffer.from(privateKey, 'hex')) : Wallet.fromPrivateKey(privateKey);
const toV3 = (wallet, password, options) => wallet.toV3(password, options);
const toV3String = (wallet, password, options) => wallet.toV3String(password, options);
const fromV3 = (input, password, options) => Wallet.fromV3(input, password, options);

export {
    getAddress,
    fromPrivateKey,
    toV3,
    toV3String,
    fromV3,
};
