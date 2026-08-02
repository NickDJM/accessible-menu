/**
 * @file
 * Provides a system to get and store Accessible Menu data in the browser.
 */

import { isValidType } from "./validate.js";

/**
 * Class representing a storage system.
 */
class StorageManager {
  /**
   * The scope of the storage.
   *
   * @protected
   *
   * @type {string}
   */
  _scope;

  /**
   * The type of storage.
   *
   * @protected
   *
   * @type {string}
   */
  _type = "_default";

  /**
   * The storage object.
   *
   * @protected
   *
   * @type {object}
   */
  _storage = {};

  /**
   * Creates a Storage instance.
   *
   * @param {object}  [options = {}]              - The options for the storage.
   * @param {string}  options.scope               - The scope of the storage.
   * @param {?string} [options.type = null]       - The type of storage.
   * @param {boolean} [options.initialize = true] - Whether to initialize the storage.
   */
  constructor({ scope, type = null, initialize = true } = {}) {
    this._scope = scope;
    this._type = type || "_default";

    if (initialize) {
      this.initialize();
    }
  }

  /**
   * Initialize the storage.
   */
  initialize() {
    window[this.scope] = this;
  }

  /**
   * The scope of the storage.
   *
   * @readonly
   *
   * @type {string}
   *
   * @see _scope
   */
  get scope() {
    return this._scope;
  }

  /**
   * The type of storage.
   *
   * @type {string}
   *
   * @see _type
   */
  get type() {
    return this._type;
  }

  set type(type) {
    if (isValidType("string", { type })) {
      this._type = type;
    }
  }

  /**
   * The storage object.
   *
   * @readonly
   *
   * @type {object}
   *
   * @see _storage
   */
  get storage() {
    return this._storage;
  }

  /**
   * Get the storage object.
   *
   * @param  {object}  [options = {}]             - The options for getting the storage.
   * @param  {string}  [options.type = this.type] - The type of storage to get.
   * @param  {?string} [options.key = null]       - The key to get the value from.
   * @return {object}  - The storage object.
   */
  get({ type = this.type, key = null } = {}) {
    const typeCheck = isValidType("string", { type });

    if (!typeCheck.status) {
      throw new Error(`StorageManager (${this.scope}): ${typeCheck.message}`);
    }

    if (!this.storage[type]) {
      throw new Error(
        `StorageManager (${this.scope}): Type "${type}" is not initialized.`
      );
    }

    if (key !== null) {
      const keyCheck = isValidType("string", { key });

      if (!keyCheck.status) {
        throw new Error(`StorageManager (${this.scope}): ${keyCheck.message}`);
      }

      return this.storage[type][key];
    }

    return this.storage[type];
  }

  /**
   * Set the storage object.
   *
   * @param {object}  [options = {}]             - The options for setting the storage.
   * @param {string}  [options.type = this.type] - The type of storage to set.
   * @param {?string} [options.key = null]       - The key to set the value to.
   * @param {object}  [options.data = {}]        - The data to set.
   */
  set({ type = this.type, key = null, data = {} } = {}) {
    const typeCheck = isValidType("string", { type });
    const dataCheck = isValidType("object", { data });

    if (!typeCheck.status) {
      throw new Error(`StorageManager (${this.scope}): ${typeCheck.message}`);
    }

    if (!dataCheck.status) {
      throw new Error(`StorageManager (${this.scope}): ${dataCheck.message}`);
    }

    if (key !== null) {
      const keyCheck = isValidType("string", { key });

      if (!keyCheck.status) {
        throw new Error(`StorageManager (${this.scope}): ${keyCheck.message}`);
      }

      if (!this._storage[type]) {
        this._storage[type] = {};
      }

      this._storage[type][key] = data;
    } else {
      this._storage[type] = data;
    }
  }

  /**
   * Remove a value from the storage object.
   *
   * @param {object}  [options = {}]             - The options for removing from storage.
   * @param {string}  [options.type = this.type] - The type of storage to remove from.
   * @param {?string} [options.key = null]       - The key to remove the value from.
   */
  clear({ type = this.type, key = null } = {}) {
    const typeCheck = isValidType("string", { type });

    if (!typeCheck.status) {
      throw new Error(`StorageManager (${this.scope}): ${typeCheck.message}`);
    }

    if (key !== null) {
      const keyCheck = isValidType("string", { key });

      if (!keyCheck.status) {
        throw new Error(`StorageManager (${this.scope}): ${keyCheck.message}`);
      }

      delete this.storage[type][key];
    } else {
      delete this.storage[type];
    }
  }

  dispose() {
    delete this._storage;
    delete this;
  }
}

export default StorageManager;
