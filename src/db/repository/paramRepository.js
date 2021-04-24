import database from '@/db';

const paramRepository = {
  async createOrUpdate(key, value) {
    const db = await database.getClient();
    const param = await db.param.get(key);
    if (typeof param === 'undefined') {
      await db.param.add({key, value});
    } else {
      await db.param.update(key, {value});
    }
  },
  async getParam(key) {
    const db = await database.getClient();
    const param = await db.param.get(key);
    return typeof param === 'undefined' ? null : param.value;
  },
  async getAll() {
    const db = await database.getClient();
    const params = await db.param.toArray();
    let result = {};
    for (const param of params) {
      result[param.key] = param.value;
    }
    return result;
  },
};

export {
  paramRepository,
};
