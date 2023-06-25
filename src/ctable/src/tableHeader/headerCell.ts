import CellClass from "@/ctable/src/core/cell";
import { translatePxToNumber } from "@/ctable/src/tools";

class headerCell extends CellClass {
  constructor(
    s: CTable.IRowStyle,
    context: CanvasRenderingContext2D,
    colConfig: CTable.ColumnConfig
  ) {
    super(s, context, colConfig);
    // 这里可以根据配置对渲染的表头进行控制，控制表头绘制成文本，还是其他内容
    this.cellType = "text";
  }
  /*
   * 绘制单元格
   * */
  public renderCell(context: CTable.ITable) {
    super.renderCell(context, this.columnInfo.label);
    if (this.children && this.children.length > 0) {
      this.children.forEach((c) => {
        c.renderCell(context, c.columnInfo.label);
      });
    }
  }
  /*
   * 计算单元格大小
   * */
  public calcCellSize() {
    switch (this.cellType) {
      case "text":
        super.calcCellSize(this.columnInfo.label);
        break;
      default:
        super.calcCellSize("");
        break;
    }
    // 计算当前单元格大小
    this.cellSize = this.getRealCellSize();
  }
  /*
   * 根据当前的列配置信息，计算当前单元格实际的宽度
   * 如果配置了列宽度，则以配置为准
   * 如果有子列，则当前单元格宽度为所有子列之和
   * 如果没有配置列宽度，则以当前文本宽度加内边距加边框宽度
   * */
  getRealCellSize(): { width: number; height: number } {
    let width = 0;
    const height = this.cellSize.height;
    // 有子，先计算子的宽度
    if (this.children && this.children.length > 0) {
      this.children.forEach((c) => {
        c.calcCellSize();
        // 宽度取所有子宽度之和
        width = width + c.cellSize.width;
      });
    } else {
      // 没有子，但是列配置了宽度，则取列宽度
      if (this.columnInfo.width) {
        width =
          translatePxToNumber(this.columnInfo.width, "px") ||
          this.cellSize.width;
      } else {
        // 没有配置列宽度，取当前内容的宽度
        width = this.cellSize.width;
      }
    }
    return {
      width: width,
      height: height,
    };
  }
}
export default headerCell;
