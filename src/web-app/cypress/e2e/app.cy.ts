/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

describe('Iniciando aplicação web', () => {
  it('Deve autenticar usuário com sucesso e acessar a pagina inicial com "Bem Vindo!"', () => {
    cy.login();
    cy.deveEstarPaginaInicial();
    cy.get('h1[data-testid="titulo-bem-vindo"]').should('be.visible').contains('Bem vindo!');
  });
});

export {}