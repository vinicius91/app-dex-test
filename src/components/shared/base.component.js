/**
 * @typedef {import('../../adapters/dom.adapter').default} DomAdapter
 */

export default class Component {
  /**
   * Creates an instance of Component.
   * @param {DomAdapter} dom
   * @memberof Component
   */
  constructor(dom, id) {
    this.domAdapter = dom;
    this.rootId = id;
    this.el = null;
  }

  /**
   *
   * @private
   * @param {string} tag
   * @param {string} content
   * @param {string[]} [classlist=null]
   * @param {string} [id=null]
   * @param {HTMLElement[]} children
   * @returns {HTMLElement}
   * @memberof Component
   */
  createElementBase(tag, content = null, classlist = null, id = null, children = null) {
    const el = this.domAdapter.createElement(tag);
    if (content !== null) {
      el.innerHTML = content;
    }
    if (classlist !== null && classlist.length > 0) {
      classlist.forEach(className => el.classList.add(className));
    }
    if (id !== null && id.length > 0) {
      el.id = `${this.rootId}__${id}`;
    }
    if (children !== null && children.length > 0) {
      children.forEach(child => el.appendChild(child));
    }
    return el;
  }

  /**
   *
   * @public
   * @param {string} tag
   * @param {string} content
   * @param {string[]} [classlist=null]
   * @param {string} [id=null]
   * @param {HTMLElement[]} children
   * @returns {HTMLElement}
   * @memberof Component
   */
  createElement(tag, content = null, classlist = null, id = null, children = null) {
    const el = this.createElementBase(tag, content, classlist, id, children);
    this.el = el;
    return el;
  }

  /**
   *
   * @public
   * @param {string} tag
   * @param {string} content
   * @param {string[]} [classlist=null]
   * @param {string} [id=null]
   * @param {HTMLElement[]} children
   * @returns {HTMLElement}
   * @memberof Component
   */
  createChildElement(tag, content = null, classlist = null, id = null, children = null) {
    return this.createElementBase(tag, content, classlist, id, children);
  }

  /**
   * @public
   * @returns {HTMLElement}
   * @readonly
   * @memberof Component
   */
  get htmlNode() {
    return this.el;
  }
}
