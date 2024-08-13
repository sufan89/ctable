/*
 * 垂直滚动条类
 * */
import eventBus from "../event/event";

class verticalScrollClass implements CTable.IBar {
  barElement!: HTMLElement;
  currentPosition: number;
  isShow: boolean;
  barContentElement!: HTMLElement;
  scrollSize: number;
  /*
   * 滚动条事件总线
   * */
  scrollEvent: CTable.IEventBus;
  constructor(tableEl: HTMLElement, isShow: boolean) {
    this.currentPosition = 0;
    this.scrollSize = 0;
    this.isShow = isShow;
    this.barContentElement = document.createElement("div");
    /*
     * 滚动条事件总线
     * */
    this.scrollEvent = new eventBus();
    if (tableEl) {
      this.barElement = document.createElement("div");
      this.barElement.setAttribute("class", "table-vertical-scroll");
      this.barElement.appendChild(this.barContentElement);
      tableEl.appendChild(this.barElement);
      this.initEvent();
    }
  }

  /*
   * 设置当前滚动条位置
   * 主要用于初始化设置滚动条位置
   * */
  setPosition(position: number): void {}

  /*
   * 设置滚动条样式
   * */
  setBarStyle(style: { [key: string]: string | number }) {
    Object.keys(style).forEach((key: string) => {
      if (this.barElement) {
        // @ts-ignore
        this.barElement.style[key] = style[key];
      }
    });
  }
  /*
   * 设置滚动条内容大小，以实现滚动
   * */
  setBarContentSize(val: number): void {
    this.barContentElement.style.height = `${val}px`;
    this.scrollSize = val;
  }

  setBarSize(val: number): void {}
  /*
   * 初始化事件
   * */
  initEvent() {
    let ticking: boolean = false;
    if (this.barElement) {
      this.barElement.addEventListener("scroll", () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            this.currentPosition = this.barElement?.scrollTop || 0;
            this.scrollSize = this.barElement?.scrollHeight || 0;
            this.scrollEvent.publish("scroll", {
              scrollTop: this.currentPosition,
              scrollHeight: this.scrollSize,
            });
            ticking = false;
          });
          ticking = true;
        }
      });
    }
  }
  /*
   * 添加事件
   * */
  addEvent(eventName: string, callBack: Function, callOnce: boolean = false) {
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
}

export default verticalScrollClass;
