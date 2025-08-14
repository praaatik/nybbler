import {beforeEach, describe, it, expect, vi} from 'vitest'
import {render, screen} from '@testing-library/react'
import Appearance from "./Appearance.tsx";

describe("Appearance component", () => {
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
})