    Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function (){
        cy.get('#firstName').type('Bruno')
        cy.get('#lastName').type('Avelar')
        cy.get('#email').type('avelarb90@gmail.com')
        cy.get('#open-text-area').type('Muito satisfeito com o curso', {delay: 0} ) //tempo padrão de digitação é de 10 milisegundos
        cy.contains('button', 'Enviar').click()

    } )