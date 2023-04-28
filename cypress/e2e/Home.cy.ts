/// <reference types="cypress" />
describe('Home page', () => {
  it('should visit', () => {
    cy.visit('/');

    cy.get('h1').should('have.text', 'MOVIES');
    cy.get('#grid').should('exist');

    cy.get('[data-testid="card"]').should('exist');
    cy.get('#list').should('exist').click();

    cy.get('[role="catalog"]').should('exist');
    cy.get('[data-testid="post"]:first-child').should('exist').click();

    cy.get('[data-testid="postmodal"]').should('exist');

    cy.get('#close-modal').click();
    cy.get('[data-testid="postmodal"]').should('not.exist');

    cy.get('[data-testid="post"]:first-child').click();
    cy.get('[data-testid="postmodal"]').should('exist');

    cy.get('[role="overlay"]').should('exist').click({ force: true });
    cy.get('[data-testid="postmodal"]').should('not.exist');

    cy.get('input[type="search"]').type('superman').should('have.value', 'superman');
    cy.get('[href="/about"]').click();
    cy.get('[href="/"]').click();

    cy.get('input[type="search"]').should('have.value', 'superman');
    cy.get('[role="catalog"]').should('exist');

    cy.get('input[type="search"]').clear();
    cy.get('input[type="search"]').type('batman');
    cy.get('[role="histories" ]').should('not.exist');
    cy.contains('Search').click();
    cy.get('[role="histories" ]').should('exist');
    cy.get('[data-testid="history-item"]').should('exist').should('have.text', 'batman');

    cy.get('input[type="search"]').clear().should('not.have.value');
    cy.get('[data-testid="history-item"]').click();
    cy.get('input[type="search"]').should('have.value', 'batman');
  });
});
