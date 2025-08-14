"use client"

// ref - https://stackoverflow.com/a/65286435

import {render, screen} from '@testing-library/react'
import {vi, beforeEach, afterEach, describe, it, expect} from 'vitest'
import {ThemeProvider} from './theme-provider'
import {useTheme} from "../hooks/use-theme.tsx";

const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
}

const createMatchMediaMock = (matches: boolean = false) => vi.fn().mockImplementation((query) => ({
    matches,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
}))

const TestComponent = () => {
    const {mode, theme, setMode, setTheme} = useTheme()
    return (
        <div>
            <span data-testid="current-mode">{mode}</span>
            <span data-testid="current-theme">{theme}</span>
            <button onClick={() => setMode('dark')} data-testid="set-dark">Set Dark</button>
            <button onClick={() => setTheme('bubblegum')} data-testid="set-bubblegum">Set Bubblegum</button>
        </div>
    )
}

describe('ThemeProvider', () => {
    let mockDocumentElement: any

    beforeEach(() => {
        vi.clearAllMocks()

        Object.defineProperty(global, 'localStorage', {
            value: localStorageMock,
            configurable: true,
        })

        Object.defineProperty(global, 'window', {
            value: {
                ...global.window,
                localStorage: localStorageMock,
                matchMedia: createMatchMediaMock(false),
            },
            configurable: true,
        })

        mockDocumentElement = {
            classList: {
                remove: vi.fn(),
                add: vi.fn(),
            },
            setAttribute: vi.fn(),
        }

        Object.defineProperty(document, 'documentElement', {
            value: mockDocumentElement,
            configurable: true,
        })
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    describe('Initial State', () => {
        it('uses default values when no localStorage values exist on first load', () => {
            localStorageMock.getItem.mockReturnValue(null)

            render(
                <ThemeProvider>
                    <TestComponent/>
                </ThemeProvider>
            )

            expect(screen.getByTestId('current-mode')).toHaveTextContent('system')
            expect(screen.getByTestId('current-theme')).toHaveTextContent('default')
        })

        it('uses provided default values', () => {
            localStorageMock.getItem.mockReturnValue(null)

            render(
                <ThemeProvider defaultMode="dark" defaultTheme="bubblegum">
                    <TestComponent/>
                </ThemeProvider>
            )

            expect(screen.getByTestId('current-mode')).toHaveTextContent('dark')
            expect(screen.getByTestId('current-theme')).toHaveTextContent('bubblegum')
        })

        it('loads values from localStorage when available', () => {
            localStorageMock.getItem.mockImplementation((key) => {
                if (key === 'ui-theme:mode') return 'dark'
                if (key === 'ui-theme:theme') return 'bubblegum'
                return null
            })

            render(
                <ThemeProvider>
                    <TestComponent/>
                </ThemeProvider>
            )

            expect(screen.getByTestId('current-mode')).toHaveTextContent('dark')
            expect(screen.getByTestId('current-theme')).toHaveTextContent('bubblegum')
        })
    })
})