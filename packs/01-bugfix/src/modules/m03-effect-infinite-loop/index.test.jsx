import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EffectInfiniteLoop from "./index.jsx";

describe("Filter summary — infinite loop", () => {
  it("does not loop: render count stays low and stable", async () => {
    render(<EffectInfiniteLoop />);
    // Give any runaway loop a chance to blow up.
    await new Promise((r) => setTimeout(r, 50));
    const count = Number(
      screen.getByTestId("render-count").textContent.replace(/\D/g, "")
    );
    // A correct fix runs the effect once on mount (count === 1). The buggy
    // version loops and inflates this well past the threshold.
    expect(count).toBeLessThanOrEqual(2);
  });

  it("updates summary when category changes", async () => {
    const user = userEvent.setup();
    render(<EffectInfiniteLoop />);
    expect(screen.getByTestId("summary")).toHaveTextContent("Showing all over $0");
    await user.selectOptions(screen.getByTestId("category"), "books");
    await waitFor(() =>
      expect(screen.getByTestId("summary")).toHaveTextContent("Showing books over $0")
    );
  });
});
