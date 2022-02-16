import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserSettingsForm from "../UserSettingsForm";
import { User, DefaultPrivacyLevel, UserSettingsPayload } from "../../models";

const mockFuncionUpdate = jest.fn();
const userProfileSend: UserSettingsPayload = {
  firstName: "José",
  lastName: "Silva",
  email: "jose@teste.com",
  phoneNumber: "625-316-9882",
  defaultPrivacyLevel: DefaultPrivacyLevel.contacts,
};

const userProfile: User = {
  id: "123456",
  uuid: "123456",
  username: "joseSilva",
  password: "123456",
  balance: 9000000000,
  avatar: "teste",
  createdAt: new Date(),
  modifiedAt: new Date(),
  ...userProfileSend,
};

const MockUserForm = () => {
  return <UserSettingsForm userProfile={userProfile} updateUser={mockFuncionUpdate} />;
};

describe("User settings", () => {
  it("should render value input", () => {
    render(<MockUserForm />);
    const firstNameElement = screen.getByPlaceholderText(/First name/i);
    expect(firstNameElement).toHaveValue(userProfile.firstName);

    const lastNameElement = screen.getByPlaceholderText(/Last name/i);
    expect(lastNameElement).toHaveValue(userProfile.lastName);

    const emailElement = screen.getByPlaceholderText(/Email/i);
    expect(emailElement).toHaveValue(userProfile.email);

    const phoneNumberElement = screen.getByPlaceholderText(/Phone number/i);
    expect(phoneNumberElement).toHaveValue(userProfile.phoneNumber);
  });

  it("should update values", async () => {
    render(<MockUserForm />);
    const buttonElement = screen.getByRole("button", { name: "Save" });
    await waitFor(() => userEvent.click(buttonElement));

    await waitFor(() =>
      expect(mockFuncionUpdate).toHaveBeenCalledWith({ id: "123456", ...userProfileSend })
    );
  });
});
