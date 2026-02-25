declare namespace CTable {
  /*
   * 表格滚动条
   * */
  interface IScrollBar {
    /*
     * 表格大小
     * */
    tableSize: CTable.size;
    /*
     * 视图尺寸
     * */
    viewSize: CTable.size;
    /*
     * 是否显示垂直滚动条
     * */
    isShowVertical: boolean;
    /*
     * 是否显示水平滚动条
     * */
    isShowHorizontal: boolean;
    /*
     * 滚动条当前位置
     * */
    currentPosition: {
      v: number;
      h: number;
    };
    /*
     * 设置滚动条位置
     * */
    setBarPosition: (position: {
      scrollLeft: number;
      scrollTop: number;
    }) => void;
    /*
     * 设置表格大小
     * */
    setTableSize: (size: CTable.size) => void;
    /*
     * 设置可视化大小
     * */
    setViewSize: (viewSize: CTable.size) => void;
    /*
     * 垂直滚动条
     * */
    verticalScroll: CTable.IBar | null;
    /*
     * 水平滚动条
     * */
    horizontalScroll: CTable.IBar | null;
    /*
     * 设置滚动条显示状态
     * */
    showScrollBar: (
      showVerticalBar: boolean,
      showHorizontalBar: boolean
    ) => void;
    /*
     * 添加事件
     * */
    addEvent: (
      eventName: string,
      callBack: (data: { scrollTop: number; scrollHeight: number; scrollLeft: number; scrollWidth: number }) => void,
      callOnce?: boolean
    ) => void;
    /*
     * 移除事件
     * */
    removeEvent: (eventName: string) => void;
    /*
     * 获取滚动区域尺寸
     * */
    getScrollSize: () => CTable.size;
    /*
     * 销毁滚动条，清理事件监听器
     * */
    destroy: () => void;
  }
  /*
   * 滚动条
   * */
  interface IBar {
    /*
     * 是否显示滚动条
     * */
    isShow: boolean;
    /*
     * 滚动条元素
     * */
    barElement: HTMLElement | null;
    /*
     * 滚动条内容元素
     * */
    barContentElement: HTMLElement | null;
    /*
     * 滚动条，当前的位置
     * */
    currentPosition: number;
    /*
     * 滚动区域尺寸
     * */
    scrollSize: number;
    /*
     * 设置滚动条位置
     * */
    setPosition: (position: number) => void;
    /*
     * 设置滚动条大小
     * */
    setBarSize: (val: number) => void;
    /*
     * 设置滚动条内容大小，以实现滚动
     * */
    setBarContentSize: (val: number) => void;
    /*
     * 设置滚动条样式
     * */
    setBarStyle: (style: { [key: string]: string | number }) => void;
    /*
     * 添加事件
     * */
    addEvent: (
      eventName: string,
      callBack: (data: { scrollTop: number; scrollHeight: number } | { scrollLeft: number; scrollWidth: number }) => void,
      callOnce?: boolean
    ) => void;
    /*
     * 移除事件
     * */
    removeEvent: (eventName: string) => void;
    /*
     * 获取滚动尺寸
     * */
    getScrollSize: () => number;
    /*
     * 销毁滚动条，清理事件监听器
     * */
    destroy: () => void;
  }
}
