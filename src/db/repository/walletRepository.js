import database from '@/db';

const keyRepository = {
  async create(name, keys) {
    const db = await database.getClient();
    let key = {name, keys};
    key.id = await db.key.add(key);
    return key;
  },
  async remove(id) {
    const db = await database.getClient();
    await db.key.where('id').equals(id).delete();
  },
  async getAll() {
    const db = await database.getClient();
    return db.key.orderBy('id').toArray();
  },
};

export {
  keyRepository,
};
