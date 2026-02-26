import horizontalScrollClass from "./horizontalScroll";
import verticalScrollClass from "./verticalScroll";
import eventBus from "../event/event";

class scrollBarClass implements CTable.IScrollBar {
  currentPosition: { v: number; h: number };
  isShowHorizontal: boolean;
  isShowVertical: boolean;
  tableSize: { width: number; height: number };
  viewSize: { width: number; height: number };
  horizontalScroll: CTable.IBar | null;
  verticalScroll: CTable.IBar | null;
  /*
   * 滚动条事件总线
   * */
  scrollEvent: CTable.IEventBus;
  /*
   * 滚动条宽度，后续可以做到配置
   * 单位默认是PX，如果后续需要适配移动端，需要重新计算
   * */
  scrollBarWidth: number;

  /*
   * @param tableElement 表格HTML节点
   * */
  constructor(tableElement: HTMLElement | null) {
    // 默认是显示水平滚动条
    this.isShowHorizontal = true;
    // 默认是显示垂直滚动条
    this.isShowVertical = true;
    this.tableSize = {
      width: 0,
      height: 0,
    };
    this.viewSize = {
      width: 0,
      height: 0,
    };
    this.currentPosition = {
      v: 0,
      h: 0,
    };
    // 默认滚动条大小为7像素
    this.scrollBarWidth = 7;
    if (tableElement !== null) {
      // 创建水平滚动条对象
      this.horizontalScroll = new horizontalScrollClass(
        tableElement,
        this.isShowHorizontal
      );
      // 创建垂直滚动条对象
      this.verticalScroll = new verticalScrollClass(
        tableElement,
        this.isShowVertical
      );
      // 垂直滚动条添加滚动事件
      this.verticalScroll.addEvent("scroll", (data: { scrollTop: number; scrollHeight: number } | { scrollLeft: number; scrollWidth: number }) => {
        if ('scrollTop' in data && 'scrollHeight' in data) {
          this.onVerticalScroll(data as { scrollTop: number; scrollHeight: number });
        }
      });
      // 水平滚动条添加滚动事件
      this.horizontalScroll.addEvent("scroll", (data: { scrollTop: number; scrollHeight: number } | { scrollLeft: number; scrollWidth: number }) => {
        if ('scrollLeft' in data && 'scrollWidth' in data) {
          this.onHorizontalScroll(data as { scrollLeft: number; scrollWidth: number });
        }
      });
    } else {
      this.horizontalScroll = null;
      this.verticalScroll = null;
    }
    /*
     * 滚动条事件总线
     * */
    this.scrollEvent = new eventBus();
  }

  addEvent(eventName: string, callBack: (data: { scrollTop: number; scrollHeight: number; scrollLeft: number; scrollWidth: number }) => void, callOnce: boolean = false) {
    if (callOnce) {
      this.scrollEvent.subscribeOnce(eventName, callBack);
    } else {
      this.scrollEvent.subscribe(eventName, callBack);
    }
  }
  removeEvent(eventName: string) {
    this.scrollEvent.clearEvent(eventName);
  }

  setBarPosition(position: { scrollLeft: number; scrollTop: number }) {
    if (this.verticalScroll) {
      this.verticalScroll.setPosition(position.scrollTop);
    }
    if (this.horizontalScroll) {
      this.horizontalScroll.setPosition(position.scrollLeft);
    }
  }

  /*
   * 设置表格大小
   * */
  setTableSize(tableSize: CTable.size) {
    this.tableSize = tableSize;
    this.horizontalScroll?.setBarContentSize(tableSize.width);
    this.verticalScroll?.setBarContentSize(tableSize.height);
  }

  /*
   * 设置可视化大小
   * */
  setViewSize(viewSize: CTable.size) {
    this.viewSize = viewSize;
    // 设置垂直滚动条位置
    this.verticalScroll?.setBarStyle({
      // 表格宽度减去滚动条宽度
      left: `${this.viewSize.width - this.scrollBarWidth - 1}px`,
      // 滚动条高度等于表格视口高度
      height: `${this.viewSize.height - 1}px`,
      // 滚动条底部位置，等于视口高度加上滚动条宽度
      bottom: `${this.viewSize.height + this.scrollBarWidth + 4}px`,
      width: `${this.scrollBarWidth + 1}px`,
    });
    // 设置水平滚动条位置
    this.horizontalScroll?.setBarStyle({
      width: `${this.viewSize.width}px`,
      bottom: `${this.scrollBarWidth * 2 + 1}px`,
      height: `${this.scrollBarWidth + 1}px`,
    });
  }

  /*
   *设置滚动显示隐藏
   * */
  showScrollBar(
    _showVerticalBar: boolean = true,
    _showHorizontalBar: boolean = true
  ) {
  }

  /*
   * 垂直滚动条滚动事件
   * @param data { scrollTo: number; scrollHeight: number }
   * scrollTo:当前滚动的位置
   * scrollHeight：总滚动高度
   * */
  onVerticalScroll(data: { scrollTop: number; scrollHeight: number }) {
    this.scrollEvent.publish("scroll", {
      scrollTop: data.scrollTop,
      scrollHeight: data.scrollHeight,
      scrollLeft: this.horizontalScroll?.currentPosition || 0,
      scrollWidth: this.horizontalScroll?.scrollSize || 0,
    });
  }

  /*
   * 水平滚动条滚动事件
   * */
  onHorizontalScroll(data: { scrollLeft: number; scrollWidth: number }) {
    this.scrollEvent.publish("scroll", {
      scrollTop: this.verticalScroll?.currentPosition || 0,
      scrollHeight: this.verticalScroll?.scrollSize || 0,
      scrollLeft: data.scrollLeft,
      scrollWidth: data.scrollWidth,
    });
  }
  /*
   * 获取滚动区域大小
   * */
  getScrollSize(): CTable.size {
    const size: CTable.size = { width: 0, height: 0 };
    if (this.horizontalScroll) {
      size.width = this.horizontalScroll.getScrollSize();
    }
    if (this.verticalScroll) {
      size.height = this.verticalScroll.getScrollSize();
    }
    return size;
  }

  /*
   * 销毁滚动条，清理事件监听器
   * */
  destroy(): void {
    // 销毁垂直滚动条
    if (this.verticalScroll) {
      this.verticalScroll.destroy();
    }

    // 销毁水平滚动条
    if (this.horizontalScroll) {
      this.horizontalScroll.destroy();
    }

    // 清除所有订阅的事件
    this.scrollEvent.clearEvent("");
  }
}

export default scrollBarClass;
