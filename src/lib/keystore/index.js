import tonSdkLib from "@/api/ton";
import keystoreException from "@/lib/keystore/keystoreException";
import store from "@/store";

const _ = {
  async restoreV1(server, keystore, password) {
    const isKeystoreStructValid = typeof keystore.Crypto === 'object'
      && typeof keystore.Crypto.ciphertext === 'string'
      && typeof keystore.Crypto.cipherparams === 'object'
      && typeof keystore.Crypto.cipherparams.nonce === 'string'
      && typeof keystore.public === 'string'
      && null !== keystore.public.match(/^[a-f0-9]{64}$/g);
    if (!isKeystoreStructValid) {
      throw new keystoreException(store.state.i18n.t('keystore.invalidFile'));
    }

    let secret;
    try {
      secret = await tonSdkLib.chacha20Decrypt(server, keystore.Crypto.ciphertext, keystore.Crypto.cipherparams.nonce, password);
    } catch (e) {
      console.error(e);
      throw new keystoreException(store.state.i18n.t('keystore.corrupted'));
    }

    if (null === secret.match(/^[a-f0-9]{64}$/g)) {
      throw new keystoreException(store.state.i18n.t('keystore.invalidPassword'));
    }

    return {
      public: keystore.public,
      secret,
    };
  }
}

export default {
  async encrypt(server, keys, password) {
    const chacha20 = await tonSdkLib.chacha20Encrypt(server, keys.secret, password);
    return {
      version: 1,
      public: keys.public,
      Crypto: {
        cipher: 'chacha20',
        cipherparams: {nonce: chacha20.nonce},
        ciphertext: chacha20.data,
      }
    };
  },
  async decrypt(server, keystore, password) {
    switch (keystore.version) {
      case 1:
        return await _.restoreV1(server, keystore, password);
      default:
        throw new keystoreException(store.state.i18n.t('keystore.unknownVersion'));
    }
  }
};
