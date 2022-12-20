/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Login page", () => {
  render(<App />);

  it("should render username input", () => {
    expect(screen.queryByRole("textbox")?.localName).toBe("Login");
    expect(screen.getByRole("button").textContent).toBe("Login");
  });
});
