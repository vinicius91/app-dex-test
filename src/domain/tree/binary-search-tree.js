import BinarySearchTreeNode from './binary-search-tree-node';

/**
 * @typedef {import('../app.model').default} AppModel
 */

export default class BinarySearchTree {
  /**
   * @param {function} [nodeValueCompareFunction]
   */
  constructor(nodeValueCompareFunction) {
    this.root = new BinarySearchTreeNode(null, nodeValueCompareFunction);

    // Steal node comparator from the root.
    this.nodeComparator = this.root.nodeComparator;
  }

  /**
   * @param {AppModel} value
   * @return {BinarySearchTreeNode}
   */
  insert(value) {
    return this.root.insert(value);
  }

  /**
   * @param {AppModel} value
   * @return {boolean}
   */
  contains(value) {
    return this.root.contains(value);
  }

  /**
   * @param {AppModel} value
   * @returns {AppModel | null}
   * @memberof BinarySearchTree
   */
  find(value) {
    const node = this.root.find(value);
    return node ? node.value : null;
  }

  /**
   * @param {*} value
   * @return {boolean}
   */
  remove(value) {
    return this.root.remove(value);
  }

  /**
   * @return {string}
   */
  toString() {
    return this.root.toString();
  }
}
