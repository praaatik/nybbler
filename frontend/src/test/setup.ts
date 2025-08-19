import "@testing-library/jest-dom";
import "jsdom-testing-mocks";
import { vi } from "vitest";

Object.defineProperty(Element.prototype, "hasPointerCapture", {
    value: () => false,
    writable: true,
});

Object.defineProperty(Element.prototype, "releasePointerCapture", {
    value: () => {
    },
    writable: true,
});

Object.defineProperty(Element.prototype, "setPointerCapture", {
    value: () => {
    },
    writable: true,
});

Object.defineProperty(Element.prototype, "scrollIntoView", {
    value: () => {
    },
    writable: true,
});

Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

global.console = {
    ...console,
    error: vi.fn(),
};
