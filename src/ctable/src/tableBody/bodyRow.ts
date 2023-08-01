class bodyRow implements CTable.IBodyRow {
  /*
   * 行单元格集合
   * */
  rowCells: Array<CTable.ICell>;
  /*
   * 行高
   * */
  rowHeight: number;
  /*
   * 当前canvas上下文
   * */
  private ctx: CanvasRenderingContext2D;
  /*
   * 当前表格表头配置
   * */
  private headerConfigInfo: Array<CTable.ColumnConfig>;
  /*
   * 行样式信息
   * */
  private bodyRowStyle: CTable.ITableRowStyle;
  /*
   * 行数据
   * */
  private rowData: object;
  constructor(
    ctx: CanvasRenderingContext2D,
    headerConfig: Array<CTable.ColumnConfig>,
    bodyRowStyle: CTable.ITableRowStyle,
    rowData: object
  ) {
    this.rowCells = Array<CTable.ICell>();
    this.rowHeight = 0;
    this.ctx = ctx;
    this.headerConfigInfo = headerConfig;
    this.bodyRowStyle = bodyRowStyle;
    this.rowData = rowData;
    this.initBodyRow();
    this.renderRow();
  }
  /*
   * 初始化行
   * */
  initBodyRow() {}
  /*
   * 渲染行
   * */
  renderRow() {}
}
export default bodyRow;
