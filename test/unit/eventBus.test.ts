import eventBus from '../../src/event/event';

describe('Event Bus', () => {
  let eventBusInstance: any;

  beforeEach(() => {
    eventBusInstance = new eventBus();
  });

  afterEach(() => {
    // Clean up all events after each test
    if (eventBusInstance && eventBusInstance.eventObject) {
      Object.keys(eventBusInstance.eventObject).forEach(eventName => {
        eventBusInstance.clearEvent(eventName);
      });
    }
  });

  test('should subscribe to an event', () => {
    const mockCallback = jest.fn();
    const subscription = eventBusInstance.subscribe('test-event', mockCallback);

    expect(subscription).toBeDefined();
    expect(typeof subscription.unSubscribe).toBe('function');
  });

  test('should publish and trigger subscribed events', () => {
    const mockCallback = jest.fn();
    eventBusInstance.subscribe('test-event', mockCallback);

    eventBusInstance.publish('test-event', 'arg1', 'arg2');

    expect(mockCallback).toHaveBeenCalledWith('arg1', 'arg2');
  });

  test('should handle multiple subscribers for same event', () => {
    const mockCallback1 = jest.fn();
    const mockCallback2 = jest.fn();

    eventBusInstance.subscribe('test-event', mockCallback1);
    eventBusInstance.subscribe('test-event', mockCallback2);

    eventBusInstance.publish('test-event', 'data');

    expect(mockCallback1).toHaveBeenCalledWith('data');
    expect(mockCallback2).toHaveBeenCalledWith('data');
  });

  test('should support one-time subscriptions', () => {
    const mockCallback = jest.fn();
    eventBusInstance.subscribeOnce('once-event', mockCallback);

    eventBusInstance.publish('once-event', 'first');
    eventBusInstance.publish('once-event', 'second');

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith('first');
  });

  test('should unsubscribe events', () => {
    const mockCallback = jest.fn();
    const subscription = eventBusInstance.subscribe('test-event', mockCallback);

    subscription.unSubscribe();
    eventBusInstance.publish('test-event', 'data');

    expect(mockCallback).not.toHaveBeenCalled();
  });

  test('should clear all events for an event name', () => {
    const mockCallback1 = jest.fn();
    const mockCallback2 = jest.fn();

    eventBusInstance.subscribe('test-event', mockCallback1);
    eventBusInstance.subscribe('test-event', mockCallback2);

    eventBusInstance.clearEvent('test-event');
    eventBusInstance.publish('test-event', 'data');

    expect(mockCallback1).not.toHaveBeenCalled();
    expect(mockCallback2).not.toHaveBeenCalled();
  });

  test('should clear all events when passed empty string', () => {
    const mockCallback = jest.fn();

    eventBusInstance.subscribe('test-event', mockCallback);
    eventBusInstance.clearEvent('');

    // Check if the event object is cleared
    expect(Object.keys(eventBusInstance.eventObject).length).toBe(0);
  });
});