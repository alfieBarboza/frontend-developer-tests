
/// <reference types="Cypress" />

describe('Cypress', () => {
    it('opens the app', () => {
        cy.visit('http://localhost:3000')
    })

    it('checks country list items are greater than 1', () => {
        cy.get('.country-list')
            .find('li')
            .its('length').should('be.gte', 1)
    })

    it('checks country list items have class "country"', () => {
        cy.get('.country-list > li')
            .then((listItem) => {
                expect(listItem).to.have.class('country');
            })
    })

    it('clicks the first country on the list and checks users are shown', () => {
        cy.get('.country-list > li:first')
            .click()
            .get('.user-list')
            .should('be.visible')
            .get('.gender-filter')
            .should('be.visible')
    })

    it('clicks the first country on the list twice and checks users are NOT shown', () => {
        cy.get('.country-list > li:first')
            .click()
            .get('.user-list')
            .should('be.visible')


        cy.get('.country-list > li:first > span')
            .click()
            .get('.user-list')
            .should('not.exist')
    })
})