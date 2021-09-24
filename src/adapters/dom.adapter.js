/* eslint-disable class-methods-use-this */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
/**
 *
 *
 * @export
 * @class DomAdapter
 * @param {Document} dom
 */
export default class DomAdapter {
  /**
   * Creates an instance of DomAdapter.
   * @memberof DomAdapter
   */
  constructor() {
    this.dom = document;
    this.elements = [];
  }

  /**
   *
   *
   * @param {string} tag
   * @param {ElementCreationOptions | null} options
   * @returns
   * @memberof DomAdapter
   */
  createElement(tag, options) {
    const el = this.dom.createElement(tag, options);
    this.elements.push(el);
    return el;
  }

  /**
   * @param {string} selector
   * @returns
   * @memberof DomAdapter
   */
  queryAll(selector) {
    return this.dom.querySelectorAll(selector);
  }

  /**
   * @param {string} selector
   * @returns
   * @memberof DomAdapter
   */
  query(selector) {
    return this.dom.querySelector(selector);
  }

  /**
   * Calls alert dialog
   *
   * @param {string} message
   * @memberof DomAdapter
   */
  callAlert(message) {
    alert(message);
  }
}
