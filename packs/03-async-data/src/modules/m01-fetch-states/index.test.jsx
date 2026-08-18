import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

// The WHOLE SneakerShop mini-app (navbar + home + product grid + a second
// route), mounted exactly like a user would see it.
import App from "./index.jsx";
// The feature under construction, imported DIRECTLY so we can inject mock
// loaders (deterministic loading/success/empty/error).
import ProductList from "./components/ProductList.jsx";

const sample = [
  { id: 1, title: "Wireless Mouse", price: 25 },
  { id: 2, title: "Keyboard", price: 75 },
];

function renderApp(initialEntries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  );
}

describe("m01 · SneakerShop — app renders", () => {
  it("renders navbar, home page and the product list (default loader)", async () => {
    renderApp();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    // The default local loader resolves asynchronously, so wait for items.
    const items = await screen.findAllByTestId("product-item");
    expect(items.length).toBeGreaterThan(0);
  });

  it("navigates to the Deals route via the navbar", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("nav-deals"));
    expect(await screen.findByTestId("deals-page")).toBeInTheDocument();
  });
});

describe("m01 · SneakerShop — fetch states feature", () => {
  it("shows a loading state initially", () => {
    const load = () => new Promise(() => {}); // never resolves
    render(<ProductList load={load} />);
    expect(screen.getByTestId("loading")).toHaveTextContent(/loading/i);
  });

  it("renders products on success", async () => {
    const load = vi.fn().mockResolvedValue({ products: sample, total: 2 });
    render(<ProductList load={load} />);
    await waitFor(() =>
      expect(screen.getAllByTestId("product-item")).toHaveLength(2)
    );
    expect(screen.queryByTestId("loading")).toBeNull();
  });

  it("shows an empty state when there are no products", async () => {
    const load = vi.fn().mockResolvedValue({ products: [], total: 0 });
    render(<ProductList load={load} />);
    await waitFor(() =>
      expect(screen.getByTestId("empty")).toHaveTextContent(/no products/i)
    );
  });

  it("shows an error state when the request fails", async () => {
    const load = vi.fn().mockRejectedValue(new Error("boom"));
    render(<ProductList load={load} />);
    await waitFor(() =>
      expect(screen.getByTestId("error")).toHaveTextContent(
        /something went wrong/i
      )
    );
    expect(screen.queryByTestId("loading")).toBeNull();
  });
});
