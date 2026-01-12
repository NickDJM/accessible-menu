/**
 * @file
 * Provides a utility class for managing transactional values.
 */

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
/* eslint-disable jsdoc/reject-any-type */
class TransactionalValue {
  /**
   * Creates a new TransactionalValue instance.
   *
   * @param {*} initialValue - The starting (and initially committed) value.
   * @param {{ equals?: function(*, *): boolean }} [options] - Optional config.
   * @param {function(*, *): boolean} [options.equals] - Custom equality comparator. Defaults to `Object.is`.
   */
  constructor(initialValue, options = {}) {
    /**
     * A comparator function used to check equality between
     * the current and committed values.
     *
     * @private
     *
     * @type {function(*, *): boolean}
     */
    this._equals = options.equals || Object.is;

    /**
     * The current, editable value.
     *
     * @private
     *
     * @type {*}
     */
    this._current = initialValue;

    /**
     * The last committed (baseline) value.
     *
     * @private
     *
     * @type {*}
     */
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
   * Gets the last committed (baseline) value.
   *
   * @readonly
   *
   * @return {*} The last committed value.
   *
   * @see _committed
   */
  get committed() {
    return this._committed;
  }

  /**
   * Checks whether the current value differs from the committed one.
   *
   * @readonly
   *
   * @return {boolean} `true` if current and committed values differ.
   */
  get isDirty() {
    return !this._equals(this._current, this._committed);
  }

  /**
   * Commits the current value, setting it as the new baseline.
   *
   * @return {TransactionalValue} The current instance.
   */
  commit() {
    this._committed = this._current;
    return this;
  }

  /**
   * Resets the current value to the committed baseline.
   *
   * @return {TransactionalValue} The current instance.
   */
  reset() {
    this._current = this._committed;
    return this;
  }

  /**
   * Applies a functional update to the current value.
   *
   * @param {function(*): *} fn - A function that receives the previous value and returns the new one.
   * @return {TransactionalValue} The current instance.
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
