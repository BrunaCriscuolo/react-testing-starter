import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TransactionCreateStepTwo from "./TransactionCreateStepTwo";

// TESTES UNITÁRIOS DA TELA

// test("On initial render, the pay button is disabled", async () => {
//   render(<TransactionCreateStepTwo receiver={{ id: "3" }} sender={{ id: "5" }} />);
//   expect(await screen.findByRole("button", { name: /pay/i })).toBeDisabled();
// });

// test("if an amount and note is entered, the pay button becomes enabled", async () => {
//   render(<TransactionCreateStepTwo receiver={{ id: "3" }} sender={{ id: "5" }} />);
//   userEvent.type(screen.getByPlaceholderText(/amount/i), "50");
//   userEvent.type(screen.getByPlaceholderText(/add a note/i), "dinner");

//   expect(await screen.findByRole("button", { name: /pay/i })).toBeEnabled();
// });

// TESTE DE INTEGRAÇÃO
//Lembrando que juntar varios teste unitários não é o mesmo que teste de integração.

test("if an amount and note is entered, the pay button becomes enabled", async () => {
  render(<TransactionCreateStepTwo receiver={{ id: "3" }} sender={{ id: "5" }} />);

  expect(await screen.findByRole("button", { name: /pay/i })).toBeDisabled();
  userEvent.type(screen.getByPlaceholderText(/amount/i), "50");
  userEvent.type(screen.getByPlaceholderText(/add a note/i), "dinner");

  expect(await screen.findByRole("button", { name: /pay/i })).toBeEnabled();
});
