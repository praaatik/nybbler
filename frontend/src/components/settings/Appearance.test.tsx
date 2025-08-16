import {beforeEach, describe, it, expect, vi} from 'vitest'
import {render, screen} from '@testing-library/react'
import Appearance from "./Appearance.tsx";
import userEvent from "@testing-library/user-event";

const mockSetTheme = vi.fn();
const mockSetMode = vi.fn();

vi.mock("../../hooks/use-theme", () => ({
    useTheme: () => ({
        mode: "system",
        setMode: mockSetMode,
        theme: "default",
        setTheme: mockSetTheme,
    })
}))

describe("Appearance component", () => {
    const user = userEvent.setup()

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it("renders the appearance component with default values", () => {
        render(<Appearance/>)

        const modeSelectTrigger = screen.getByTestId("mode-select");
        const themeSelectTrigger = screen.getByTestId("theme-select");
        const selectTriggers = screen.getAllByRole("combobox");

        expect(screen.getByText("Appearance")).toBeInTheDocument()
        expect(screen.getByLabelText('Display Mode')).toBeInTheDocument()

        expect(modeSelectTrigger).toHaveTextContent("System")
        expect(themeSelectTrigger).toHaveTextContent("Default")

        expect(selectTriggers).toHaveLength(2);
    })

    it('opens mode select dropdown when clicked', async () => {
        render(<Appearance/>)

        const modeSelect = screen.getAllByRole('combobox')[0]
        await user.click(modeSelect)

        expect(screen.getByRole('option', {name: 'Light'})).toBeInTheDocument()
        expect(screen.getByRole('option', {name: 'Dark'})).toBeInTheDocument()
        expect(screen.getByRole('option', {name: 'System'})).toBeInTheDocument()
    })

    it("opens theme select dropdown when clicked", async () => {
        render(<Appearance/>)

        const themeSelect = screen.getAllByRole("combobox")[1]
        await user.click(themeSelect)

        expect(screen.getByRole("option", {name: "Default"})).toBeInTheDocument()
        expect(screen.getByRole("option", {name: "Bubblegum"})).toBeInTheDocument()
    })

    it('displays current mode and theme values from useTheme hook', () => {
        render(<Appearance/>)

        const selectTriggers = screen.getAllByRole('combobox')
        expect(selectTriggers[0]).toBeInTheDocument()
        expect(selectTriggers[1]).toBeInTheDocument()
    })

    describe('Different Hook States', () => {
        it('works with different hook return values', () => {
            render(<Appearance/>)

            expect(screen.getByText('Display Mode')).toBeInTheDocument()
            expect(screen.getByText('Display Theme')).toBeInTheDocument()

            const selectTriggers = screen.getAllByRole('combobox')
            expect(selectTriggers).toHaveLength(2)
        })
    })

    describe('Accessibility', () => {
        it('has proper labels for selects', () => {
            render(<Appearance/>)

            expect(screen.getByLabelText('Display Mode')).toBeInTheDocument()
            expect(screen.getByLabelText('Display Theme')).toBeInTheDocument()
        })

        it('select triggers are keyboard accessible', () => {
            render(<Appearance/>)

            const selectTriggers = screen.getAllByRole('combobox')
            selectTriggers.forEach(trigger => {
                expect(trigger).toBeInTheDocument()
                expect(trigger.tagName.toLowerCase()).toBe('button')
            })
        })
    })

    describe('Theme Selection', () => {
        it('calls setTheme when selecting a different theme', async () => {
            render(<Appearance/>)

            const themeSelect = screen.getAllByRole('combobox')[1]
            await user.click(themeSelect)

            const bubblegumOption = screen.getByRole('option', {name: 'Bubblegum'})
            await user.click(bubblegumOption)

            expect(mockSetTheme).toHaveBeenCalledWith('bubblegum')
        })
    })
    describe('Mode Selection', () => {
        it('calls setMode when selecting a different mode', async () => {
            render(<Appearance/>)

            const modeSelect = screen.getAllByRole('combobox')[0]
            await user.click(modeSelect)

            const darkOption = screen.getByRole('option', {name: 'Dark'})
            await user.click(darkOption)

            expect(mockSetMode).toHaveBeenCalledWith('dark')
        })
    })
})


