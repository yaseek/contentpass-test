'use strict';

const storage = require('./storage');
const {
  allValuesOf,
  isNotNil
} = require('./utils');

class Paragraph {
  slug = null;

  constructor (slug) {
    this.slug = slug;
  }

  async fetch () {
    return await storage.get(this.slug);
  }

  async create (numSentences) {
    if (numSentences === undefined) {
      throw new Error('invalid data');
    }
    
    await storage.set(this.slug, {
      complete: false,
      sentences: Array(numSentences).fill(null)
    });
  }

  async delete () {
    if (!await storage.remove(this.slug)) {
      throw new Error('Undefined paragraph');
    }
  }

  async addSentence (idx, sentence) {
    try {
      const data = await this.fetch();
      const {sentences } = data;
      if (idx < 0 || idx >= sentences.length) {
        throw new Error('Invalid sentence index');
      }
      sentences[idx] = sentence;
      data.complete = allValuesOf(sentences, isNotNil);
      await storage.set(this.slug, data);
    } catch (error) {
      throw error;
    }
  }

  async deleteSentence (idx) {
    try {
      const data = await this.fetch();
      const {sentences } = data;
      if (idx < 0 || idx >= sentences.length) {
        throw new Error('Invalid sentence index');
      }
      sentences[idx] = null;
      data.complete = allValuesOf(sentences, isNotNil);
      await storage.set(this.slug, data);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Paragraph;
