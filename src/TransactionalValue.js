/**
 * @file
 * Provides a utility class for managing transactional values.
 */

/* eslint-disable jsdoc/reject-any-type */

/**
 * A utility class that maintains a "current" value and a "committed" value.
 *
 * @example
 * // Managing a form field
 * const username = new TransactionalValue("Nick");
 * username.value = "NickDJM";
 * if (username.isDirty) {
 *   console.log("Unsaved changes detected");
 *   username.commit(); // saves the new value
 * }
 *
 * @example
 * // Reverting edits
 * const counter = new TransactionalValue(10);
 * counter.value = 15;
 * counter.reset(); // reverts to 10
 */
class TransactionalValue {
  /**
   * A comparator function used to check equality between
   * the current and committed values.
   *
   * @protected
   *
   * @type {function(*, *): boolean}
   */
  _equals = Object.is;

  /**
   * The current, editable value.
   *
   * @protected
   *
   * @type {*}
   */
  _current;

  /**
   * The last committed (baseline) value.
   *
   * @protected
   *
   * @type {*}
   */
  _committed;

  /**
   * Creates a new TransactionalValue instance.
   *
   * @param {*}                       initialValue                 - The starting (and initially committed) value.
   * @param {object}                  [options = {}]               - Options for configuring the instance.
   * @param {function(*, *): boolean} [options.equals = Object.is] - Custom equality comparator. Defaults to `Object.is`.
   */
  constructor(initialValue, { equals = Object.is } = {}) {
    this._equals = equals || Object.is;
    this._current = initialValue;
    this._committed = initialValue;
  }

  /**
   * Gets the current editable value.
   *
   * @return {*} The current value.
   *
   * @see _current
   */
  get value() {
    return this._current;
  }

  /**
   * Sets the current editable value.
   *
   * @param {*} val - The new value.
   */
  set value(val) {
    this._current = val;
  }

  /**
   * Gets the last committed value.
   *
   * @readonly
   *
   * @type {*}
   *
   * @see _committed
   */
  get committed() {
    return this._committed;
  }

  /**
   * Checks whether the current value differs from the committed one.
   *
   * Will be `true` if the values are different, `false` otherwise.
   *
   * @readonly
   *
   * @type {boolean}
   */
  get isDirty() {
    return !this._equals(this._current, this._committed);
  }

  /**
   * Commits the current value, setting it as the new baseline.
   *
   * @return {TransactionalValue} - The current instance.
   */
  commit() {
    this._committed = this._current;
    return this;
  }

  /**
   * Resets the current value to the committed baseline.
   *
   * @return {TransactionalValue} - The current instance.
   */
  reset() {
    this._current = this._committed;
    return this;
  }

  /**
   * Applies a functional update to the current value.
   *
   * @param  {function(*): *}     fn - A function that receives the previous value and returns the new one.
   * @return {TransactionalValue}    - The current instance.
   *
   * @example
   * const t = new TransactionalValue(1);
   * t.update(n => n + 1); // 2
   */
  update(fn) {
    this._current = fn(this._current);
    return this;
  }
}

export default TransactionalValue;
