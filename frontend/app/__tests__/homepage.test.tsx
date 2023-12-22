import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { HomepageIntro } from "../components/homepage/HomepageIntro";

describe("Home page component", () => {
  it("Will render the correct homepage image and text", () => {
    const fn = jest.fn();
    render(<HomepageIntro setShown={fn} />);
    const image = screen.getByRole("img");
    const text = screen.getByTestId("homepage-text");
    expect(text.textContent).toContain("quiz");
    expect(image).toBeInTheDocument();
  });
});
