import '@testing-library/jest-dom';
import "jsdom-testing-mocks";

Object.defineProperty(Element.prototype, 'hasPointerCapture', {
    value: () => false,
    writable: true,
});

Object.defineProperty(Element.prototype, 'releasePointerCapture', {
    value: () => {
    },
    writable: true,
});

Object.defineProperty(Element.prototype, 'setPointerCapture', {
    value: () => {
    },
    writable: true,
});

Object.defineProperty(Element.prototype, 'scrollIntoView', {
    value: () => {
    },
    writable: true,
});