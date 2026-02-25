// Mock canvas for testing
const canvasMock = {
  getContext: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  style: {},
  clientWidth: 800,
  clientHeight: 600,
  appendChild: jest.fn(),
  removeChild: jest.fn(),
};

HTMLCanvasElement.prototype.getContext = jest.fn();
HTMLCanvasElement.prototype.addEventListener = jest.fn();
HTMLCanvasElement.prototype.removeEventListener = jest.fn();

HTMLDivElement.prototype.getBoundingClientRect = jest.fn(() => ({
  x: 0,
  y: 0,
  width: 800,
  height: 600,
  top: 0,
  right: 800,
  bottom: 600,
  left: 0,
}));

global.HTMLElement.prototype.getBoundingClientRect = jest.fn(() => ({
  x: 0,
  y: 0,
  width: 800,
  height: 600,
  top: 0,
  right: 800,
  bottom: 600,
  left: 0,
}));

// Mock requestAnimationFrame
window.requestAnimationFrame = jest.fn().mockImplementation((callback) => {
  setTimeout(callback, 0);
});

// Mock document methods
document.createElement = jest.fn((tag) => {
  if (tag === 'canvas') {
    return canvasMock;
  }
  return {
    setAttribute: jest.fn(),
    appendChild: jest.fn(),
    removeChild: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    style: {},
    clientWidth: 800,
    clientHeight: 600,
  };
});

document.getElementById = jest.fn((id) => {
  if (id === 'test-table-container') {
    return {
      appendChild: jest.fn(),
      removeChild: jest.fn(),
      getBoundingClientRect: jest.fn(() => ({
        width: 800,
        height: 600,
      })),
    };
  }
  return null;
});