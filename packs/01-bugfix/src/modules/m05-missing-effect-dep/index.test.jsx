import { describe, it, expect } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "./index.jsx";

// Mount the WHOLE WeatherDash app (navbar + city picker + weather panel +
// pages), exactly like a user would see it. The only thing broken is that the
// weather panel doesn't refetch when you pick a different city — a missing
// useEffect dependency in components/WeatherPanel.jsx.
function renderApp() {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );
}

describe("m05 · WeatherDash — refetch on city change (missing effect dep)", () => {
  it("app renders: navbar + home page + weather panel are visible", () => {
    renderApp();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    expect(screen.getByTestId("weather-panel")).toBeInTheDocument();
  });

  it("shows the first city's weather on load", async () => {
    renderApp();
    // Default city is London → 14°C, Cloudy.
    expect(await screen.findByTestId("weather-temp")).toHaveTextContent("14");
    expect(screen.getByTestId("weather-condition")).toHaveTextContent("Cloudy");
  });

  it("navigates to the favorites page via the navbar", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("nav-favorites"));
    expect(await screen.findByTestId("favorites-page")).toBeInTheDocument();
    expect(screen.getAllByTestId("favorite-row").length).toBeGreaterThan(0);
  });

  it("updates the shown temperature when a different city is selected", async () => {
    const user = userEvent.setup();
    renderApp();

    // London on load.
    expect(await screen.findByTestId("weather-temp")).toHaveTextContent("14");

    // Pick Tokyo → 22°C.
    await user.selectOptions(screen.getByTestId("city-select"), "tokyo");

    await waitFor(() =>
      expect(screen.getByTestId("weather-temp")).toHaveTextContent("22")
    );
  });

  it("updates the shown condition when a different city is selected", async () => {
    const user = userEvent.setup();
    renderApp();

    expect(await screen.findByTestId("weather-condition")).toHaveTextContent(
      "Cloudy"
    );

    // Pick Cairo → "Hot".
    await user.selectOptions(screen.getByTestId("city-select"), "cairo");

    await waitFor(() =>
      expect(screen.getByTestId("weather-condition")).toHaveTextContent("Hot")
    );
  });
});
