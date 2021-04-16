'use strict';

const storage = new Map();

const get = async (slug) => {
  if (!storage.has(slug)) {
    throw new Error('Not found');
  }

  return storage.get(slug);
}

const set = async (slug, data) => {
  storage.set(slug, data);
};

const remove = async (slug) => storage.delete(slug);

module.exports = {
  get,
  set,
  remove,
};
