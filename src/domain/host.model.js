import Model from './model.base';
import BinarySearchTree from './tree/binary-search-tree';

/**
 * @typedef {import('./app.model').default} AppModel
 */

/**
 * @export
 * @class HostModel
 * @extends {Model}
 */
export default class HostModel extends Model {
  /**
   * Creates an instance of HostModel.
   * @param {string} domain
   * @memberof HostModel
   */
  constructor(domain) {
    super('HostModel');
    this.setDomain(domain);
    this.tree = new BinarySearchTree();
    this.topAppsList = [];
  }

  /**
   * @param {string} domain
   * @returns {void}
   * @throws {Error}
   * @memberof HostModel
   */
  setDomain(domain) {
    if (HostModel.isValidString(domain, 3, 255)) {
      this.domain = domain;
      return;
    }
    HostModel.throwError('Invalid Domain');
  }

  /**
   * Insert an app in the binary search tree
   *
   * @param {AppModel} newApp
   * @memberof HostModel
   */
  insertApp(newApp) {
    this.tree.insert(newApp);
  }

  /**
   * Find an app in the tree
   *
   * @param {AppModel} app
   * @returns {AppModel}
   * @memberof HostModel
   */
  findApp(app) {
    return this.tree.find(app);
  }

  /**
   * Updates the Top 25 Apps in the Host
   *
   * @memberof HostModel
   */
  sortHostTopApps() {
    const orderedApps = this.tree.root.traverseInOrder();
    this.topAppsList = orderedApps.splice(orderedApps.length - 25).reverse();
  }

  /**
   * Insert an App in the Host
   *
   * @param {AppModel} toBeInsertedApp
   * @memberof HostModel
   */
  addAppToHost(toBeInsertedApp) {
    this.tree.insert(toBeInsertedApp);
    this.sortHostTopApps();
  }

  /**
   * Remove an App from the host
   *
   * @memberof HostModel
   */
  removeAppFromHost(toBeRemovedApp) {
    this.tree.remove(toBeRemovedApp);
    this.sortHostTopApps();
  }

  getOrderedApps() {
    return this.tree.root.traverseInOrder();
  }

  /**
   * Returns the top 25 apps from this host
   * @returns {AppModel[]}
   * @readonly
   * @memberof HostModel
   */
  get topApps() {
    if (this.topAppsList.length < 25) {
      this.sortHostTopApps();
    }
    return this.topAppsList;
  }
}
