class rowStyleClass implements CTable.IRowStyle {
  rowBorder: CTable.border;
  rowFill: CTable.fillStyle;
  rowFont: CTable.baseFont;
  rowPadding: CTable.padding;
  constructor(tableStyle: CTable.ITableStyle) {
    this.rowFont = { ...tableStyle.baseFont };
    // 给默认值
    this.rowBorder = {
      width: 1,
      color: "#e8eaec",
    };
    this.rowFill = {
      color: "#F5F7FA",
    };
    this.rowPadding = {
      top: 10,
      bottom: 10,
      right: 10,
      left: 10,
    };
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
export default rowStyleClass;
