declare namespace CTable {
  interface IEventBus {
    /*
     * 事件发布
     * */
    publish<T extends any[]>(eventName: string, ...args: T): void;
    /*
     * 订阅事件
     * */
    subscribe(eventName: string, callback: Function): ISubscribe;
    /*
     * 订阅事件，且事件只会触发一次
     * */
    subscribeOnce(eventName: string, callback: Function): ISubscribe;
    /*
     * 清除事件
     * */
    clearEvent(eventName: string): void;
    /*
     * 事件对象
     * */
    eventObject: eventObject;
  }
  /*
   * 取消事件订阅
   * */
  interface ISubscribe {
    unSubscribe: () => void;
  }
  /*
   * 回调列表
   * */
  type callbackList = {
    [id: string]: Function;
  };
  /*
   * 事件对象
   * */
  type eventObject = {
    [eventName: string]: callbackList;
  };
}
