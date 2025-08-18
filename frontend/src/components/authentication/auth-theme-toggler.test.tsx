import {describe, it, expect, vi, beforeEach} from "vitest"
import userEvent from "@testing-library/user-event"
import {render, screen} from '@testing-library/react'
import AuthenticationThemeToggle from "./auth-theme-toggler.tsx";

vi.mock("@/hooks/use-theme", () => ({
    useTheme: () => ({
        mode: "light",
        theme: "bubblegum",
        setMode: vi.fn(),
        setTheme: vi.fn(),
    }),
}))

describe("ThemeToggle", () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it("renders theme toggle button on the authentication pages", () => {
        render(<AuthenticationThemeToggle/>)

        const toggleButton = screen.getByRole("button", {name: /toggle theme/i})
        expect(toggleButton).toBeInTheDocument()
    })

    it("opens dropdown menu when clicked", async () => {
        const user = userEvent.setup()
        render(<AuthenticationThemeToggle/>)

        const toggleButton = screen.getByRole("button", {name: /toggle theme/i})
        await user.click(toggleButton)

        expect(screen.getByText("Appearance")).toBeInTheDocument()
        expect(screen.getByText("Mode")).toBeInTheDocument()
        expect(screen.getByText("Theme")).toBeInTheDocument()
    })

    it("renders all mode options", async () => {
        const user = userEvent.setup()
        render(<AuthenticationThemeToggle/>)

        await user.click(screen.getByRole("button", {name: /toggle theme/i}))

        expect(screen.getByText("Light")).toBeInTheDocument()
        expect(screen.getByText("Dark")).toBeInTheDocument()
        expect(screen.getByText("System")).toBeInTheDocument()
    })

    // keeping this open for future theme options which WILL be added
    it("renders theme options", async () => {
        const user = userEvent.setup()
        render(<AuthenticationThemeToggle/>)

        await user.click(screen.getByRole("button", {name: /toggle theme/i}))

        expect(screen.getByText("Default")).toBeInTheDocument()
    })

    it("shows current selection with checkmark", async () => {
        const user = userEvent.setup()
        render(<AuthenticationThemeToggle/>)

        await user.click(screen.getByRole("button", {name: /toggle theme/i}))

        const lightOption = screen.getByText("Light").closest("div")
        expect(lightOption).toHaveTextContent("✓")
    })

    it("has proper ARIA attributes", () => {
        render(<AuthenticationThemeToggle/>)

        const toggleButton = screen.getByRole("button", {name: /toggle theme/i})
        expect(toggleButton).toHaveAttribute("aria-haspopup")
    })
})
