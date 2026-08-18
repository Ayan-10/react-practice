import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "./index.jsx";

// Mount the WHOLE ProfileSettings app (navbar + profile form + account route),
// exactly like a user would see it. The only thing broken is the controlled
// inputs in components/SettingsForm.jsx.
function renderApp(entries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={entries}>
      <App />
    </MemoryRouter>
  );
}

describe("m07 · ProfileSettings — controlled inputs", () => {
  it("app renders: navbar + home page + settings form are visible", () => {
    renderApp();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    expect(screen.getByTestId("name")).toBeInTheDocument();
    expect(screen.getByTestId("email")).toBeInTheDocument();
  });

  it("shows the Account route", () => {
    renderApp(["/account"]);
    expect(screen.getByTestId("account-page")).toBeInTheDocument();
  });

  it("editing the name updates the preview", async () => {
    const user = userEvent.setup();
    renderApp();
    const name = screen.getByTestId("name");
    await user.clear(name);
    await user.type(name, "Grace Hopper");
    expect(name).toHaveValue("Grace Hopper");
    expect(screen.getByTestId("preview")).toHaveTextContent("Grace Hopper");
  });

  // THE BUG TEST — fails on the stub (email is uncontrolled + the change handler
  // writes the wrong field), passes on the fix. Editing name and email must
  // update BOTH fields independently and reflect in the live preview.
  it("edits name and email independently and reflects both in the preview", async () => {
    const user = userEvent.setup();
    renderApp();

    const name = screen.getByTestId("name");
    const email = screen.getByTestId("email");

    await user.clear(email);
    await user.clear(name);
    await user.type(name, "Ayan");
    await user.type(email, "ayan@example.com");

    expect(name).toHaveValue("Ayan");
    expect(email).toHaveValue("ayan@example.com");
    expect(screen.getByTestId("preview")).toHaveTextContent(
      "Ayan — ayan@example.com"
    );
  });

  it("Save records the profile", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("save"));
    expect(screen.getByTestId("saved-msg")).toBeInTheDocument();
  });
});
