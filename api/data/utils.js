'use strict';

const isNil = (value) => value === undefined || value === null;

const isNotNil = (value) => !isNil(value);

const allValuesOf = (iterable, predicate) => {
  for (const value of iterable) {
    if (!predicate(value)) {
      return false;
    }
  }
  return true;
}

module.exports = {
  isNil,
  isNotNil,
  allValuesOf,
}
