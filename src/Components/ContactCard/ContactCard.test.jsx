import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ContactCard from ".";

// Mock contact data
const mockContact = {
  picture: { medium: "profile.jpg" },
  name: { first: "John", last: "Doe" },
  email: "john@example.com",
  phone: "1234567890",
};

// Mock handleClick function
const mockHandleClick = jest.fn();

describe("ContactCard component", () => {
  test("renders contact details correctly", () => {
    // Render the ContactCard component
    const { getByText, getByAltText } = render(
      <ContactCard contact={mockContact} handleClick={mockHandleClick} />
    );

    // Check if contact details are rendered correctly
    expect(getByText("Doe, John")).toBeInTheDocument();
    expect(getByText("john@example.com")).toBeInTheDocument();
    expect(getByText("1234567890")).toBeInTheDocument();

    // Check if profile image is rendered
    expect(getByAltText("Contact Profile")).toBeInTheDocument();
  });

  test("calls handleClick function when clicked", () => {
    // Render the ContactCard component
    const { container } = render(
      <ContactCard contact={mockContact} handleClick={mockHandleClick} />
    );

    // Simulate click event on the ContactCard component
    fireEvent.click(container.firstChild);

    // Check if handleClick function is called
    expect(mockHandleClick).toHaveBeenCalledTimes(1);
  });
});
