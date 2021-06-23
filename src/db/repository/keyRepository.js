import database from '@/db';

const keyRepository = {
  async create(name, keys, address) {
    const db = await database.getClient();
    let key = {name, keys, address};
    key.id = await db.key.add(key);
    return key;
  },
  async update(key) {
    console.log(key);
    const db = await database.getClient();
    await db.key.update(key, {name: key.name, address: key.address});
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
