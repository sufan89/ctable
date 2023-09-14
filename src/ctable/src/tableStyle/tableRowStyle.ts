/*
 * 表格行样式
 * */
import rowStyleClass from "@/ctable/src/tableStyle/rowStyle";

class tableRowStyle extends rowStyleClass {
  /*
   * 当前表格配置信息
   * */
  private currentTableConfig: CTable.TableConfig;
  constructor(tableConfig: CTable.TableConfig, tableStyle: CTable.ITableStyle) {
    super(tableStyle);
    this.currentTableConfig = tableConfig;
    // 默认背景是白色，后续可以通过配置进行调整
    this.rowFill = {
      color: "#ffffff",
    };
    this.rowFont.fontWeight = 400;
  }
}
export default tableRowStyle;
