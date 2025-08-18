"use client"

import {describe, it, expect, vi, beforeEach} from "vitest"
import userEvent from "@testing-library/user-event"
import SigninForm from "./signin-form.tsx";
import {render, screen, waitFor} from '@testing-library/react'

describe("SignInForm", () => {
    const mockLoginSubmit = vi.fn()

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it("renders all form fields", () => {
        render(<SigninForm onSubmit={mockLoginSubmit}/>)

        expect(screen.getByLabelText(/email or username/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
        expect(screen.getByRole("button", {name: /sign in/i})).toBeInTheDocument()
    })

    it("shows validation errors for empty fields", async () => {
        const user = userEvent.setup()
        render(<SigninForm onSubmit={mockLoginSubmit}/>)

        const submitButton = screen.getByRole("button", {name: /sign in/i})
        await user.click(submitButton)

        await waitFor(() => {
            expect(screen.getByText(/invalid email/i)).toBeInTheDocument()
            expect(screen.getByText(/password is required/i)).toBeInTheDocument()
        })
    })
    it("validates email format", async () => {
        const user = userEvent.setup()
        render(<SigninForm onSubmit={mockLoginSubmit}/>)

        const emailInput = screen.getByLabelText(/email or username/i)
        await user.type(emailInput, "invalid-email")
        await user.click(screen.getByRole("button", {name: /sign in/i}))

        await waitFor(() => {
            expect(screen.getByText(/invalid email/i)).toBeInTheDocument()
        })
    })

    it("accepts valid email", async () => {
        const user = userEvent.setup()
        render(<SigninForm onSubmit={mockLoginSubmit}/>)

        await user.type(screen.getByLabelText(/email or username/i), "test@example.com")
        await user.type(screen.getByLabelText(/password/i), "password123")
        await user.click(screen.getByRole("button", {name: /sign in/i}))

        await waitFor(() => {
            expect(mockLoginSubmit).toHaveBeenCalledWith({
                email: "test@example.com",
                password: "password123",
            })
        })
    })

    it("toggles password visibility", async () => {
        const user = userEvent.setup()
        render(<SigninForm onSubmit={mockLoginSubmit}/>)

        const passwordInput = screen.getByLabelText(/password/i)
        const toggleButton = screen.getByRole("button", {name: /show password/i})

        expect(passwordInput).toHaveAttribute("type", "password")

        await user.click(toggleButton)
        expect(passwordInput).toHaveAttribute("type", "text")
        expect(screen.getByRole("button", {name: /hide password/i})).toBeInTheDocument()

        await user.click(toggleButton)
        expect(passwordInput).toHaveAttribute("type", "password")
    })

    it("renders forgot password link", () => {
        render(<SigninForm onSubmit={mockLoginSubmit}/>)

        expect(screen.getByRole("button", {name: /forgot password/i})).toBeInTheDocument()
    })
})
