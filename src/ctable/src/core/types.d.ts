/*
 * 渲染核心
 * */
declare namespace CTable {
  /*
   * 单元格绘制接口
   * */
  interface ICell {
    cellPosition: CTable.position;
    cellStyle: CTable.ICellStyle;
    cellKey: string;
    // 单元格大小
    cellSize: CTable.size;
    // 内容大小
    contentSize: CTable.size;
    // 子单元格
    children?: Array<CTable.ICell>;
    // 单元格类型
    cellType: CTable.cellType;
    // 实际内容
    realVal: string;
    // 绘制单元格
    renderCell: Function;
    // 计算单元格大小
    calcCellSize: Function;
    // 列配置信息
    columnInfo: CTable.ColumnConfig;
    // 获取单元格大小，包括子所有子单元格大小
    getCellSize: Function;
    // 行高
    rowHeight: number;
    // 设置行高
    setRowHeight: Function;
  }
  /*
   * 位置
   * */
  export type position = {
    x: number;
    y: number;
  };
  /*
   * 单元格大小
   * */
  export type size = {
    width: number;
    height: number;
  };
  /*
   * 单元格内容类型
   * */
  export type cellValueType = string | number | object | [];
  /*
   * 单元格类型
   * */
  export type cellType = "text" | "button" | "checkbox" | "custom" | "img";
  /*
   * 表格行接口
   * */
  interface IRow {
    rowCells: Array<ICell>;
    renderRow: Function;
    rowHeight: number;
  }
  /*
   * 表头行
   * */
  export interface IHeadRow extends IRow {}
  /*
   * 表体行
   * */
  export interface IBodyRow extends IRow {}
}
