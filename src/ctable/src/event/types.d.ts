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
  type cursorType =
    | "default"
    | "pointer"
    | "progress"
    | "wait"
    | "cell"
    | "crosshair"
    | "text"
    | "vertical-text"
    | "alias"
    | "copy"
    | "move"
    | "no-drop"
    | "not-allowed"
    | "grab"
    | "grabbing"
    | "all-scroll"
    | "col-resize"
    | "row-resize"
    | "n-resize"
    | "e-resize"
    | "s-resize"
    | "w-resize"
    | "ne-resize"
    | "nw-resize"
    | "se-resize"
    | "sw-resize"
    | "ew-resize"
    | "ns-resize"
    | "nesw-resize"
    | "nwse-resize"
    | "zoom-in"
    | "zoom-out";
  /*
   * 表格事件
   * */
  interface ITableEvent {
    ctx: CTable.ITable;
    eventObj: CTable.IEventBus;
    pressKeyCode: string;
    isMouseIn: boolean;
    mouseButton: {
      button: number;
      buttons: number;
    };
    mouseCursor: cursorType;
    /*
     * 添加事件
     * */
    on: (eventName: string, callBack: Function, callOnce?: boolean) => void;
    /*
     * 移除事件
     * */
    removeEvent: (eventName: string) => void;
  }
}
