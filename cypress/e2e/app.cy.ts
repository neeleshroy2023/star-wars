describe("Star wars - Main", () => {
  it("should display the character details page", () => {
    cy.visit("/");
    cy.wait(5000)
    cy.contains("Luke Skywalker");
  });

    it("should display the details page", () => {
        cy.visit("/");
        cy.wait(5000)
        cy.get('a').first().click();
        cy.wait(2000)
        cy.contains("blue");
    });

    it("Come back to character listing", () => {
        cy.visit("/");
        cy.wait(5000)
        cy.get('a').first().click();
        cy.wait(2000)
        cy.contains("blue");
        cy.get('button').click();
        cy.wait(5000)
        cy.contains("Luke Skywalker");
    });
});
