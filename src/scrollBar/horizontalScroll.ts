/*
 * 水平滚动条类
 */

import eventBus from "../event/event";

class horizontalScrollClass implements CTable.IBar {
  barElement!: HTMLElement;
  currentPosition: number;
  isShow: boolean;
  barContentElement!: HTMLElement;
  scrollEvent: CTable.IEventBus;
  scrollSize: number;
  private scrollHandler: () => void;

  constructor(tableEl: HTMLElement, isShow: boolean) {
    this.currentPosition = 0;
    this.scrollSize = 0;
    this.isShow = isShow;
    /*
     * 滚动条事件总线
     * */
    this.scrollEvent = new eventBus();
    this.barContentElement = document.createElement("div");

    // 创建绑定的事件处理器
    this.scrollHandler = () => {};

    if (tableEl !== null) {
      // 创建水平滚动条元素
      this.barElement = document.createElement("div");
      this.barElement.setAttribute("class", "table-horizontal-scroll");
      this.barElement.appendChild(this.barContentElement);
      tableEl.appendChild(this.barElement);
      this.initEvent();
    }
  }

  /*
   * 初始化事件
   * */
  initEvent() {
    let ticking: boolean = false;
    if (this.barElement) {
      this.scrollHandler = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            this.scrollSize = this.barElement?.scrollWidth || 0;
            this.currentPosition = this.barElement?.scrollLeft || 0;
            this.scrollEvent.publish("scroll", {
              scrollLeft: this.currentPosition,
              scrollWidth: this.scrollSize,
            });
            ticking = false;
          });
          ticking = true;
        }
      };
      this.barElement.addEventListener("scroll", this.scrollHandler);
    }
  }

  setPosition(position: number): void {
    if (this.barElement) {
      this.barElement.scrollLeft = position;
    }
  }

  setBarContentSize(val: number): void {
    this.barContentElement.style.width = `${val}px`;
    this.scrollSize = val;
  }

  setBarSize(_val: number): void {
  }

  setBarStyle(style: { [key: string]: string | number }): void {
    Object.keys(style).forEach((key: string) => {
      if (this.barElement) {
        // @ts-ignore
        this.barElement.style[key] = style[key];
      }
    });
  }

  /*
   * 订阅事件
   * */
  addEvent(
    eventName: string,
    callBack: (data: { scrollLeft: number; scrollWidth: number }) => void,
    callOnce: boolean = false
  ): void {
    if (callOnce) {
      this.scrollEvent.subscribeOnce(eventName, callBack);
    } else {
      this.scrollEvent.subscribe(eventName, callBack);
    }
  }

  /*
   * 移除事件
   * */
  removeEvent(eventName: string) {
    this.scrollEvent.clearEvent(eventName);
  }

  /*
   * 获取滚动区域大小
   * */
  getScrollSize(): number {
    return this.barElement.scrollWidth;
  }

  /*
   * 销毁滚动条，清理事件监听器
   * */
  destroy(): void {
    if (this.barElement && this.scrollHandler) {
      this.barElement.removeEventListener("scroll", this.scrollHandler);
    }
    this.scrollEvent.clearEvent("");
  }
}
export default horizontalScrollClass;