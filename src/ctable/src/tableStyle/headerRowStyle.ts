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
    if (headRowStyle) {
      // 如果配置了表头样式函数，则使用表头样式函数返回样式
      const rowStyle = headRowStyle(this.currentTableConfig.Columns);
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
