import Dexie from "dexie";

const DB_NAME = 'db11';

const _ = {
  client: null,
  setSchema: function (db) {
    db.version(1).stores({
      param: '&key, value',
      key: '++id, name, keys, address',
    });
  },
  fillInitial: async function (db) {
    await db.transaction('rw', db.param, db.key, async function () {
      await db.param.bulkAdd([
        {key: 'language', value: 'en'},
        {key: 'themeId', value: 1},
        {key: 'isFirstLook', value: true},
      ]);
      await db.key.bulkAdd([
        {
          id: 1,
          name: 'Test (password: 123)',
          keys: {
            "version": 1,
            "public": "426868ad6776b9614593682302bcfabf2b2e8edd8ca29850477e9e3f478f3efd",
            "Crypto": {
              "cipher": "chacha20",
              "cipherparams": {"nonce": "968e18427b506a92563c24a2"},
              "ciphertext": "q3tk7AUEOD1D0wMDnUdA7w1GbB2FuGwzMjWoVkBZsCh2+e77m1ZXECeKMZXghg8ZcGxu9se9+lkUDrHnF6oA2g=="
            }
          },
          address: null
        },
      ]);
    });
  },
};

export default {
  getClient: async function () {
    if (null === _.client) {
      const isInited = await Dexie.exists(DB_NAME);
      const db = new Dexie(DB_NAME);
      _.setSchema(db);
      await db.open();
      if (!isInited) {
        await _.fillInitial(db);
      }
      _.client = db;
    }
    return _.client;
  },
};
