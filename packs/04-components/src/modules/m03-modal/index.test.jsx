import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";

// The WHOLE ImageGallery mini-app (navbar + gallery home + a second route).
import App from "./index.jsx";
// The feature, imported DIRECTLY so we can drive it in isolation.
import Modal from "./components/Modal.jsx";

function renderApp(initialEntries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  );
}

describe("m03 · ImageGallery — app renders", () => {
  it("renders navbar and the home page", () => {
    renderApp();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
  });

  it("navigates to the Albums route via the navbar", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("nav-albums"));
    expect(await screen.findByTestId("albums-page")).toBeInTheDocument();
  });
});

describe("m03 · ImageGallery — modal feature", () => {
  it("is closed initially and opens on trigger", async () => {
    const user = userEvent.setup();
    render(<Modal />);
    expect(screen.queryByTestId("modal")).toBeNull();
    await user.click(screen.getByTestId("open-btn"));
    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });

  it("closes on close button", async () => {
    const user = userEvent.setup();
    render(<Modal />);
    await user.click(screen.getByTestId("open-btn"));
    await user.click(screen.getByTestId("close-btn"));
    expect(screen.queryByTestId("modal")).toBeNull();
  });

  it("closes on backdrop click but not on content click", async () => {
    const user = userEvent.setup();
    render(<Modal />);
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
    render(<Modal />);
    await user.click(screen.getByTestId("open-btn"));
    await user.keyboard("{Escape}");
    expect(screen.queryByTestId("modal")).toBeNull();
  });
});
