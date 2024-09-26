import rowStyleClass from "./rowStyle";

class HeaderRowStyleClass extends rowStyleClass {
  /*
   * 当前表格配置信息
   * */
  private currentTableConfig: CTable.TableConfig;

  constructor(tableConfig: CTable.TableConfig, tableStyle: CTable.ITableStyle) {
    super(tableStyle);
    this.currentTableConfig = tableConfig;
    const { headRowStyle } = this.currentTableConfig;
    let rowStyle: CTable.IRowStyle | undefined;
    if (typeof headRowStyle === "function") {
      rowStyle = headRowStyle(this.currentTableConfig.Columns);
    } else if (headRowStyle) {
      rowStyle = headRowStyle;
    } else {
      rowStyle = undefined;
    }
    if (rowStyle) {
      // 如果配置了表头样式函数，则使用表头样式函数返回样式
      const { rowFont, rowFill, rowPadding, rowBorder } = rowStyle;
      if (rowFont) {
        this.rowFont = rowFont;
      }
      if (rowFill) {
        this.rowFill = rowFill;
      }
      if (rowPadding) {
        this.rowPadding = rowPadding;
      }
      if (rowBorder) {
        this.rowBorder = rowBorder;
      }
    }
  }
}
export default HeaderRowStyleClass;
