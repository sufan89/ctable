/*
 * 处理表格事件
 * */
import eventBus from "./event";

class TableEventClass implements CTable.ITableEvent {
  /*
   * 表格主对象
   * */
  ctx: CTable.ITable;
  pressKeyCode!: string;
  isMouseIn!: boolean;
  mouseButton: {
    button: number;
    buttons: number;
  };
  mouseCursor: CTable.cursorType;
  /*
   * 表格事件主体
   * */
  eventObj: CTable.IEventBus;
  constructor(context: CTable.ITable) {
    this.ctx = context;
    this.eventObj = new eventBus();
    this.mouseButton = {
      button: 0,
      buttons: 0,
    };
    this.mouseCursor = "default";
    const { tableElement } = context;
    if (tableElement) {
      // 鼠标移动事件
      tableElement.addEventListener("mousemove", (event) => {
        this.onMouseMove(event);
      });
      // 鼠标按下事件
      tableElement.addEventListener("mousedown", (event) => {
        this.onMousedown(event);
      });
      // 鼠标松开事件
      tableElement.addEventListener("mouseup", (event) => {
        this.onMouseup(event);
      });
      // 滚轮事件
      tableElement.addEventListener("wheel", (event) => {
        this.onWheel(event);
      });
      // 鼠标移出画布事件
      tableElement.addEventListener("mouseleave", (event) => {
        this.onMouseLeave(event);
      });
      // 鼠标移入画布事件
      tableElement.addEventListener("mouseenter", (event) => {
        this.onMouseenter(event);
      });
      /*
       * 画布监听不了键盘事件，所以直接监听body的键盘事件
       * */
      if (window && window.document && window.document.body) {
        // 键盘按键按下事件
        window.document.body.addEventListener("keydown", (event) => {
          this.onKeydown(event);
        });
        // 键盘按键松开事件
        window.document.body.addEventListener("keyup", (event) => {
          this.onKeyUp(event);
        });
      }
    }
  }

  on(
    eventName: string,
    callBack: Function,
    callOnce: boolean | undefined
  ): void {
    if (callOnce) {
      this.eventObj.subscribeOnce(eventName, callBack);
    } else {
      this.eventObj.subscribe(eventName, callBack);
    }
  }

  removeEvent(eventName: string): void {
    this.eventObj.clearEvent(eventName);
  }
  /*
   * 处理滚轮事件
   * */
  onWheel(event: WheelEvent) {
    const { shiftKey, deltaY } = event;
    console.log(deltaY, "11");
    const { scrollTop, scrollLeft } = this.ctx.offsetInfo;
    const { width, height } = this.ctx.viewSize;
    const tableSize: CTable.size = this.ctx.tableScrollBar.getScrollSize();
    const offsetSize = { scrollLeft: 0, scrollTop: 0 };
    if (shiftKey) {
      // 按下shift进行的滚动，实现左右滚动
      const offsetLeft = scrollLeft + deltaY * this.ctx.wheelSpeed;
      const maxLeft = tableSize.width - width;
      offsetSize.scrollLeft =
        offsetLeft < 0 ? 0 : offsetLeft > maxLeft ? maxLeft : offsetLeft;
      offsetSize.scrollTop = scrollTop;
    } else {
      // 实现上下滚动
      const maxHeight = tableSize.height - height;
      const offsetTop = scrollTop + deltaY * this.ctx.wheelSpeed;
      offsetSize.scrollTop =
        offsetTop < 0 ? 0 : offsetTop > maxHeight ? maxHeight : offsetTop;
      offsetSize.scrollLeft = scrollLeft;
    }
    // 修改滚动条位置
    this.ctx.tableScrollBar.setBarPosition(offsetSize);
  }
  /*
   * 处理键盘按下事件
   * */
  onKeydown(event: KeyboardEvent) {
    const { code } = event;
    this.pressKeyCode = code;
    this.changeMousePoint();
  }
  /*
   * 处理键盘松开事件
   * */
  onKeyUp(event: KeyboardEvent) {
    const { code } = event;
    // 按键松开事件，如果是同一个code，则将code置空
    if (this.pressKeyCode === code) {
      this.pressKeyCode = "";
    }
    this.changeMousePoint();
  }
  /*
   * 鼠标移入事件
   * */
  onMouseenter(e: MouseEvent) {
    this.isMouseIn = true;
    this.changeMousePoint();
  }
  /*
   * 鼠标移出事件
   * */
  onMouseLeave(e: MouseEvent) {
    this.isMouseIn = false;
    this.mouseButton = { button: 0, buttons: 0 };
    this.changeMousePoint();
  }
  /*
   * 鼠标移动事件
   * */
  onMouseMove(e: MouseEvent) {
    const { movementX, movementY } = e;
    // 往上、往右是负数
    if (this.mouseCursor === "grabbing") {
      // 拖动画布
      this.dragCanvas(movementX, movementY);
    }
    // 拖动表头宽度
    // 拖动表头进行排序
    // 拖动行进行排序
  }
  /*
   * 改变鼠标指针状态
   * */
  changeMousePoint() {
    const { tableElement } = this.ctx;
    if (!this.isMouseIn) {
      this.mouseCursor = "default";
    }
    if (this.pressKeyCode !== "Space") {
      this.mouseCursor = "default";
    }
    const { button, buttons } = this.mouseButton;
    const pressMainMouseButton: boolean = button === 0 && buttons === 1;
    if (
      this.isMouseIn &&
      this.pressKeyCode === "Space" &&
      pressMainMouseButton
    ) {
      this.mouseCursor = "grabbing";
    } else if (
      this.isMouseIn &&
      this.pressKeyCode === "Space" &&
      !pressMainMouseButton
    ) {
      this.mouseCursor = "grab";
    } else {
      this.mouseCursor = "default";
    }
    if (tableElement) {
      tableElement.style.cursor = this.mouseCursor;
    }
  }
  /*
   * 处理鼠标按键事件
   * */
  onMousedown(e: MouseEvent) {
    const { button, buttons } = e;
    this.mouseButton = { button, buttons };
    this.changeMousePoint();
  }
  /*
   * 处理鼠标按键松开事件
   * */
  onMouseup(e: MouseEvent) {
    const { button, buttons } = e;
    this.mouseButton = { button, buttons };
    this.changeMousePoint();
  }
  /*
   * 拖动画布
   * */
  dragCanvas(movementX: number, movementY: number) {
    const { scrollTop, scrollLeft } = this.ctx.offsetInfo;
    const { width, height } = this.ctx.viewSize;
    const tableSize: CTable.size = this.ctx.tableScrollBar.getScrollSize();
    const offsetSize = { scrollLeft: 0, scrollTop: 0 };
    const offsetLeft = scrollLeft + movementX * -1;
    const maxLeft = tableSize.width - width;
    offsetSize.scrollLeft =
      offsetLeft < 0 ? 0 : offsetLeft > maxLeft ? maxLeft : offsetLeft;
    const maxHeight = tableSize.height - height;
    const offsetTop = scrollTop + movementY * -1;
    offsetSize.scrollTop =
      offsetTop < 0 ? 0 : offsetTop > maxHeight ? maxHeight : offsetTop;

    // 修改滚动条位置
    this.ctx.tableScrollBar.setBarPosition(offsetSize);
  }
}
export default TableEventClass;
