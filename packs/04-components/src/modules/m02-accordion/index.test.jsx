import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";

// The WHOLE FaqPage mini-app (navbar + accordion home + a second route).
import App from "./index.jsx";
// The feature, imported DIRECTLY so we can drive it in isolation.
import Accordion from "./components/Accordion.jsx";

function renderApp(initialEntries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  );
}

describe("m02 · FaqPage — app renders", () => {
  it("renders navbar and the home page", () => {
    renderApp();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
  });

  it("navigates to the Contact route via the navbar", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("nav-contact"));
    expect(await screen.findByTestId("contact-page")).toBeInTheDocument();
  });
});

const items = [
  { id: "s1", title: "One", body: "Body one" },
  { id: "s2", title: "Two", body: "Body two" },
];

describe("m02 · FaqPage — accordion feature", () => {
  it("starts with all panels closed", () => {
    render(<Accordion items={items} />);
    expect(screen.queryByTestId("panel-s1")).toBeNull();
    expect(screen.queryByTestId("panel-s2")).toBeNull();
  });

  it("opens a panel on header click", async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);
    await user.click(screen.getByTestId("header-s1"));
    expect(screen.getByTestId("panel-s1")).toHaveTextContent("Body one");
  });

  it("single mode: opening one closes the other", async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);
    await user.click(screen.getByTestId("header-s1"));
    await user.click(screen.getByTestId("header-s2"));
    expect(screen.queryByTestId("panel-s1")).toBeNull();
    expect(screen.getByTestId("panel-s2")).toBeInTheDocument();
  });

  it("multi mode: both can be open", async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} multi />);
    await user.click(screen.getByTestId("header-s1"));
    await user.click(screen.getByTestId("header-s2"));
    expect(screen.getByTestId("panel-s1")).toBeInTheDocument();
    expect(screen.getByTestId("panel-s2")).toBeInTheDocument();
  });
});
