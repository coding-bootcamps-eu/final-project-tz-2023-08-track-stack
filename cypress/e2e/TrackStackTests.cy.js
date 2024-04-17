describe('GreetingsTest', () => {
  it('visit and greets', () => {
    cy.visit('/')
    cy.contains('div', 'Hello Track Stack')
  })
  it('greets of Martin', () => {
    cy.visit('/')
    cy.contains('div', 'Martin')
  })
  it('greets of Irina', () => {
    cy.visit('/')
    cy.contains('div', 'Irina')
  })
  it('greets of Lars', () => {
    cy.visit('/')
    cy.contains('div', 'Lars')
  })
})
