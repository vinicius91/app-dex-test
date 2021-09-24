/// <reference types="Cypress" />

import AppModel from '../../src/domain/app.model';
import Data from '../fixtures/host-app-data.json';

describe('Unit Test Application Code', () => {
  context('app.model.js', () => {
    it('will create 1000 Apps', () => {
      const apps = Data.map(
        ({ name, contributors, version, apdex, host }) =>
          new AppModel(name, contributors, version, apdex, host)
      );
      expect(apps.length).to.eq(10000);
    });

    it('will not create with invalid name', () => {
      try {
        const app = new AppModel('sa', ['John Doe'], 6, 55, ['domainA']);
        console.log(app);
      } catch (error) {
        expect(error.message).to.have.string('AppModel');
        expect(error.message).to.have.string('Invalid Name');
      }
    });

    it('will not create with invalid name', () => {
      try {
        const app = new AppModel('sa', ['John Doe'], 6, 55, ['domainA']);
        console.log(app);
      } catch (error) {
        expect(error.message).to.have.string('AppModel');
        expect(error.message).to.have.string('Invalid Name');
      }
    });

    it('will not create with invalid Contributors', () => {
      try {
        const app = new AppModel('App A', [], 6, 55, ['domainA']);
        console.log(app);
      } catch (error) {
        expect(error.message).to.have.string('AppModel');
        expect(error.message).to.have.string('Invalid Contributors');
      }

      try {
        const app = new AppModel('App A', null, 6, 55, ['domainA']);
        console.log(app);
      } catch (error) {
        expect(error.message).to.have.string('AppModel');
        expect(error.message).to.have.string('Invalid Contributors');
      }
    });

    it('will not create with invalid Version', () => {
      try {
        const app = new AppModel('App A', ['John Doe'], -5, 55, ['domainA']);
        console.log(app);
      } catch (error) {
        expect(error.message).to.have.string('AppModel');
        expect(error.message).to.have.string('Invalid Version');
      }
    });

    it('will not create with invalid Apdex', () => {
      try {
        const app = new AppModel('App A', ['John Doe'], 5, 101, ['domainA']);
        console.log(app);
      } catch (error) {
        expect(error.message).to.have.string('AppModel');
        expect(error.message).to.have.string('Invalid Apdex');
      }

      try {
        const app = new AppModel('App A', ['John Doe'], 5, -50, ['domainA']);
        console.log(app);
      } catch (error) {
        expect(error.message).to.have.string('AppModel');
        expect(error.message).to.have.string('Invalid Apdex');
      }

      try {
        const app = new AppModel('App A', ['John Doe'], 5, null, ['domainA']);
        console.log(app);
      } catch (error) {
        expect(error.message).to.have.string('AppModel');
        expect(error.message).to.have.string('Invalid Apdex');
      }
    });

    it('will not create with invalid Hosts', () => {
      try {
        const app = new AppModel('App A', ['John Doe'], 5, 55, []);
        console.log(app);
      } catch (error) {
        expect(error.message).to.have.string('AppModel');
        expect(error.message).to.have.string('Invalid Hosts');
      }

      try {
        const app = new AppModel('App A', ['John Doe'], 5, 55, null);
        console.log(app);
      } catch (error) {
        expect(error.message).to.have.string('AppModel');
        expect(error.message).to.have.string('Invalid Hosts');
      }
    });
  });
});
