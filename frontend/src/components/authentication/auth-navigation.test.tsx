import AuthNavigation from "./auth-navigation.tsx";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

describe("AuthNavigation", () => {
    it("renders the application name", () => {
        render(<AuthNavigation />);

        expect(screen.getByText("Nybbler")).toBeInTheDocument();
    });

    it("renders theme toggle button", () => {
        render(<AuthNavigation />);

        const themeButton = screen.getByRole("button", { name: /toggle theme/i });
        expect(themeButton).toBeInTheDocument();
    });

    it("has proper navigation structure", () => {
        render(<AuthNavigation />);

        const nav = screen.getByRole("navigation");
        expect(nav).toHaveClass("fixed", "top-0", "left-0", "right-0", "z-50");
    });
});
