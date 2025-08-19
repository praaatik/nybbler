"use client";

import { describe, it, expect, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import AuthToggle from "./auth-toggle.tsx";
import { render, screen } from "@testing-library/react";

describe("AuthToggle", () => {
    const mockOnToggle = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders signin mode text and button", () => {
        render(<AuthToggle mode="signin" onToggle={mockOnToggle} />);

        expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
    });

    it("renders signup mode text and button", () => {
        render(<AuthToggle mode="signup" onToggle={mockOnToggle} />);

        expect(screen.getByText("Already have an account?")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
    });

    it("calls onToggle with signup when in signin mode", async () => {
        const user = userEvent.setup();
        render(<AuthToggle mode="signin" onToggle={mockOnToggle} />);

        const signupButton = screen.getByRole("button", { name: /sign up/i });
        await user.click(signupButton);

        expect(mockOnToggle).toHaveBeenCalledWith("signup");
    });

    it("calls onToggle with signin when in signup mode", async () => {
        const user = userEvent.setup();
        render(<AuthToggle mode="signup" onToggle={mockOnToggle} />);

        const signinButton = screen.getByRole("button", { name: /sign in/i });
        await user.click(signinButton);

        expect(mockOnToggle).toHaveBeenCalledWith("signin");
    });

    it("has proper button styling", () => {
        render(<AuthToggle mode="signin" onToggle={mockOnToggle} />);

        const button = screen.getByRole("button", { name: /sign up/i });
        expect(button).toHaveClass("text-primary", "hover:text-primary/80");
    });

    it("is keyboard accessible", async () => {
        const user = userEvent.setup();
        render(<AuthToggle mode="signin" onToggle={mockOnToggle} />);

        const button = screen.getByRole("button", { name: /sign up/i });
        await user.tab();
        expect(button).toHaveFocus();

        await user.keyboard("{Enter}");
        expect(mockOnToggle).toHaveBeenCalledWith("signup");
    });
});
