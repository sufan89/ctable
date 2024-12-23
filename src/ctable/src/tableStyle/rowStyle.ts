class rowStyleClass implements CTable.IRowStyle {
  rowBorder: CTable.border;
  rowFill: CTable.fillStyle;
  rowFont: CTable.baseFont;
  rowPadding: CTable.padding;
  checkBoxStyle: CTable.CheckBoxStyle;
  selectedStyle: { fill: CTable.fillStyle; border: CTable.border };
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
    this.checkBoxStyle = {
      size: 14,
      backGround: "#409eff",
      borderColor: "#dcdfe6",
      borderWidth: 1,
      disabledColor: "#edf2fc",
      disabledCheckedColor: "#c0c4cc",
    };
    this.selectedStyle = {
      fill: {
        color: "#fafafa",
      },
      border: {
        width: 1,
        color: "#e8eaec",
      },
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
      checkBoxStyle: this.checkBoxStyle,
      selectedStyle: this.selectedStyle,
    };
  }
}
export default rowStyleClass;
