/// <reference types="cypress" />

Cypress.Commands.add('login', () => { 
  cy.log('Iniciando e autenticando');
  cy.visit('/', { timeout: 30000 });
  cy.intercept('GET', '**/login**').as('login');
  cy.intercept('GET', '**/signin-callback**').as('signinCallback');
  cy.intercept('GET', 'http://localhost:3000/inicio').as('inicio');
  cy.intercept('GET', '**/.well-known/openid-configuration**').as('wellKnown');
  cy.intercept('POST', '**/api/auth/token').as('authToken');
  cy.intercept('GET', '**/api/user/info').as('userInfo');
});

Cypress.Commands.add('deveEstarPaginaInicial', () => { 
  cy.wait('@login', { timeout: 30000 });
  cy.wait('@signinCallback', { timeout: 30000 });
  cy.wait(10000);
  cy.location('pathname').should('equal', '/inicio');
  cy.wait(10000);
});

declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>
      deveEstarPaginaInicial(): Chainable<void>
    }
  }
}

// Prevent TypeScript from reading file as legacy script
export {}