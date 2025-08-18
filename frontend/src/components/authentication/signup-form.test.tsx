"use client"

import {describe, it, expect, vi, beforeEach} from "vitest"
import userEvent from "@testing-library/user-event"
import {render, screen, waitFor} from "@testing-library/react"
import SignupForm from "./signup-form"
import type {SignUpFormData} from "../../lib/validation"

describe("SignupForm", () => {
    const mockSignupSubmit = vi.fn<(data: SignUpFormData) => void>()

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it("renders all form fields", () => {
        render(<SignupForm onSubmit={mockSignupSubmit}/>)

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument()
        expect(screen.getByRole("button", {name: /create account/i})).toBeInTheDocument()
    })

    it("disables submit button when confirmPassword is empty", async () => {
        render(<SignupForm onSubmit={vi.fn()}/>)

        const passwordInput = screen.getByLabelText(/^password$/i)
        const submitButton = screen.getByRole("button", {name: /create account/i})

        await userEvent.type(passwordInput, "ValidPassword1!")

        expect(submitButton).toBeDisabled()
    })

    it("disables submit button when passwords do not match", async () => {
        render(<SignupForm onSubmit={vi.fn()}/>)

        const passwordInput = screen.getByLabelText(/^password$/i)
        const confirmPasswordInput = screen.getByLabelText(/^confirm password$/i)
        const submitButton = screen.getByRole("button", {name: /create account/i})

        await userEvent.type(passwordInput, "ValidPassword1!")
        await userEvent.type(confirmPasswordInput, "DifferentPassword1!")

        expect(submitButton).toBeDisabled()
    })

    it("enables submit button when passwords match", async () => {
        render(<SignupForm onSubmit={vi.fn()}/>)

        const passwordInput = screen.getByLabelText(/^password$/i)
        const confirmPasswordInput = screen.getByLabelText(/^confirm password$/i)
        const submitButton = screen.getByRole("button", {name: /create account/i})

        await userEvent.type(passwordInput, "ValidPassword1!")
        await userEvent.type(confirmPasswordInput, "ValidPassword1!")

        expect(submitButton).toBeEnabled()
    })
})

describe("SignupForm password validation", () => {
    const mockSignupSubmit = vi.fn()

    beforeEach(() => {
        vi.clearAllMocks()
    })

    const setup = () => {
        const user = userEvent.setup()
        render(<SignupForm onSubmit={mockSignupSubmit}/>)
        return user
    }

    const passwordCases = [
        {
            password: "short",
            checks: {
                "At least 8 characters": false,
                "Uppercase letter": false,
                "Lowercase letter": true,
                Number: false,
                "Special character": false,
            },
            label: "fails all except lowercase",
        },
        {
            password: "longpassword",
            checks: {
                "At least 8 characters": true,
                "Uppercase letter": false,
                "Lowercase letter": true,
                Number: false,
                "Special character": false,
            },
            label: "only lowercase + length",
        },
        {
            password: "Password",
            checks: {
                "At least 8 characters": true,
                "Uppercase letter": true,
                "Lowercase letter": true,
                Number: false,
                "Special character": false,
            },
            label: "upper + lower + length",
        },
        {
            password: "Password1",
            checks: {
                "At least 8 characters": true,
                "Uppercase letter": true,
                "Lowercase letter": true,
                Number: true,
                "Special character": false,
            },
            label: "upper + lower + number + length",
        },
        {
            password: "Password1!",
            checks: {
                "At least 8 characters": true,
                "Uppercase letter": true,
                "Lowercase letter": true,
                Number: true,
                "Special character": true,
            },
            label: "strong password (all checks)",
        },
    ]

    passwordCases.forEach(({password, checks, label}) => {
        it(`validates password requirements correctly for: ${label}`, async () => {
            const user = setup()

            const passwordInput = screen.getByLabelText(/^password$/i)

            await user.clear(passwordInput)
            await user.type(passwordInput, password)

            await waitFor(() => {
                Object.entries(checks).forEach(([requirement, shouldPass]) => {
                    const requirementElement = screen.getByText(requirement)

                    if (shouldPass) {
                        expect(requirementElement).toHaveClass("text-green-600")
                    } else {
                        expect(requirementElement).toHaveClass("text-muted-foreground")
                    }
                })
            })
        })
    })
})