describe('Reqres API - Users Endpoint Automation', () => {

    const baseUrl = 'https://reqres.in/api'

    const headers = {
        'x-api-key': 'reqres_5a1193e31b0c49b9a9d9852e5a759f86',
        'Accept': 'application/json'
    }

    it('TC-001 - Get List Users Page 1', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/users?page=1`,
            headers: headers
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.page).to.eq(1)
            expect(response.body.data.length).to.be.greaterThan(0)
        })
    })

    it('TC-002 - Get List Users Page 2', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/users?page=2`,
            headers: headers
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.page).to.eq(2)
        })
    })

    it('TC-003 - Get Single User ID 2', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/users/2`,
            headers: headers
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.data.id).to.eq(2)
            expect(response.body.data.email).to.include('@reqres.in')
        })
    })

    it('TC-004 - Get User Not Found', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/users/23`,
            headers: headers,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404)
        })
    })

    it('TC-005 - Create New User', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/users`,
            headers: headers,
            body: {
                name: "Acep",
                job: "QA Engineer"
            }
        }).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body.name).to.eq("Acep")
            expect(response.body.job).to.eq("QA Engineer")
            expect(response.body).to.have.property('id')
            expect(response.body).to.have.property('createdAt')
        })
    })

    it('TC-006 - Update User with PUT', () => {
        cy.request({
            method: 'PUT',
            url: `${baseUrl}/users/2`,
            headers: headers,
            body: {
                name: "Acep Updated",
                job: "Senior QA"
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.name).to.eq("Acep Updated")
            expect(response.body.job).to.eq("Senior QA")
            expect(response.body).to.have.property('updatedAt')
        })
    })

    it('TC-007 - Update User with PATCH', () => {
        cy.request({
            method: 'PATCH',
            url: `${baseUrl}/users/2`,
            headers: headers,
            body: {
                job: "Automation QA"
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.job).to.eq("Automation QA")
            expect(response.body).to.have.property('updatedAt')
        })
    })

    it('TC-008 - Delete User', () => {
        cy.request({
            method: 'DELETE',
            url: `${baseUrl}/users/2`,
            headers: headers
        }).then((response) => {
            expect(response.status).to.eq(204)
        })
    })

    it('TC-009 - Validate User Object Structure', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/users/2`,
            headers: headers
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.data).to.have.all.keys(
                'id',
                'email',
                'first_name',
                'last_name',
                'avatar'
            )
        })
    })

})
