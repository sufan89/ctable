import { Guid } from "guid-typescript";
import CellStyleClass from "@/ctable/src/tableStyle/cellStyle";

class CellClass implements CTable.ICell {
  public cellPosition: CTable.position;
  public cellStyle: CTable.ICellStyle;
  public cellKey: string;
  public cellSize: CTable.size = { width: 0, height: 0 };
  public contentSize: CTable.size = { width: 0, height: 0 };
  public cellType: CTable.cellType;
  public children: Array<CTable.ICell>;
  public realVal: CTable.cellValueType;
  public columnInfo: CTable.ColumnConfig;
  public rowHeight: number;
  public headerSize: CTable.size;
  /**
   * canvas上下文
   */
  ctx: CanvasRenderingContext2D;

  constructor(
    s: CTable.IRowStyle,
    context: CanvasRenderingContext2D,
    colConfig: CTable.ColumnConfig,
    cellValue: CTable.cellValueType
  ) {
    this.cellStyle = new CellStyleClass(s, colConfig);
    this.cellKey = Guid.create().toString();
    this.ctx = context;
    this.cellPosition = { x: 0, y: 0 };
    this.cellType = colConfig.cellType || "text";
    this.children = new Array<CTable.ICell>();
    this.realVal = cellValue;
    this.columnInfo = colConfig;
    this.rowHeight = 0;
    this.headerSize = {
      width: 0,
      height: 0,
    };
  }
  /*
   * 渲染一个单元格
   * */
  public renderCell() {
    // 绘制单元格
    this.renderCellBody();
  }
  /*
   * 计算单元格大小
   * */
  calcCellSize() {}
  /*
   * 渲染一个单元格块
   * */
  renderCellBody() {
    //绘制矩形
    const cellHeight = this.getCellHeight();
    const cellWidth =
      this.headerSize.width > 0 ? this.headerSize.width : this.cellSize.width;
    if (this.cellStyle.cellBorder.width !== 0) {
      // 绘制边框
      const cellBorder: CTable.border = this.cellStyle.cellBorder;
      this.ctx.strokeStyle = cellBorder.color;
      this.ctx.lineWidth = cellBorder.width;
      this.ctx.lineJoin = "bevel";
      this.ctx.strokeRect(
        this.cellPosition.x + cellBorder.width,
        this.cellPosition.y + cellBorder.width,
        cellWidth,
        cellHeight
      );
    }
    this.ctx.fillStyle = this.cellStyle.cellFill.color;
    this.ctx.fillRect(
      this.cellPosition.x + this.cellStyle.cellBorder.width,
      this.cellPosition.y + this.cellStyle.cellBorder.width,
      cellWidth,
      cellHeight
    );
  }
  /*
   * 计算当前内容绘制的位置
   * */
  getContentPosition(): CTable.position {
    // 当前实际单元格大小
    const realSize = {
      width: this.cellSize.width,
      height:
        this.cellSize.height > this.rowHeight
          ? this.cellSize.height
          : this.rowHeight,
    };
    const position = {
      x: this.cellStyle.cellPadding.left,
      y: this.cellStyle.cellPadding.top,
    };
    const cellHeight = this.getCellHeight();
    position.y = (cellHeight - this.contentSize.height) / 2;
    // 对齐方式，默认为左对齐
    switch (this.columnInfo.align) {
      case "left":
      case "start":
        position.x = this.cellStyle.cellPadding.left;
        break;
      case "right":
      case "end":
        position.x =
          this.cellSize.width -
          this.contentSize.width -
          this.cellStyle.cellPadding.right;
        break;
      case "center":
        position.x = (realSize.width - this.contentSize.width) / 2;
        break;
      default:
        break;
    }
    return position;
  }
  /*
   * 获取当前单元格大小
   * 如果有子，则计算子的大小
   * 宽度取所有子之和，高度，取当前子最大与当前之和
   * 没有子，则返回当前大小
   * 用于计算行高
   * @return CTable.size
   * */
  public getCellSize(): CTable.size {
    const size = { ...this.cellSize };
    let maxHeight = 0;
    if (this.children && this.children.length > 0) {
      this.children.forEach((cell) => {
        if (cell.children && cell.children.length > 0) {
          const childSize = cell.getCellSize();
          size.width = childSize.width + size.width;
          if (childSize.height > maxHeight) {
            maxHeight = childSize.height;
          }
        } else {
          size.width = cell.cellSize.width + size.width;
          maxHeight =
            cell.cellSize.height > maxHeight ? cell.cellSize.height : maxHeight;
        }
      });
    }
    size.height = maxHeight + size.height;
    return size;
  }
  /*
   * 设置行高
   * */
  public setRowHeight(height: number = 0) {
    this.rowHeight = height;
  }
  /*
   * 获取当前单元格高度
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
export default CellClass;
