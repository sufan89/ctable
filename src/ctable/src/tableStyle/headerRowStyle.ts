import TableStyleClass from "@/ctable/src/tableStyle/index";

class HeaderRowStyleClass implements CTable.IHeaderRowStyle {
  rowBorder: CTable.border;
  rowFill: CTable.fillStyle;
  rowFont: CTable.baseFont;
  rowPadding: CTable.padding;
  rowType: "headerRow";
  /*
   * 当前表格配置信息
   * */
  private currentTableConfig: CTable.TableConfig;
  constructor(tableConfig: CTable.TableConfig, tableStyle: TableStyleClass) {
    this.currentTableConfig = tableConfig;
    // 给默认值
    this.rowBorder = {
      width: 1,
      color: "#dfe6ec",
    };
    this.rowFill = {
      color: "#F5F7FA",
    };
    /*
     * 默认字体信息
     * */
    if (tableStyle) {
      this.rowFont = tableStyle.baseFont;
    } else if (tableConfig.baseFont) {
      this.rowFont = tableConfig.baseFont;
    } else {
      this.rowFont = {
        textBaseline: "middle",
        textAlign: "left",
        fontStyle: "normal",
        fontVariant: "normal",
        fontWeight: 500,
        fontSize: "24px",
        lineHeight: 1.15,
        fontFamily: "Microsoft YaHei",
        fontColor: "#606266",
      };
    }
    this.rowPadding = {
      top: 10,
      bottom: 10,
      right: 10,
      left: 10,
    };
    this.rowType = "headerRow";
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
export default HeaderRowStyleClass;
