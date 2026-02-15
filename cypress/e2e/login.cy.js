describe('OrangeHRM Login Feature', () => {

  const url = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'

  beforeEach(() => {
    cy.visit(url)
    cy.wait(2000)
  })

  it('TC-001 - Login dengan username dan password valid', () => {

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/dashboard')
    cy.get('.oxd-topbar-header-title').should('contain', 'Dashboard')

  })

  it('TC-002 - Login dengan password salah', () => {

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('salah123')
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-alert-content-text')
      .should('be.visible')
      .and('contain', 'Invalid credentials')

  })

  it('TC-003 - Login dengan username salah', () => {

    cy.get('input[name="username"]').type('user123')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-alert-content-text')
      .should('be.visible')
      .and('contain', 'Invalid credentials')

  })

  it('TC-004 - Login tanpa mengisi username dan password', () => {

    cy.get('button[type="submit"]').click()

    cy.get('.oxd-input-field-error-message')
      .should('contain', 'Required')

  })

  it('TC-005 - Login tanpa username', () => {

    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-input-field-error-message')
      .should('contain', 'Required')

  })

  it('TC-006 - Login tanpa password', () => {

    cy.get('input[name="username"]').type('Admin')
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-input-field-error-message')
      .should('contain', 'Required')

  })


})
