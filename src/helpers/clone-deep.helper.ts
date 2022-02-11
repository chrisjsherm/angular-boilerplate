import * as lodashCloneDeep from 'lodash.clonedeep';

/**
 * Creates a shallow recursive clone of value.
 * @param value The value to recursively clone.
 * @returns cloned value.
 */
export function cloneDeep<T>(value: T): T {
  return lodashCloneDeep(value);
}
