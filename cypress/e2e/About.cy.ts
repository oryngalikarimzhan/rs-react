/// <reference types="cypress" />
describe('About Page', () => {
  it('render about page', () => {
    cy.visit('/about');

    cy.get('h1').should('have.text', 'ABOUT US');
  });
});
