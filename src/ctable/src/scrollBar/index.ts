class scrollBarClass implements CTable.IScrollBar {
  barElement: HTMLElement;
  currentPosition: { v: number; h: number };
  isShowHorizontal: boolean;
  isShowVertical: boolean;

  tableSize: { width: number; height: number };
  viewSize: { width: number; height: number };
  constructor(tableElement: HTMLElement | null) {
    this.isShowHorizontal = false;
    this.isShowVertical = false;
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
    if (tableElement !== null) {
      this.barElement = tableElement;
      /*
       * 创建滚动条element
       * */
      this.barElement.setAttribute("class", "table-scroll-bar");
    } else {
      this.barElement = document.createElement("div");
    }
  }
  /*
   * 初始化
   * */
  public init() {}

  setBarPosition(position: { v: number; h: number }) {
    console.log(position, "position");
  }
  /*
   * 设置表格大小
   * */
  setTableSize(tableSize: CTable.size) {
    this.tableSize = tableSize;
    this.barElement.style.width = `${this.tableSize.width}px`;
    this.barElement.style.height = `${this.tableSize.height}px`;
  }
  /*
   * 设置可视化大小
   * */
  setViewSize(viewSize: CTable.size) {
    this.viewSize = viewSize;
    this.barElement.style.width = `${this.viewSize.width}px`;
    this.barElement.style.height = `${this.viewSize.height}px`;
  }
}
export default scrollBarClass;
