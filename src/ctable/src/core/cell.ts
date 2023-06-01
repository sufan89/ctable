import { Guid } from "guid-typescript";
import { translatePxToNumber } from "@/ctable/src/tools";
import CellStyleClass from "@/ctable/src/tableStyle/cellStyle";

class CellClass implements CTable.ICell {
  public cellPosition: CTable.position;
  public cellStyle: CTable.ICellStyle;
  public cellKey: string;
  public cellSize: CTable.size = { width: 0, height: 0 };
  public contentSize: CTable.size = { width: 0, height: 0 };
  public cellType: "text";
  public children: Array<CTable.ICell>;
  public realVal: string;
  public columnInfo: CTable.ColumnConfig;
  /**
   * canvas上下文
   */
  private ctx: CanvasRenderingContext2D | null;

  constructor(
    s: CTable.IRowStyle,
    context: CanvasRenderingContext2D,
    colConfig: CTable.ColumnConfig
  ) {
    this.cellStyle = new CellStyleClass(s, colConfig);
    this.cellKey = Guid.create().toString();
    this.ctx = context;
    this.cellPosition = { x: 0, y: 0 };
    this.cellType = "text";
    this.children = new Array<CTable.ICell>();
    this.realVal = "";
    this.columnInfo = colConfig;
  }
  /*
   * 渲染一个单元格
   * */
  public renderCell(context: CTable.ITable, cellValue: string) {
    // 绘制单元格
    this.renderCellBody();
    // 绘制内容
    if (this.cellType === "text") {
      this.renderTextCell(context, cellValue);
    }
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
    // 当前单元格宽带为内容宽度+内边距宽度
    this.cellSize = {
      width:
        this.contentSize.width +
        this.cellStyle.cellPadding.right +
        this.cellStyle.cellPadding.left,
      height:
        this.contentSize.height +
        this.cellStyle.cellPadding.top +
        this.cellStyle.cellPadding.bottom,
    };
  }
  /*
   * 渲染文本单元格
   * */
  renderTextCell(context: CTable.ITable, val: string) {
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
   * 渲染一个单元格块
   * */
  renderCellBody() {
    if (this.ctx) {
      //绘制矩形
      this.ctx.fillStyle = this.cellStyle.cellFill.color;
      this.ctx.fillRect(
        this.cellPosition.x - this.cellStyle.cellBorder.width,
        this.cellPosition.y - this.cellStyle.cellBorder.width,
        this.cellSize.width - this.cellStyle.cellBorder.width,
        this.cellSize.height - this.cellStyle.cellBorder.width
      );
      // 绘制边框
      this.ctx.fillStyle = this.cellStyle.cellBorder.color;
      this.ctx.lineWidth = this.cellStyle.cellBorder.width;
      this.ctx.strokeRect(
        this.cellPosition.x,
        this.cellPosition.y,
        this.cellSize.width,
        this.cellSize.height
      );
    }
  }
  /*
   * 计算当前内容绘制的位置
   * */
  getContentPosition(): { x: number; y: number } {
    const position = { x: 0, y: 0 };
    // 对齐方式，默认为左对齐
    position.y = this.cellSize.height - this.contentSize.height;
    switch (this.cellStyle.cellFont.textAlign) {
      case "left":
      case "start":
        position.x = this.cellStyle.cellPadding.left;
        break;
      case "right":
      case "end":
        position.x = this.cellSize.width - this.cellStyle.cellPadding.right;
        break;
      case "center":
        position.x = this.cellSize.width / 2;
        break;
    }
    return position;
  }
  /*
   * 获取当前单元格大小
   * 如果有子，则计算子的大小
   * 没有子，则返回当前大小
   * 用于计算行高
   * */
  public getCellSize(): CTable.size {
    const size = { ...this.cellSize };
    if (this.children && this.children.length > 0) {
    }
    return size;
  }
}
export default CellClass;
