import "@testing-library/jest-dom/vitest";
import React from "react";
import { vi } from "vitest";

vi.mock("next/font/google", () => ({
  Archivo: () => ({ variable: "font-archivo", className: "font-archivo" }),
  Lora: () => ({ variable: "font-lora", className: "font-lora" }),
}));

vi.mock("next/image", () => ({
  default: (props) => {
    const src = props.src;

    return React.createElement("img", {
      src: typeof src === "string" ? src : src.src,
      alt: props.alt,
      className: props.className,
    });
  },
}));

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

window.requestAnimationFrame = (callback) => {
  callback(performance.now());
  return 1;
};

window.cancelAnimationFrame = () => {};

Element.prototype.scrollTo = vi.fn();
Element.prototype.scrollIntoView = vi.fn();

class MockIntersectionObserver {
  constructor(callback, options) {
    this.callback = callback;
    this.options = options;
    this.elements = new Set();
  }

  observe(element) {
    this.elements.add(element);
  }

  unobserve(element) {
    this.elements.delete(element);
  }

  disconnect() {
    this.elements.clear();
  }

  takeRecords() {
    return [];
  }
}

window.IntersectionObserver = MockIntersectionObserver;
globalThis.IntersectionObserver = MockIntersectionObserver;
