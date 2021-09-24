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

    const testHostDomainA = '7e6272f7-098e.dakota.biz';
    const testHostDomainB = '9a450527-cdd9.kareem.info';
    const testHostDomainC = 'e7bf58af-f0be.dallas.biz';

    const appA = new AppModel('App A', ['Some Guy'], 7, 100, [
      testHostDomainA,
      testHostDomainB,
      testHostDomainC
    ]);

    const appB = new AppModel('App B', ['Some Guy'], 7, 99, [
      testHostDomainA,
      testHostDomainB,
      testHostDomainC
    ]);

    const appC = new AppModel('App C', ['Some Guy'], 7, 98, [testHostDomainB, testHostDomainC]);

    it('will create 10 hosts', () => {
      const hostsArray = hosts.asArray;
      expect(hostsArray.length).to.eq(10);
    });

    it('will add apps to domains', () => {
      hosts.addAppToHosts(appA);
      hosts.addAppToHosts(appB);
      hosts.addAppToHosts(appC);

      const hostA = hosts.findHost(testHostDomainA);
      const hostB = hosts.findHost(testHostDomainB);
      const hostC = hosts.findHost(testHostDomainC);

      expect(hostA.findApp(appA)).to.eq(appA);
      expect(hostA.findApp(appB)).to.eq(appB);
      expect(hostB.findApp(appA)).to.eq(appA);
      expect(hostB.findApp(appB)).to.eq(appB);
      expect(hostC.findApp(appA)).to.eq(appA);
      expect(hostC.findApp(appB)).to.eq(appB);
      expect(hostC.findApp(appC)).to.eq(appC);
    });

    it('Top apps will be updated after the inserts', () => {
      const hostA = hosts.findHost(testHostDomainA);
      const hostB = hosts.findHost(testHostDomainB);
      const hostC = hosts.findHost(testHostDomainC);

      expect(hostA.topApps).to.contain(appA);
      expect(hostA.topApps).to.contain(appB);
      expect(hostB.topApps).to.contain(appA);
      expect(hostB.topApps).to.contain(appB);
      expect(hostC.topApps).to.contain(appA);
      expect(hostC.topApps).to.contain(appB);
      expect(hostC.topApps).to.contain(appC);
    });

    it('Remove apps from its hosts and update top apps', () => {
      hosts.removeAppFromHosts(appA);
      hosts.removeAppFromHosts(appB);
      hosts.removeAppFromHosts(appC);

      const hostA = hosts.findHost(testHostDomainA);
      const hostB = hosts.findHost(testHostDomainB);
      const hostC = hosts.findHost(testHostDomainC);

      expect(hostA.findApp(appA)).to.be.null;
      expect(hostA.findApp(appB)).to.be.null;
      expect(hostB.findApp(appA)).to.be.null;
      expect(hostB.findApp(appB)).to.be.null;
      expect(hostC.findApp(appA)).to.be.null;
      expect(hostC.findApp(appB)).to.be.null;
      expect(hostC.findApp(appC)).to.be.null;

      expect(hostA.topApps).to.not.contain(appA);
      expect(hostA.topApps).to.not.contain(appB);
      expect(hostB.topApps).to.not.contain(appA);
      expect(hostB.topApps).to.not.contain(appB);
      expect(hostC.topApps).to.not.contain(appA);
      expect(hostC.topApps).to.not.contain(appB);
      expect(hostC.topApps).to.not.contain(appC);
    });
  });
});
