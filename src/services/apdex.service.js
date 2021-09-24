import AppModel from '../domain/app.model';
import HostsModel from '../domain/hosts.model';

export default class ApdexService {
  constructor() {
    this.url = 'https://appdex-json.s3.amazonaws.com/host-app-data.json';
  }

  async getHosts() {
    try {
      const response = await this.getRequest(this.url);
      const data = JSON.parse(response);
      const apps = data.map(
        ({ name, contributors, version, apdex, host }) =>
          new AppModel(name, contributors, version, apdex, host)
      );
      const hosts = new HostsModel(apps);
      return hosts.asArray;
    } catch (error) {
      console.log(`Failed because: ${error}`);
    }
  }

  getRequest(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        }
        reject(xhr.response);
      };
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send();
    });
  }
}
