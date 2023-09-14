/*
 * 表格样式主类，主要处理表格样式，粒度控制到每个单元格
 * */
import headerRowStyle from "./headerRowStyle";
import tableRowStyle from "./tableRowStyle";
class TableStyleClass implements CTable.ITableStyle {
  public baseFont: CTable.baseFont;
  public headerRowStyle: CTable.IRowStyle;
  public tableRowStyle: CTable.IRowStyle;
  constructor(tableConfig: CTable.TableConfig) {
    if (tableConfig.baseFont) {
      this.baseFont = tableConfig.baseFont;
    } else {
      // 默认样式
      this.baseFont = {
        textBaseline: "hanging",
        textAlign: "start",
        fontStyle: "normal",
        fontVariant: "normal",
        fontWeight: 500,
        fontSize: "12px",
        lineHeight: 2,
        fontFamily: "Microsoft YaHei",
        fontColor: "#606266",
      };
    }
    this.headerRowStyle = new headerRowStyle(tableConfig, this);
    this.tableRowStyle = new tableRowStyle(tableConfig, this);
  }
}
export default TableStyleClass;
