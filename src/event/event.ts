class eventBus implements CTable.IEventBus {
  eventObject: CTable.eventObject;
  callbackId: number;
  constructor() {
    this.eventObject = {};
    this.callbackId = 0;
  }

  clearEvent(eventName: string) {
    // 清除事件
    if (!eventName) {
      this.eventObject = {};
    } else {
      delete this.eventObject[eventName];
    }
  }

  /*
   * 触发事件调用
   * */
  publish<T extends any[]>(eventName: string, ...args: T): void {
    // 取出当前事件所有的回调函数
    const callbackObject = this.eventObject[eventName];
    if (!callbackObject) {
      return;
    }
    // 执行每一个回调函数
    for (const id in callbackObject) {
      // 执行时传入参数
      callbackObject[id](...args);
      // 只订阅一次的回调函数需要删除
      if (id[0] === "D") {
        delete callbackObject[id];
      }
    }
  }

  /*
   * 订阅事件
   * */
  subscribe(eventName: string, callback: (...args: any[]) => void): CTable.ISubscribe {
    if (!this.eventObject[eventName]) {
      this.eventObject[eventName] = {};
    }
    const eventId = this.callbackId++;
    this.eventObject[eventName][eventId] = callback;
    // 每一次订阅事件，都生成唯一一个取消订阅的函数
    const unSubscribe = () => {
      // 清除这个订阅者的回调函数
      delete this.eventObject[eventName][eventId];
      // 如果这个事件没有订阅者了，也把整个事件对象清除
      if (Object.keys(this.eventObject[eventName]).length === 0) {
        delete this.eventObject[eventName];
      }
    };
    return { unSubscribe };
  }
  /*
   * 订阅事件，但是改事件只会被触发一次
   * */
  subscribeOnce(eventName: string, callback: (...args: any[]) => void): CTable.ISubscribe {
    if (!this.eventObject[eventName]) {
      this.eventObject[eventName] = {};
    }
    const eventId = "D" + this.callbackId++;
    this.eventObject[eventName][eventId] = callback;
    const unSubscribe = () => {
      // 清除这个订阅者的回调函数
      delete this.eventObject[eventName][eventId];
      // 如果这个事件没有订阅者了，也把整个事件对象清除
      if (Object.keys(this.eventObject[eventName]).length === 0) {
        delete this.eventObject[eventName];
      }
    };
    return { unSubscribe };
  }
}

export default eventBus;
