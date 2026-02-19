import LoginPage from '../../pages/LoginPage'

describe('OrangeHRM Login Feature - POM with Intercept', () => {

    beforeEach(() => {
        LoginPage.visit()
        cy.wait(2000)
    })

    it('TC-001 - Login valid', () => {

        cy.fixture('loginData').then((data) => {

            cy.intercept('POST', '**/auth/validate').as('loginValid')

            LoginPage.inputUsername(data.validUser.username)
            LoginPage.inputPassword(data.validUser.password)
            LoginPage.clickLogin()

            cy.wait('@loginValid').then((interception) => {
                expect(interception.request.body)
                    .to.include(`username=${data.validUser.username}`)
            })

            LoginPage.verifyDashboard()
        })
    })

    it('TC-002 - Login password salah', () => {

        cy.fixture('loginData').then((data) => {

            cy.intercept('POST', '**/auth/validate').as('wrongPassword')

            LoginPage.inputUsername(data.wrongPassword.username)
            LoginPage.inputPassword(data.wrongPassword.password)
            LoginPage.clickLogin()

            cy.wait('@wrongPassword').then((interception) => {
                expect(interception.request.body)
                    .to.include(`password=${data.wrongPassword.password}`)
            })

            LoginPage.verifyInvalidCredential()
        })
    })

    it('TC-003 - Login username salah', () => {

        cy.fixture('loginData').then((data) => {

            cy.intercept('POST', '**/auth/validate').as('wrongUsername')

            LoginPage.inputUsername(data.wrongUsername.username)
            LoginPage.inputPassword(data.wrongUsername.password)
            LoginPage.clickLogin()

            cy.wait('@wrongUsername').then((interception) => {
                expect(interception.request.body)
                    .to.include(`username=${data.wrongUsername.username}`)
            })

            LoginPage.verifyInvalidCredential()
        })
    })

    it('TC-004 - Login kosong', () => {

        cy.intercept('POST', '**/auth/validate').as('emptyLogin')

        LoginPage.clickLogin()

        cy.get('@emptyLogin.all').should('have.length', 0)

        LoginPage.verifyRequiredMessage()
    })

    it('TC-005 - Login tanpa username', () => {

        cy.fixture('loginData').then((data) => {

            cy.intercept('POST', '**/auth/validate').as('noUsername')

            LoginPage.inputPassword(data.validUser.password)
            LoginPage.clickLogin()

            cy.get('@noUsername.all').should('have.length', 0)

            LoginPage.verifyRequiredMessage()
        })
    })

    it('TC-006 - Login tanpa password', () => {

        cy.fixture('loginData').then((data) => {

            cy.intercept('POST', '**/auth/validate').as('noPassword')

            LoginPage.inputUsername(data.validUser.username)
            LoginPage.clickLogin()

            cy.get('@noPassword.all').should('have.length', 0)

            LoginPage.verifyRequiredMessage()
        })
    })

})
