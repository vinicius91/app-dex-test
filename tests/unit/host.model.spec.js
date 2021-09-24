/// <reference types="Cypress" />

import AppModel from '../../src/domain/app.model';
import HostsModel from '../../src/domain/hosts.model';
import Data from '../fixtures/host-app-data.json';

describe('Unit Test Application Code', () => {
  context('host.model.js', () => {
    const apps = Data.map(
      ({ name, contributors, version, apdex, host }) =>
        new AppModel(name, contributors, version, apdex, host)
    );
    const hosts = new HostsModel(apps);

    const testHostDomain = '7e6272f7-098e.dakota.biz';

    const testHost = hosts.findHost(testHostDomain);

    const appA = new AppModel('App A', ['Some Guy'], 7, 100, [testHostDomain]);

    const appB = new AppModel('App B', ['Some Guy'], 7, 99, [testHostDomain]);

    it('will get 25 top apps from host', () => {
      const topAppsArray = testHost.topApps;
      expect(topAppsArray.length).to.eq(25);
    });

    it('will find my inserted top apps', () => {
      expect(testHost.findApp(appA)).to.be.null;
      expect(testHost.findApp(appB)).to.be.null;

      testHost.addAppToHost(appA);
      testHost.addAppToHost(appB);

      expect(testHost.findApp(appA)).to.eq(appA);
      expect(testHost.findApp(appB)).to.eq(appB);

      expect(testHost.topApps).to.contain(appA);
      expect(testHost.topApps).to.contain(appB);
    });

    it('will remove my apps and will not find them', () => {
      testHost.removeAppFromHost(appA);
      testHost.removeAppFromHost(appB);

      expect(testHost.findApp(appA)).to.be.null;
      expect(testHost.findApp(appB)).to.be.null;

      expect(testHost.topApps).to.not.contain(appA);
      expect(testHost.topApps).to.not.contain(appB);
    });
  });
});
