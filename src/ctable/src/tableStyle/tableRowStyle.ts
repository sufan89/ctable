import TableStyleClass from "@/ctable/src/tableStyle/index";
/*
 * 表格行样式
 * */
class tableRowStyle implements CTable.ITableRowStyle {
  cellStyle: Array<CTable.ICellStyle>;
  rowBorder: CTable.border;
  rowFill: CTable.fillStyle;
  rowFont: CTable.baseFont;
  rowPadding: CTable.padding;
  rowType: "tableRow";
  /*
   * 当前表格配置信息
   * */
  private currentTableConfig: CTable.TableConfig;

  constructor(tableConfig: CTable.TableConfig, tableStyle: TableStyleClass) {
    this.cellStyle = new Array<CTable.ICellStyle>();
    this.currentTableConfig = tableConfig;
    // 给默认值
    this.rowBorder = {
      width: 1,
      color: "#dfe6ec",
    };
    this.rowFill = {
      color: "#F5F7FA",
    };
    this.rowFont = tableStyle.baseFont;
    this.rowPadding = {
      top: 10,
      bottom: 10,
      right: 10,
      left: 10,
    };
    this.rowType = "tableRow";
  }
  /*
   * 获取表格渲染行样式
   * */
  getRowStyle(): CTable.IRowStyle {
    return {
      rowBorder: this.rowBorder,
      rowFill: this.rowFill,
      rowPadding: this.rowPadding,
      rowFont: this.rowFont,
    };
  }
}
export default tableRowStyle;
