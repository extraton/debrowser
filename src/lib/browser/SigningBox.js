export default class SigningBox {
  constructor(client, keys) {
    this.client = client;
    this.keys = keys;
    this.public_key = keys.public;
  }

  get_public_key() {
    return {public_key: this.keys.public};
  }

  async sign(params) {
    return (await this.client.crypto.sign({
      keys: this.keys,
      unsigned: params.unsigned,
    }));
  }
}
