/*
 * 渲染核心
 * */
declare namespace CTable {
  /*
   * 单元格绘制接口
   * */
  interface Cell {
    cellPosition: position;
    cellStyle: cellStyle;
  }
  /*
   * 位置
   * */
  type position = {
    x: Number;
    y: Number;
  };
}
