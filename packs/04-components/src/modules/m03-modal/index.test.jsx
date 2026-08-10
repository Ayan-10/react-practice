import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import ModalDemo from "./index.jsx";

describe("m03 — modal", () => {
  it("is closed initially and opens on trigger", async () => {
    const user = userEvent.setup();
    render(<ModalDemo />);
    expect(screen.queryByTestId("modal")).toBeNull();
    await user.click(screen.getByTestId("open-btn"));
    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });

  it("closes on close button", async () => {
    const user = userEvent.setup();
    render(<ModalDemo />);
    await user.click(screen.getByTestId("open-btn"));
    await user.click(screen.getByTestId("close-btn"));
    expect(screen.queryByTestId("modal")).toBeNull();
  });

  it("closes on backdrop click but not on content click", async () => {
    const user = userEvent.setup();
    render(<ModalDemo />);
    await user.click(screen.getByTestId("open-btn"));

    // Clicking the modal content does NOT close.
    await user.click(screen.getByTestId("modal"));
    expect(screen.getByTestId("modal")).toBeInTheDocument();

    // Clicking the backdrop closes.
    await user.click(screen.getByTestId("backdrop"));
    expect(screen.queryByTestId("modal")).toBeNull();
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    render(<ModalDemo />);
    await user.click(screen.getByTestId("open-btn"));
    await user.keyboard("{Escape}");
    expect(screen.queryByTestId("modal")).toBeNull();
  });
});
