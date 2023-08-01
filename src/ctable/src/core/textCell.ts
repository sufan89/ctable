import { translatePxToNumber } from "@/ctable/src/tools";
import cellClass from "./cell";

class textCell extends cellClass {
  constructor(
    s: CTable.IRowStyle,
    context: CanvasRenderingContext2D,
    colConfig: CTable.ColumnConfig
  ) {
    super(s, context, colConfig);
  }
  /*
   * 渲染一个单元格
   * */
  public renderCell(cellValue: CTable.cellValueType) {
    // 绘制单元格
    super.renderCell(cellValue);
    this.renderTextCell(cellValue as string);
  }
  /*
   * 根据单元格内容，丈量单元格的大小
   * */
  public calcCellSize(val: string) {
    if (this.ctx) {
      this.ctx.font = this.cellStyle.getFont();
      this.ctx.textAlign = this.cellStyle.cellFont.textAlign;
      this.ctx.textBaseline = this.cellStyle.cellFont.textBaseline;
      const textMetrics = this.ctx.measureText(val);
      this.contentSize = {
        width: textMetrics.width,
        height: translatePxToNumber(this.cellStyle.cellFont.fontSize, "px"),
      };
    }
    // 有子，则当前单元格宽度是所有子宽度之和
    let cellWidth = 0;
    if (this.children && this.children.length > 0) {
      this.children.forEach((childCell) => {
        cellWidth = childCell.cellSize.width + cellWidth;
      });
    } else {
      cellWidth =
        this.contentSize.width +
        this.cellStyle.cellPadding.right +
        this.cellStyle.cellPadding.left;
    }
    // 当前单元格宽带为内容宽度+内边距宽度
    this.cellSize = {
      width: cellWidth,
      height:
        this.contentSize.height +
        this.cellStyle.cellPadding.top +
        this.cellStyle.cellPadding.bottom,
    };
  }
  /*
   * 渲染文本单元格
   * */
  renderTextCell(val: string) {
    if (this.ctx) {
      this.ctx.font = this.cellStyle.getFont();
      this.ctx.textAlign = this.cellStyle.cellFont.textAlign;
      this.ctx.textBaseline = this.cellStyle.cellFont.textBaseline;
      this.ctx.fillStyle = this.cellStyle.cellFont.fontColor;
      const contentPosition = this.getContentPosition();
      this.ctx.fillText(
        val,
        this.cellPosition.x + contentPosition.x,
        this.cellPosition.y + contentPosition.y,
        this.cellSize.width
      );
    }
  }
  /*
   * 设置行高
   * */
  public setRowHeight(height: number = 0) {
    this.rowHeight = height;
  }
  /*
   * 获取当前单元格高度
   * 如果当前单元格没有子且单元格高度小于行高，取行高，保持每一行的所有单元格高度一致
   * 如果有子，则取当前的高度，
   * */
  getCellHeight(): number {
    // 有子，获取所有子的最大高度
    if (this.children && this.children.length > 0) {
      return this.cellSize.height;
    }
    // 没有子，则取行高与当前单元格最大
    return this.cellSize.height < this.rowHeight
      ? this.rowHeight
      : this.cellSize.height;
  }
}
export default textCell;
