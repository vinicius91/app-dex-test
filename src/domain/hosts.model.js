import Model from './model.base';
import HostModel from './host.model';

/**
 * @typedef {import('./app.model').default} AppModel
 */

/**
 * Class representing a colection of HostModel
 * @export
 * @class HostsModel
 * @extends {Model}
 */
export default class HostsModel extends Model {
  /**
   * Creates an instance of HostsModel.
   * @param {AppModel[]} apps
   * @memberof HostsModel
   * @returns {HostsModel}
   */
  constructor(apps) {
    super('HostsModel');
    this.createHostsFromApps.bind(this);
    this.customMap = new Map();
    this.createHostsFromApps(apps);
  }

  /**
   * Fill the Hosts Map
   * @param {AppModel[]} apps Array of Apps
   * @memberof HostsModel
   */
  createHostsFromApps(apps) {
    if (apps.length > 0) {
      apps.forEach(app => {
        app.hosts.forEach(hostDomain => {
          const host = new HostModel(hostDomain);
          if (this.customMap.has(host.domain)) {
            this.customMap.get(host.domain).insertApp(app);
          } else {
            host.insertApp(app);
            this.customMap.set(hostDomain, host);
          }
        });
      });
    }
  }

  /**
   * Find a host by its domain
   * @param {string} domain Domain of desired Host
   * @returns {HostModel | null}
   * @memberof HostsModel
   */
  findHost(domain) {
    return this.customMap.get(domain);
  }

  /**
   * Get the top 25 Apps from a host
   *
   * @param {string} domain Domain of desired Host
   * @returns {AppModel[] | null}
   * @memberof HostsModel
   */
  getTopAppsByHost(domain) {
    const host = this.findHost(domain);
    if (host !== null) {
      return this.host.topApps;
    }
    return null;
  }

  /**
   * Add App to all of its Hosts
   *
   * @param {AppModel} app
   * @memberof HostsModel
   */
  addAppToHosts(app) {
    app.hosts.forEach(domain => {
      const host = this.findHost(domain);
      if (host !== null) {
        host.addAppToHost(app);
        host.sortHostTopApps();
        this.customMap.delete(host.domain);
        this.customMap.set(host.domain, host);
        host.sortHostTopApps();
      }
    });
  }

  /**
   * Remove App from All Hosts
   *
   * @param {AppModel} app
   * @memberof HostsModel
   */
  removeAppFromHosts(app) {
    app.hosts.forEach(domain => {
      const host = this.findHost(domain);
      host.removeAppFromHost(app);
      this.customMap.delete(host.domain);
      this.customMap.set(host.domain, host);
      host.sortHostTopApps();
    });
  }

  /**
   * Return hosts as an array
   *
   * @readonly
   * @returns {HostModel[]}
   * @memberof HostsModel
   */
  get asArray() {
    const array = [];
    this.customMap.forEach(host => array.push(host));
    return array;
  }
}
