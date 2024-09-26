/*
 * 表格行样式
 * */
import rowStyleClass from "./rowStyle";

class tableRowStyle extends rowStyleClass {
  /*
   * 当前表格配置信息
   * */
  private currentTableConfig: CTable.TableConfig;
  constructor(tableConfig: CTable.TableConfig, tableStyle: CTable.ITableStyle) {
    super(tableStyle);
    this.currentTableConfig = tableConfig;
    const { rowStyle } = this.currentTableConfig;
    let styleInfo: CTable.IRowStyle | undefined;
    if (typeof rowStyle === "function") {
      styleInfo = rowStyle(this.currentTableConfig.Columns);
    } else if (rowStyle) {
      styleInfo = rowStyle;
    } else {
      styleInfo = undefined;
    }
    if (styleInfo) {
      const { rowFont, rowFill, rowBorder, rowPadding } = styleInfo;
      if (rowFont) {
        this.rowFont = rowFont;
      }
      if (rowFill) {
        this.rowFill = rowFill;
      }
      if (rowBorder) {
        this.rowBorder = rowBorder;
      }
      if (rowPadding) {
        this.rowPadding = rowPadding;
      }
    } else {
      // 默认背景是白色，后续可以通过配置进行调整
      this.rowFill = {
        color: "#ffffff",
      };
      this.rowFont.fontWeight = 400;
    }
  }
}
export default tableRowStyle;
