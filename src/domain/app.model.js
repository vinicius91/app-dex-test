import Model from './model.base';

/**
 * @export
 * @class AppModel
 * @extends {Model}
 */
export default class AppModel extends Model {
  /**
   * Creates an instance of AppModel.
   * @param {string} name App name
   * @param {string[]} contributors Arrays of contributors names
   * @param {number} version App version number
   * @param {number} apdex App apdex score
   * @param {string[]} hosts Array of hosts domain names
   * @returns {AppModel}
   * @memberof AppModel
   */
  constructor(name, contributors, version, apdex, hosts) {
    super('AppModel');
    this.setName(name);
    this.setContributors(contributors);
    this.setVersion(version);
    this.setApdex(apdex);
    this.setHosts(hosts);
  }

  /**
   * @param {string} name
   * @returns {void}
   * @throws {Error}
   * @memberof AppModel
   */
  setName(name) {
    if (AppModel.isValidString(name, 3, 255)) {
      this.name = name;
      return;
    }
    this.throwError('Invalid Name');
  }

  /**
   * @param {string[]} contributors
   * @returns {void}
   * @throws {Error}
   * @memberof AppModel
   */
  setContributors(contributors) {
    if (AppModel.isValidArray(contributors)) {
      this.contributors = contributors;
      return;
    }
    this.throwError('Invalid Contributors');
  }

  /**
   * @param {number} version
   * @returns {void}
   * @throws {Error}
   * @memberof AppModel
   */
  setVersion(version) {
    if (AppModel.isValidInteger(version, 0)) {
      this.version = version;
      return;
    }
    this.throwError('Invalid Version');
  }

  /**
   * @param {number} apdex
   * @returns {void}
   * @throws {Error}
   * @memberof AppModel
   */
  setApdex(apdex) {
    if (AppModel.isValidInteger(apdex, 0, 100)) {
      this.apdex = apdex;
      return;
    }
    this.throwError('Invalid Apdex');
  }

  /**
   * @param {string[]} hosts
   * @returns {void}
   * @throws {Error}
   * @memberof AppModel
   */
  setHosts(hosts) {
    if (AppModel.isValidArray(hosts)) {
      this.hosts = hosts;
      return;
    }
    this.throwError('Invalid Hosts');
  }

  /**
   *
   *
   * @static
   * @param {AppModel} appA
   * @param {AppModel} appB
   * @returns {number}
   * @memberof AppModel
   */
  static comparator(appA, appB) {
    if (!appA) {
      return -1;
    }

    if (!appB) {
      return 1;
    }

    if (appA.name === appB.name) {
      return 0;
    }

    if (appA.apdex === appB.apdex) {
      return appA.name < appB.name ? -1 : 1;
    }

    return appA.apdex < appB.apdex ? -1 : 1;
  }
}
