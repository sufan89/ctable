import { debounce } from '../../src/tools/debounce';

describe('Debounce Utility Function', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should delay function execution', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn();
    expect(mockFn).not.toBeCalled();

    jest.advanceTimersByTime(100);
    expect(mockFn).toBeCalledTimes(1);
  });

  test('should cancel previous calls', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn();
    debouncedFn(); // This should cancel the previous call
    debouncedFn(); // And this one too

    jest.advanceTimersByTime(100);
    expect(mockFn).toBeCalledTimes(1); // Only the last call should execute
  });

  test('should execute immediately when immediate is true', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 100, true);

    debouncedFn();
    expect(mockFn).toBeCalledTimes(1); // Called immediately

    jest.advanceTimersByTime(100);
    expect(mockFn).toBeCalledTimes(1); // Still only called once

    // Another call after timeout should also be immediate
    debouncedFn();
    expect(mockFn).toBeCalledTimes(2); // Second immediate call
  });

  test('should work with parameters', () => {
    const mockFn = jest.fn((arg1, arg2) => `${arg1}-${arg2}`);
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn('hello', 'world');

    jest.advanceTimersByTime(100);

    expect(mockFn).toHaveBeenCalledWith('hello', 'world');
  });
});