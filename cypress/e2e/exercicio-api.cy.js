/// <reference types="cypress" />
import contrato from '../contracts/produtos.contract'

describe('Testes da Funcionalidade Usuários', () => {

  it('Deve validar contrato de usuários', () => {
    cy.request('produtos').then(response => {
      return contrato.validateAsync(response.body)
    })
  });

  it('Deve listar usuários cadastrados', () => {
    cy.request({
      method: 'GET',
      url:'usuarios'
    }).should((response) => [
      expect(response.status).equal(200)
    ])
  });

  it('Deve cadastrar um usuário com sucesso', () => {
    const email = `teste_${Date.now()}@mail.com`
    cy.request({
      method:'POST',
      url:'usuarios',
      body:{
             "nome": "Odin Gorducho 1",
             "email": email,
             "password": "gato123",
             "administrador": "true"
           }

    }).should((response) => {
      expect(response.status).equal(201)
    })
  });

  it('Deve validar um usuário com email inválido', () => {
    cy.cadastrarUsuario('Odin Gorducho' , 'odin@gorducho.com' , 'gato123')
       .should((response) => {
        expect(response.status).equal(400)
        expect(response.body.message).equal('Este email já está sendo usado')
       })
  });

  it('Deve editar um usuário previamente cadastrado', () => {
    const email = `odin_${Date.now()}@gorducho.com`
    cy.cadastrarUsuario('Odin Gordão' , email , 'gato123').then(response => {
      let id = response.body._id
      cy.request({
        method: 'PUT',
        url: `usuarios/${id}`,
        body: {
                 "nome": 'Odin Gordão',
                 "email": email,
                 "password": "teste",
                 "administrador": "true"
              }
      }).should((response) => {
        expect(response.status).equal(200)
        expect(response.body.message).equal('Registro alterado com sucesso')
      })
    })
  });

  it('Deve deletar um usuário previamente cadastrado', () => {
    const email = `odin_${Date.now()}@gorducho.com`
    cy.cadastrarUsuario('Odin Gordão' , email , 'gato123').then(response => {
      let id = response.body._id
      cy.request({
        method: 'DELETE',
        url: `usuarios/${id}`,

      }).should((response) => {
        expect(response.status).equal(200)
        expect(response.body.message).to.eq('Registro excluído com sucesso')
      })
    })
  });


});
