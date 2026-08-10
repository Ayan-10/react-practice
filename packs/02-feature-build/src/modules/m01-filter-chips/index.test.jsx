import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterChips from "./index.jsx";

// Fallback data used by the module:
//   a1 Beach House  — Miami, USA   — rating 5 — [WiFi, Pool, Parking]
//   a2 Mountain Cabin — Manali, India — rating 4 — [WiFi, Fireplace]
//   a3 City Loft    — London, UK    — rating 3 — [WiFi, Gym, Pool]
//   a4 Desert Villa — Jaipur, India — rating 5 — [Pool, Parking, AC]

const cards = () => screen.queryAllByTestId("apartment-card");

describe("Filter chips — core flow", () => {
  it("renders all apartments and generates amenity, country and rating chips", () => {
    render(<FilterChips />);
    expect(cards()).toHaveLength(4);
    // amenities
    expect(screen.getByTestId("filter-chip-wifi")).toBeInTheDocument();
    expect(screen.getByTestId("filter-chip-pool")).toBeInTheDocument();
    // countries
    expect(screen.getByTestId("filter-chip-usa")).toBeInTheDocument();
    expect(screen.getByTestId("filter-chip-india")).toBeInTheDocument();
    expect(screen.getByTestId("filter-chip-uk")).toBeInTheDocument();
    // ratings 3+,4+,5+ all relevant
    expect(screen.getByTestId("filter-chip-3")).toBeInTheDocument();
    expect(screen.getByTestId("filter-chip-4")).toBeInTheDocument();
    expect(screen.getByTestId("filter-chip-5")).toBeInTheDocument();
  });

  it("filters by a single amenity chip", async () => {
    const user = userEvent.setup();
    render(<FilterChips />);
    await user.click(screen.getByTestId("filter-chip-pool")); // a1,a3,a4 have Pool
    expect(cards()).toHaveLength(3);
  });

  it("filters by country", async () => {
    const user = userEvent.setup();
    render(<FilterChips />);
    await user.click(screen.getByTestId("filter-chip-india")); // a2,a4
    expect(cards()).toHaveLength(2);
  });

  it("filters by rating threshold", async () => {
    const user = userEvent.setup();
    render(<FilterChips />);
    await user.click(screen.getByTestId("filter-chip-5")); // a1,a4 have rating>=5
    expect(cards()).toHaveLength(2);
  });

  it("applies AND logic across categories", async () => {
    const user = userEvent.setup();
    render(<FilterChips />);
    await user.click(screen.getByTestId("filter-chip-pool"));  // a1,a3,a4
    await user.click(screen.getByTestId("filter-chip-india")); // ∩ india => a4
    expect(cards()).toHaveLength(1);
    expect(screen.getByText("Desert Villa")).toBeInTheDocument();
  });

  it("toggles a chip off when clicked twice", async () => {
    const user = userEvent.setup();
    render(<FilterChips />);
    await user.click(screen.getByTestId("filter-chip-india"));
    expect(cards()).toHaveLength(2);
    await user.click(screen.getByTestId("filter-chip-india"));
    expect(cards()).toHaveLength(4);
  });

  it("shows Clear All only when a filter is active and resets on click", async () => {
    const user = userEvent.setup();
    render(<FilterChips />);
    expect(screen.queryByTestId("clear-all")).not.toBeInTheDocument();
    await user.click(screen.getByTestId("filter-chip-india"));
    expect(screen.getByTestId("clear-all")).toBeInTheDocument();
    await user.click(screen.getByTestId("clear-all"));
    expect(cards()).toHaveLength(4);
    expect(screen.queryByTestId("clear-all")).not.toBeInTheDocument();
  });

  it("marks an active chip with an 'active' class", async () => {
    const user = userEvent.setup();
    render(<FilterChips />);
    const chip = screen.getByTestId("filter-chip-wifi");
    await user.click(chip);
    expect(chip.className).toMatch(/active/);
  });
});
