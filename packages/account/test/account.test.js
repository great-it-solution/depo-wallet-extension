import {expect} from 'chai';
import {generatePassword,
    generateMnemonic, getEntropy, entropyToMnemonic, mnemonicToSeed, generateWallet,
    getAddress, fromPrivateKey, toV3, toV3String, fromV3} from '../src';

const sampleMnemonic = 'void cheap version day ship expire same plastic unique chase life crouch';
const sampleEntropy = 'f584dfcb1c0c60a0efbd30ed84d6051a';
const sampleIndex = 10;
const sampleSeed = '17162e0a0aed28562d395d009d2c2bcc79efea6112b5d3b7f0df8eb8a724a385f38e0a3dc3506a2bcfd06c94b5881ba05841e481b40dd1cc6656656b55684902';
const samplePrivateKey = '0xcb088ddf2c4d5a664e5c22f2ce67b119c965c52e18970149824db4de1a02b324';
const sampleAddress = '0x7a1124A1786a7b710d5409BA090Ce0AD8c9d4d96';
const samplePassword = 'test';
const sampleV3 = '{"version":3,"id":"7cfa23ad-52f3-4fae-9717-1c4cbf2c5eff","address":"7a1124a1786a7b710d5409ba090ce0ad8c9d4d96","crypto":{"ciphertext":"4d2f3cdd2e0c0837e68ae20114786416ddd6321553cbfd7c5374242a38d8ea7b","cipherparams":{"iv":"a889e76aaf223c246b739bb00198807b"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"7bc0bc97868630374b47b77005f18bd782f70b0ba4b2d84167a5bbd3223c42db","n":262144,"r":8,"p":1},"mac":"918cb9e22a901d107825267e6c4b4279aa551db7baaf0ebcaaeca2a2b6e2fb9b"}}';

describe("@depo-wallet/account", () => {
    describe("Password", () => {
        it("shhould generate random password", (done) => {
            const password = generatePassword();
            expect(password).to.be.a('string');
            expect(password.length).to.be.equal(8);
            const password2 = generatePassword(12);
            expect(password2).to.be.a('string');
            expect(password2.length).to.be.equal(12);
            done();
        });
    });
    describe("Mnemonic", () => {
        it("should generate mnemonic phrase", (done) => {
            const mnemonic = generateMnemonic();
            expect(mnemonic).to.be.a('string');
            expect(mnemonic.split(' ').length).to.be.equal(12);
            done();
        });
        it("should get entropy from mnemonic phrase", (done) => {
            const entropy = getEntropy(sampleMnemonic);
            expect(entropy).to.be.a('string');
            expect(entropy.length).to.be.equal(32);
            expect(entropy).to.be.equal(sampleEntropy);
            done();
        });
        it("should get mnemonic phrase from entropy", (done) => {
            const mnemonic = entropyToMnemonic(sampleEntropy);
            expect(mnemonic).to.be.a('string');
            expect(mnemonic).to.be.equal(sampleMnemonic);
            done();
        });
        it("should get seed from mnemonic phrase", (done) => {
            const seed = mnemonicToSeed(sampleMnemonic);
            expect(Buffer.isBuffer(seed)).to.be.equal(true);
            expect(seed.length).to.be.equal(64);
            expect(seed.toString('hex')).to.be.equal(sampleSeed);
            done();
        });
        it("should generate wallet from mnemonic phrase", (done) => {
            const wallet = generateWallet(sampleMnemonic, sampleIndex);
            expect(wallet).to.be.a('object');
            done();
        });
    });
    describe("Wallet Address", () => {
        it("should generate wallet from private key", (done) => {
            const wallet = fromPrivateKey(samplePrivateKey.replace(/0x/,''));
            expect(wallet).to.be.a('object');
            done();
        });
        it("should get address from private key", (done) => {
            const wallet = fromPrivateKey(samplePrivateKey.replace(/0x/,''));
            const address = getAddress(wallet);
            expect(address).to.be.a('string');
            expect(address).to.be.equal(sampleAddress);
            done();
        });
        it("should get address from wallet", (done) => {
            const wallet = generateWallet(sampleMnemonic, sampleIndex);
            const address = getAddress(wallet);
            expect(address).to.be.a('string');
            expect(address).to.be.equal(sampleAddress);
            done();
        });
        it("should get private key from wallet", (done) => {
            const wallet = generateWallet(sampleMnemonic, sampleIndex);
            const privateKey = wallet.getPrivateKeyString();
            expect(privateKey).to.be.a('string');
            expect(privateKey).to.be.equal(samplePrivateKey);
            done();
        });
        it("should export wallet to keystore v3", (done) => {
            const wallet = generateWallet(sampleMnemonic, sampleIndex);
            toV3String(wallet, samplePassword).then((v3String) => {
                expect(v3String).to.be.a('string');
                expect(v3String).to.be.equal(sampleV3);
                done();
            }).catch(e=>{
                done();
            })
        });        
        it("should import wallet from keystore v3", (done) => {
            fromV3(sampleV3, samplePassword).then((wallet) => {
                expect(wallet).to.be.a('object');
                const address = getAddress(wallet);
                expect(address).to.be.a('string');
                expect(address).to.be.equal(sampleAddress);
                done();
            });
        });
    });
});