const { v4: uuidv4 } = require("uuid");
describe("payment", () => {
  it("user can make payment", () => {
    //login
    cy.visit("/");
    cy.findByRole("textbox", { name: /username/i }).type("johndoe");
    cy.findByLabelText(/password/i).type("s3cret");
    cy.findByRole("checkbox", { name: /remember me/i }).check();
    cy.findByRole("button", { name: /sign in/i }).click();
    // check account balance
    let oldBalance;
    cy.get("[data-test=sidenav-user-balance]").then(($balance) => (oldBalance = $balance.text()));
    // click on the new button
    cy.findByText(/new/i).click();
    //search for user
    cy.findByRole("textbox").type("devon");
    cy.findByText(/devon/i).click();
    // add amount and note click pay
    const paymentAmount = "2.00";
    cy.findByPlaceholderText(/amount/i).type(paymentAmount);
    const note = uuidv4();
    cy.findByPlaceholderText(/add a note/i).type(note);
    cy.findByRole("button", { name: /pay/i }).click();
    // return to transactions
    cy.findByRole("button", { name: /return to transactions/i }).click();
    //go to pesonal payments
    cy.findByRole("tab", { name: /mine/i }).click();
    // click on paymnent
    cy.findByText(note).click({ force: true }); // Necessário forçar o click dado que a lista de informações ainda não carregou ou o componente está escondido
    // verify if payment was made
    cy.findByText(`-$${paymentAmount}`).should("be.visible");
    cy.findByText(note).should("be.visible");
    // verify is payment amount was deducted
    cy.get("[data-test=sidenav-user-balance]").then(($balance) => {
      const convertedOldBalance = parseFloat(oldBalance.replace(/\$|,/g, ""));
      const convertedNewBalance = parseFloat($balance.text().replace(/\$|,/g, ""));
      expect(convertedOldBalance - convertedNewBalance).to.equal(parseFloat(paymentAmount));
    });
  });
});
