declare namespace CTable {
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
    setBarPosition: (position: { v: number; h: number }) => void;
    /*
     * 滚动条元素
     * */
    barElement: HTMLElement;
    /*
     * 设置表格大小
     * */
    setTableSize: (size: CTable.size) => void;
    /*
     * 设置可视化大小
     * */
    setViewSize: (viewSize: CTable.size) => void;
  }
}
