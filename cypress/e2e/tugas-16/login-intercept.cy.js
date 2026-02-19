describe('OrangeHRM Login Feature - With Intercept', () => {

    const url = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'

    beforeEach(() => {
        cy.visit(url)
        cy.wait(2000)
    })

    it('TC-001 - Login dengan username dan password valid', () => {

        cy.intercept('POST', '**/auth/validate').as('loginValid')

        cy.get('input[name="username"]').type('Admin')
        cy.get('input[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()

        cy.wait('@loginValid').then((interception) => {
            expect(interception.request.body).to.include('username=Admin')
            expect(interception.request.body).to.include('password=admin123')
        })

        cy.url().should('include', '/dashboard')
    })

    it('TC-002 - Login dengan password salah', () => {

        cy.intercept('POST', '**/auth/validate').as('loginWrongPassword')

        cy.get('input[name="username"]').type('Admin')
        cy.get('input[name="password"]').type('salah123')
        cy.get('button[type="submit"]').click()

        cy.wait('@loginWrongPassword').then((interception) => {
            expect(interception.request.body).to.include('password=salah123')
        })

        cy.get('.oxd-alert-content-text')
            .should('contain', 'Invalid credentials')
    })

    it('TC-003 - Login dengan username salah', () => {

        cy.intercept('POST', '**/auth/validate').as('loginWrongUsername')

        cy.get('input[name="username"]').type('user123')
        cy.get('input[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()

        cy.wait('@loginWrongUsername').then((interception) => {
            expect(interception.request.body).to.include('username=user123')
        })

        cy.get('.oxd-alert-content-text')
            .should('contain', 'Invalid credentials')
    })

    it('TC-004 - Login tanpa mengisi username dan password', () => {

        cy.intercept('POST', '**/auth/validate').as('loginEmpty')

        cy.get('button[type="submit"]').click()

        cy.get('@loginEmpty.all').should('have.length', 0)

        cy.get('.oxd-input-field-error-message')
            .should('contain', 'Required')
    })

    it('TC-005 - Login tanpa username', () => {

        cy.intercept('POST', '**/auth/validate').as('loginNoUsername')

        cy.get('input[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()

        cy.get('@loginNoUsername.all').should('have.length', 0)

        cy.get('.oxd-input-field-error-message')
            .should('contain', 'Required')
    })

    it('TC-006 - Login tanpa password', () => {

        cy.intercept('POST', '**/auth/validate').as('loginNoPassword')

        cy.get('input[name="username"]').type('Admin')
        cy.get('button[type="submit"]').click()

        cy.get('@loginNoPassword.all').should('have.length', 0)

        cy.get('.oxd-input-field-error-message')
            .should('contain', 'Required')
    })

})
