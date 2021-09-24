import { isArray, isString } from 'util';

export default class Model {
  /**
   * Creates an instance of Model.
   * @param {string} className
   * @memberof Model
   */
  constructor(className) {
    this.className = className;
  }

  /**
   * Throw an error with customized message
   *
   * @param {string} message
   * @returns {void}
   * @memberof Model
   */
  throwError(message) {
    throw new Error(`Error while creating ${this.className}: ${message}`);
  }

  /**
   * Compare two arrays of primitive types
   *
   * @static
   * @param {[]} first
   * @param {[]} second
   * @returns {bool}
   * @memberof Model
   */
  static compareArrays(first, second) {
    if (first.length !== second.length) {
      return false;
    }
    let isEqual = true;
    first.forEach(firstItem => {
      if (!second.some(secondItem => secondItem === firstItem)) {
        isEqual = false;
      }
    });
    return isEqual;
  }

  /**
   * Verify if object is an array
   * and has items in it
   *
   * @static
   * @param {any} array
   * @returns {bool}
   * @memberof Model
   */
  static isValidArray(array) {
    return isArray(array) && array.length > 0;
  }

  /**
   * Verify if number is an integer
   * and optionaly can verify if it is
   * at an specific range
   *
   * @static
   * @param {any} number
   * @param {number} [min=null]
   * @param {number} [max=null]
   * @returns {bool}
   * @memberof Model
   */
  static isValidInteger(number, min = null, max = null) {
    if (!Number.isInteger(number)) {
      return false;
    }
    if (min !== null && number < min) {
      return false;
    }
    if (max !== null && number > max) {
      return false;
    }
    return true;
  }

  /**
   * Verify if object is a string
   * and optionaly if its length
   * is within a specified range
   *
   * @static
   * @param {any} name
   * @param {number} [minLength=null]
   * @param {number} [maxLenght=null]
   * @returns {bool}
   * @memberof Model
   */
  static isValidString(name, minLength = null, maxLenght = null) {
    if (!name && !isString(name)) {
      return false;
    }
    if (minLength !== null && name.length < minLength) {
      return false;
    }
    if (maxLenght !== null && name.length > maxLenght) {
      return false;
    }
    return true;
  }
}
