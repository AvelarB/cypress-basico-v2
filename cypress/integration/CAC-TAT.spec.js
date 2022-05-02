// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach (function(){
        cy.visit('./src/index.html')
    })
        it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatórios e envia o formulário', function() {
     cy.get('#firstName').type('Bruno')
     cy.get('#lastName').type('Avelar')
     cy.get('#email').type('avelarb90@gmail.com')
     cy.get('#open-text-area').type('Muito satisfeito com o curso', {delay: 0} ) //tempo padrão de digitação é de 10 milisegundos
     cy.contains('button', 'Enviar').click()
     cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Bruno')
        cy.get('#lastName').type('Avelar')
        cy.get('#email').type('avelarb90@gmail,com')
        cy.get('#open-text-area').type('Muito satisfeito com o curso') 
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('campo de telefone continua vazio quando preenchido com valor não-numérico', function(){
        cy.get('#phone')
        .type('abcde')
        .should('have.value', '') //ha.value para confirmar se ha valor, strings vazias para confirmar se não foi digitado nada no campo
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Bruno')
        cy.get('#lastName').type('Avelar')
        cy.get('#email').type('avelarb90@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Muito satisfeito com o curso') 
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName').type('Bruno')
        .should('have.value', 'Bruno')
        .clear()
        .should('have.value', '')
        cy.get('#lastName').type('Avelar')
        .should('have.value', 'Avelar')
        .clear()
        .should('have.value', '')
        cy.get('#email').type('avelarb90@gmail.com')
        .should('have.value', 'avelarb90@gmail.com')
        .clear()
        .should('have.value', '')
        cy.get('#phone').type('11960124745')
        .should('have.value', '11960124745')
        .clear()
        .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('button', 'Enviar').click() //contains é usado na falta de um seletor css especifico, mas o elemento tem um texto unico
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function (){
        cy.get('#product')
        .select('youtube')
        .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function (){
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
        .should('have.length', 3) // conta quantos elementos tem 
        .each(function($radio){ // each passa por cada um dos elementos
            cy.wrap($radio).check() //wrap "empacota" tudo e marca sequencialmente todos os elemento radio
            cy.wrap($radio).should('be.checked')
        })
    })

        it('marca ambos checkboxes, depois desmarca o último', function() {
            cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
        })

        it('seleciona um arquivo da pasta fixtures', function() {
            cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
        })
        
        it('seleciona um arquivo simulando um drag-and-drop', function() {
            cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop'})
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
        })

        it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
            cy.fixture('example.json').as('sampleFile')
            cy.get('input[type="file"]')
             .selectFile('@sampleFile')
             .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
        })

        it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
                cy.get('#privacy a').should('have.attr', 'target', '_blank')
        })

        it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
            cy.get('#privacy a')
                .invoke('removeAttr', 'target')
                .click()
            cy.contains('Talking About Testing').should('be.visible')
        })

        


  })


  
       