import ICellStyle = CTable.ICellStyle;
import { Guid } from "guid-typescript";

class CellStyleClass implements ICellStyle {
  cellBorder: CTable.border;
  cellFill: CTable.fillStyle;
  cellFont: CTable.baseFont;
  cellKey: string;
  cellPadding: CTable.padding;
  constructor(rowStyle: CTable.IRowStyle, colConfig: CTable.ColumnConfig) {
    this.cellBorder = { ...rowStyle.rowBorder };
    this.cellFill = { ...rowStyle.rowFill };
    this.cellFont = { ...rowStyle.rowFont };
    this.cellPadding = { ...rowStyle.rowPadding };
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
