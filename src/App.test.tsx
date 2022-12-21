import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, test, expect, vi } from "vitest";
import App from "./App";
import { Endpoint } from "./services/types";

describe("Login page", () => {
  beforeEach(() => {
    vi.spyOn(global, "fetch");
    render(<App />);
  });

  test("should render login button", () => {
    expect(screen.getByRole("button").textContent).toBe("Login");
  });

  test("should render username input", () => {
    expect(screen.getByRole("textbox")).toBeDefined();
  });

  test("should click login button", () => {
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.findByText("he")).toBe("");
  });
});

async function mockFetch(url: RequestInfo | URL, init: any): Promise<Response> {
  if (typeof url === "string" && url.includes(Endpoint.AUTHORIZE)) {
    return {
      ok: true,
      status: 200,
      json: async () => "123",
    } as Response;
  }
  return {} as Response;
}
