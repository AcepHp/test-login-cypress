class LoginPage {

    visit() {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    }

    inputUsername(username) {
        cy.get('input[name="username"]').clear().type(username)
    }

    inputPassword(password) {
        cy.get('input[name="password"]').clear().type(password)
    }

    clickLogin() {
        cy.get('button[type="submit"]').click()
    }

    verifyDashboard() {
        cy.url().should('include', '/dashboard')
    }

    verifyInvalidCredential() {
        cy.get('.oxd-alert-content-text')
            .should('contain', 'Invalid credentials')
    }

    verifyRequiredMessage() {
        cy.get('.oxd-input-field-error-message')
            .should('contain', 'Required')
    }
}

export default new LoginPage()
