import {TonClient} from "@tonclient/core";
import {tonException} from '@/api/exception/tonException';
import {Base64} from 'js-base64';

const _ = {
  getException: (e) => {
    let code, message;
    if (typeof e.code !== 'undefined' && typeof e.message !== 'undefined') {
      code = e.code;
      message = e.message;
    } else {
      console.error(e);
      code = null;
      message = 'Unknown TON error';
    }
    return new tonException(code, message);
  },
};

const ton = {
  clients: [],
  seedPhraseDictionaryEnglish: 1,
  hdPath: "m/44'/396'/0'/0/0",
  getClient(server) {
    let endpoints;
    switch (server) {
      case 'main.ton.dev':
        endpoints = ['main2.ton.dev', 'main3.ton.dev', 'main4.ton.dev'];
        break;
      case 'net.ton.dev':
        endpoints = ['net1.ton.dev', 'net5.ton.dev'];
        break;
      default:
        endpoints = [server];
    }

    for (const client of this.clients) {
      if (client.config.network.endpoints[0] === endpoints[0]) {
        return client;
      }
    }
    const client = new TonClient({
      network: {endpoints}
    });
    this.clients.push(client);

    return client;
  },
  base64ToHex(str) {
    const bin = atob(str.replace(/[ \r\n]+$/, ""));
    let hex = [];
    for (let i = 0; i < bin.length; ++i) {
      let tmp = bin.charCodeAt(i).toString(16);
      if (tmp.length === 1) tmp = "0" + tmp;
      hex[hex.length] = tmp;
    }
    return hex.join('');
  }
};

export default {
  serverDefault: 'main.ton.dev',
  async getClient(server) {
    return ton.getClient(server);
  },
  // async generateSeed(server) {
  //   try {
  //     const client = await ton.getClient(server);
  //     return (await client.crypto.mnemonic_from_random({
  //       dictionary: ton.seedPhraseDictionaryEnglish,
  //       word_count: 12,
  //     })).phrase;
  //   } catch (e) {
  //     throw _.getException(e);
  //   }
  // },
  async convertSeedToKeys(server, seed) {
    try {
      const client = await ton.getClient(server);
      const worldCount = seed.match(/[^\s-.]+/g).length === 12 ? 12 : 24;
      return await client.crypto.mnemonic_derive_sign_keys({
        dictionary: ton.seedPhraseDictionaryEnglish,
        word_count: worldCount,
        phrase: seed,
        path: ton.hdPath
      });
    } catch (e) {
      throw _.getException(e);
    }
  },
  async sha256(server, data) {
    const client = await ton.getClient(server);
    return (await client.crypto.sha256({data: Base64.encode(data)})).hash;
  },
  async chacha20Encrypt(server, data, password) {
    try {
      const client = await ton.getClient(server);
      const key = await this.sha256(server, password);

      const randomBytesBase64 = (await client.crypto.generate_random_bytes({length: 12})).bytes;
      const nonce = ton.base64ToHex(randomBytesBase64);

      const dataBase64 = Base64.encode(data);
      const resultOfChaCha20 = await client.crypto.chacha20({data: dataBase64, key, nonce});

      return {data: resultOfChaCha20.data, nonce};
    } catch (e) {
      throw _.getException(e);
    }
  },
  async chacha20Decrypt(server, data, nonce, password) {
    try {
      const client = await ton.getClient(server);
      const key = await this.sha256(server, password);
      const decryptedData = (await client.crypto.chacha20({data, key, nonce})).data;
      return Base64.decode(decryptedData);
    } catch (e) {
      throw _.getException(e);
    }
  },
}



