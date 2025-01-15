/*
 * 表格行样式
 * */
import rowStyleClass from "./rowStyle";

class tableRowStyle extends rowStyleClass {
  /*
   * 表格行样式信息
   * @param tableConfig 表格配置的行样式，Object or Function 返回行样式信息
   * @param rowValue 当前行数据，如果表格配置了行样式函数，则可以通过行数据生成行样式
   * @param tableStyle 当前表格的公共样式，用于处理行默认样式
   * @return IRowStyle 行样式
   * */
  constructor(
    tableConfig: CTable.IRowStyle | CTable.GetRowStyle | undefined,
    rowValue: CTable.rowValueType,
    tableStyle: CTable.ITableStyle
  ) {
    super(tableStyle);
    let styleInfo: CTable.IRowStyle | undefined;
    if (tableConfig && typeof tableConfig === "function") {
      styleInfo = tableConfig(rowValue);
    } else if (tableConfig) {
      styleInfo = tableConfig;
    } else {
      styleInfo = undefined;
    }
    if (styleInfo) {
      const { rowFont, rowFill, rowBorder, rowPadding, selectedStyle } =
        styleInfo;
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
      if (selectedStyle) {
        this.selectedStyle = selectedStyle;
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
