/// <reference types="cypress" />
describe('Not Found Page', () => {
  it('if unknown route then 404 not found page', () => {
    cy.visit('/not-existing-route');

    cy.get('h1').should('have.text', '404');
    cy.get('h2').should('have.text', 'Страница не найдена');
  });
});
