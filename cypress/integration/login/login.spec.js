describe('Login my app', function() {
  // beforeEach(() => {
  //   cy.visit('http://localhost:4200');
  // });

  it('Does not do much!', function() {
    cy.visit('http://localhost:4200');
    expect(true).to.equal(true);
  });

  it('login', () => {
    cy.get('[formcontrolname=userName]').type('sistemas@octopus.com.ar');
    cy.get('[formcontrolname=password]').type('123456');
    cy.get('.ant-btn').click();
    cy.get('.ant-notification-notice-close').click();
  });

  it('crear Ingreso', () => {
    cy.get("[ng-reflect-router-link='/caja-consorcio']").click();
    cy.get("button.ant-btn.ant-dropdown-trigger.ant-btn-default").click();
    cy.get('[formcontrolname=descripcion]').type('hola');
  });

  it('Logout', () => {
    cy.get("[ng-reflect-router-link='/gastos']").click();
    cy.get(
      'div.alain-default__nav-item.d-flex.align-items-center.px-sm.ant-dropdown-trigger'
    ).trigger('mouseenter');

    cy.get('[nztype=logout]').click();
  });
});
