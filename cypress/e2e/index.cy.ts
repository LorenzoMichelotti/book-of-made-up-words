describe('WordCreationModal', () => {
  it('Should open, try to submit and close a modal with the word creation form', () => {
    cy.visit('http://localhost:3000/');
    
    cy.intercept('GET', 'http://localhost:3001/words?page=1&perPage=12').as('words')
    cy.wait('@words')

    cy.get('h1').contains('Book of made up words');
    
    cy.get('input[name="search"]').type('Bereguejohnson');
    
    cy.get('input[name="searchButton"]').click();
    
    cy.wait('@words')
    
    cy.get('h1').contains('Bereguejohnson');
    
    cy.get('button[name*="AddWordButton"]').click();

    const confirmButton = cy.get('input[type*="submit"]').contains('Confirm');
    confirmButton.click();

    cy.get('h2').contains('Cannot submit with empty fields.');
    cy.get('button').contains('OK').click();

    const wordNameInput = cy.get('input[name="wordName"]').type('test');

    cy.get('input[type*="reset"]').click();

    wordNameInput.should('be.empty', 'string');

    cy.get('button[id="closeModal"]').click();

    confirmButton.should('not.be.visible');
  })
})

export {}