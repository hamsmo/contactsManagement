import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Header from ".";
import { BrowserRouter } from "react-router-dom";

describe("Header component", () => {
  const mockTitle = "Test Title";
  const mockHandleChange = jest.fn();

  it("renders title correctly", () => {
    const { getByText } = render(
      <BrowserRouter>
        <Header title={mockTitle} />
      </BrowserRouter>
    );
    expect(getByText(mockTitle)).toBeInTheDocument();
  });

  it("renders  search field if handleChange prop is provided", () => {
    const { getByPlaceholderText } = render(
      <BrowserRouter>
        <Header title={mockTitle} handleChange={mockHandleChange} />
      </BrowserRouter>
    );
    expect(getByPlaceholderText("Search for contact")).toBeInTheDocument();
  });

  it("calls handleChange function when input value changes", () => {
    const { getByPlaceholderText } = render(
      <BrowserRouter>
        <Header title={mockTitle} handleChange={mockHandleChange} />
      </BrowserRouter>
    );
    const input = getByPlaceholderText("Search for contact");
    fireEvent.change(input, { target: { value: "test" } });
    expect(mockHandleChange).toHaveBeenCalledTimes(1);
  });

  it("calls handleRoute function when logo is clicked", () => {
    const { getByAltText } = render(
      <BrowserRouter>
        <Header title={mockTitle} />
      </BrowserRouter>
    );
    const logo = getByAltText("Logo");
    fireEvent.click(logo);
  });
});
