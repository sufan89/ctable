import ICellStyle = CTable.ICellStyle;
import { Guid } from "guid-typescript";

class CellStyleClass implements ICellStyle {
  cellBorder: CTable.border;
  cellFill: CTable.fillStyle;
  cellFont: CTable.baseFont;
  cellKey: string;
  cellPadding: CTable.padding;
  checkBoxStyle: CTable.CheckBoxStyle;
  selectStyle: { cellFill: CTable.fillStyle; cellBorder: CTable.border };
  constructor(
    rowStyle: CTable.IRowStyle,
    colConfig: CTable.ColumnConfig,
    cellValue: CTable.cellValueType
  ) {
    const { cellStyle } = colConfig;
    let styleInfo: CTable.ICellStyle | null = null;
    if (cellStyle && typeof cellStyle === "function") {
      styleInfo = cellStyle(colConfig, cellValue);
    } else if (cellStyle) {
      styleInfo = cellStyle;
    }
    if (styleInfo) {
      const {
        cellBorder,
        cellFill,
        cellFont,
        cellPadding,
        checkBoxStyle,
        selectStyle,
      } = styleInfo;
      this.cellBorder = cellBorder || rowStyle.rowBorder;
      this.cellFill = cellFill || rowStyle.rowFill;
      this.cellFont = cellFont || rowStyle.rowFont;
      this.cellPadding = cellPadding || rowStyle.rowPadding;
      this.checkBoxStyle = checkBoxStyle || rowStyle.checkBoxStyle;
      this.selectStyle = selectStyle || rowStyle.selectedStyle;
    } else {
      this.cellBorder = { ...rowStyle.rowBorder };
      this.cellFill = { ...rowStyle.rowFill };
      this.cellFont = { ...rowStyle.rowFont };
      this.cellPadding = { ...rowStyle.rowPadding };
      this.checkBoxStyle = { ...rowStyle.checkBoxStyle };
      this.selectStyle = {
        cellFill: rowStyle.selectedStyle.fill,
        cellBorder: rowStyle.selectedStyle.border,
      };
    }
    // 生成单元格唯一KEY
    this.cellKey = Guid.create().toString();
  }
  /*
   * 获取字体配置
   * */
  public getFont(): string {
    let fontStr: string = "";
    if (this.cellFont.fontStyle) {
      fontStr = this.cellFont.fontStyle;
    }
    if (this.cellFont.fontVariant) {
      fontStr = `${fontStr} ${this.cellFont.fontVariant}`;
    }
    if (this.cellFont.fontWeight) {
      fontStr = `${fontStr} ${this.cellFont.fontWeight}`;
    }
    if (this.cellFont.fontSize) {
      fontStr = `${fontStr} ${this.cellFont.fontSize}`;
    }
    if (this.cellFont.fontFamily) {
      fontStr = `${fontStr} ${this.cellFont.fontFamily}`;
    }
    return fontStr;
  }
}
export default CellStyleClass;
