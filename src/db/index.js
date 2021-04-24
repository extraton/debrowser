import Dexie from "dexie";

const DB_NAME = 'db7';

const _ = {
  setSchema: function (db) {
    db.version(1).stores({
      param: '&key, value',
      key: '++id, name, keys',
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
            "public": "c895f9be7b3fa192e8d4a69954cf23d05b6f5c2155fbd1ac5e08a8220259210c",
            "Crypto": {
              "cipher": "chacha20",
              "cipherparams": {"nonce": "ce4ffe1bbb0f9f57e95581ee"},
              "ciphertext": "/SJjgJJde0giMX+bFRn3OoOXSuQ7LHI1l3+Pss8NsOet6LYVhCeuMMiHN9sluK9S1+j4UwU8QpbYU1oVqV/rpQ=="
            }
          },
        },
      ]);
    });
  },
};

export default {
  getClient: async function () {
    const isInited = await Dexie.exists(DB_NAME);
    const db = new Dexie(DB_NAME);
    _.setSchema(db);
    await db.open();
    if (!isInited) {
      await _.fillInitial(db);
    }
    return db;
  },
};
