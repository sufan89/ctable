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
    // 单元格高度
    cellHeight: number;
    // 单元格宽带
    cellWidth: number;
    // 单元格内容高度
    contentHeight: number;
    // 单元格内容宽度
    contentWidth: number;
    // 子单元格
    children?: Array<CTable.ICell>;
    // 单元格类型
    cellType: "text" | "image" | "tag" | "custom" | "checkbox";
    // 实际内容
    realVal: string;
    // 实际宽度
    realWidth: number;
    // 实际高度
    realHeight: number;
    // 绘制单元格
    renderCell: Function;
    // 计算单元格大小
    calcCellSize: Function;
    // 列配置信息
    columnInfo: CTable.ColumnConfig;
  }
  /*
   * 位置
   * */
  type position = {
    x: number;
    y: number;
  };
  type size = {
    width: number;
    height: number;
  };
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
  interface IHeadRow extends IRow {}
  /*
   * 表体行
   * */
  interface ITableRow extends IRow {}
}
