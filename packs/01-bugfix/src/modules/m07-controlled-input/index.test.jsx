import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ControlledInput from "./index.jsx";

describe("Profile — controlled inputs", () => {
  it("updates name and email independently and reflects in preview", async () => {
    const user = userEvent.setup();
    render(<ControlledInput />);

    await user.type(screen.getByTestId("name"), "Ayan");
    await user.type(screen.getByTestId("email"), "a@x.com");

    expect(screen.getByTestId("name")).toHaveValue("Ayan");
    expect(screen.getByTestId("email")).toHaveValue("a@x.com");
    expect(screen.getByTestId("preview")).toHaveTextContent("Ayan — a@x.com");
  });
});
