import HDKey from 'ethereumjs-wallet/dist/hdkey';
const bip39 = require('bip39');

const generateMnemonic = (strength = 128) => bip39.generateMnemonic(strength);
const getEntropy = (phrase) => bip39.mnemonicToEntropy(phrase);
const entropyToMnemonic = (entropy) => bip39.entropyToMnemonic(entropy);
const mnemonicToSeed = (phrase, password) => bip39.mnemonicToSeedSync(phrase, password);
const generateWallet = (mnemonic, index, password) => {
    const seed = mnemonicToSeed(mnemonic, password);
    const hdwallet = HDKey.fromMasterSeed(seed);
    const path = `m/44'/60'/0'/0/${index}`;
    return hdwallet.derivePath(path).getWallet();
};

export {
    generateMnemonic,
    getEntropy,
    entropyToMnemonic,
    mnemonicToSeed,
    generateWallet
};
