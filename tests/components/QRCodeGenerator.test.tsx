// tests/components/QRCodeGenerator.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import QRCodeGenerator from "../../components/QRCodeGenerator";

test("renders QRCodeGenerator and handles input", () => {
  render(<QRCodeGenerator />);
  
  const input = screen.getByPlaceholderText("Enter text or URL");
  fireEvent.change(input, { target: { value: "https://example.com" } });

  expect(screen.getByText("QR Code Generator")).toBeInTheDocument();
  expect(screen.getByText("https://example.com")).toBeInTheDocument();
});
