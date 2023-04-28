/// <reference types="cypress" />
describe('User Form Page', () => {
  it('render User Form page', () => {
    cy.visit('/userform');

    cy.get('#firstname').should('exist').should('not.have.value');
    cy.get('#lastname').should('exist').should('not.have.value');
    cy.get('#birthday').should('exist').should('not.have.value');
    cy.get('#male').should('exist').should('not.be.checked');
    cy.get('#female').should('exist').should('not.be.checked');
    cy.get('#image').should('exist').should('not.have.value');
    cy.get('#country').should('exist').should('not.have.value');
    cy.get('#personal-data').should('exist').should('not.be.checked');

    cy.get('#firstname-error-msg').should('not.have.text');
    cy.get('#lastname-error-msg').should('not.have.text');
    cy.get('#birthday-error-msg').should('not.have.text');
    cy.get('#gender-error-msg').should('not.have.text');
    cy.get('#image-error-msg').should('not.have.text');
    cy.get('#country-error-msg').should('not.have.text');
    cy.get('#personal-data-error-msg').should('not.have.text');

    cy.contains('SUBMIT').click();
    cy.get('#firstname-error-msg')
      .should('be.visible')
      .should('have.text', 'First name is mandatory');
    cy.get('#lastname-error-msg')
      .should('be.visible')
      .should('have.text', 'Last name is mandatory');
    cy.get('#birthday-error-msg')
      .should('be.visible')
      .should('have.text', 'Date of birth is mandatory');
    cy.get('#gender-error-msg').should('be.visible').should('have.text', 'Gender is mandatory');
    cy.get('#image-error-msg').should('be.visible').should('have.text', 'Photo is mandatory');
    cy.get('#country-error-msg')
      .should('be.visible')
      .should('have.text', 'You have to choose country');
    cy.get('#personal-data-error-msg')
      .should('be.visible')
      .should('have.text', 'You have to consent to continue');

    cy.get('#personal-data').check({ force: true });
    cy.get('#personal-data-error-msg').should('not.have.text');
    cy.get('#male').check({ force: true });
    cy.get('#gender-error-msg').should('not.have.text');
    cy.get('#country').select(1);
    cy.get('#country-error-msg').should('not.have.text');
    cy.fixture('photo.png').as('myPhoto');
    cy.get('#image').selectFile('@myPhoto');
    cy.get('#image-error-msg').should('not.have.text');
    cy.get('#birthday').type('2022-01-01');
    cy.get('#birthday-error-msg').should('not.have.text');
    cy.get('#firstname').type('Oryngali');
    cy.get('#lastname').type('Karimzhan');
    cy.get('#firstname-error-msg').should('not.have.text');
    cy.get('#lastname-error-msg').should('not.have.text');

    cy.get('#success-msg').should('be.hidden');

    cy.contains('SUBMIT').click();
    cy.get('#success-msg')
      .should('be.visible')
      .should('have.text', 'user has been created successfully');

    cy.get('[data-testid="card"]').should('exist');

    cy.get('[href="/about"]').click();
    cy.get('[href="/userform"]').click();

    cy.get('[data-testid="card"]').should('exist');
  });
});
