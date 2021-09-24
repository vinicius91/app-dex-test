/// <reference types="Cypress" />

describe('The Cards Page', () => {
  it('successfully loads', () => {
    cy.server();
    cy.route('https://appdex-json.s3.amazonaws.com/host-app-data.json').as('fetchData');
    cy.visit('/');
    cy.wait('@fetchData').then(xhr => {
      expect(xhr.status).to.eq(200);
    });
  });

  it('have 10 cards in grid ', () => {
    cy.get('.card__grid').should('have.length', 10);
  });

  it('have 5 apps in each card', () => {
    const cardElements = cy.get('.card__body').within(() => {
      cy.get('.card__item__line').should('have.length', 50);
    });
  });

  it('click on checkbox and change grid to list', () => {
    const checkbox = cy.get('#new-relic-apdex__toggle-checkbox');
    checkbox.click();
    cy.get('.card').should('have.length', 10);
    cy.get('.card__grid').should('have.length', 0);
  });

  it('click on checkbox again change list to grid', () => {
    const checkbox = cy.get('#new-relic-apdex__toggle-checkbox');
    checkbox.click();
    cy.get('.card__grid').should('have.length', 10);
  });
});
