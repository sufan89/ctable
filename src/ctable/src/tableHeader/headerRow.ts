import textCell from "../core/textCell";
import checkBoxCell from "../core/checkBoxCell";
import imgCell from "../core/imgCell";
import buttonCell from "../core/buttonCell";
import customCell from "../core/customCell";
import rowClass from "../core/row";

class tableHeader extends rowClass {
  /*
   * 计算后的表头表格数据
   * */
  rowCells: Array<CTable.ICell>;
  /*
   * 当前canvas上下文
   * */
  private ctx: CanvasRenderingContext2D;
  /*
   * 当前表格表头配置
   * */
  private headerConfigInfo: Array<CTable.ColumnConfig>;
  /*
   * 行高
   * */
  rowHeight: number;
  /*
   * 表头样式信息
   * */
  private headStyleInfo: CTable.IRowStyle;
  /*
   * 表头
   * */
  constructor(
    ctx: CanvasRenderingContext2D,
    headerConfig: Array<CTable.ColumnConfig>,
    rowStyle: CTable.IRowStyle
  ) {
    super(ctx, rowStyle);
    this.ctx = ctx;
    this.headerConfigInfo = headerConfig;
    this.rowCells = new Array<CTable.ICell>();
    this.rowHeight = 0;
    // 表头样式信息
    this.headStyleInfo = rowStyle;
    // 初始化表头信息
    this.initRow();
    // 计算行大小
    this.calcRowSize();
  }
  /*
   * 初始化
   * */
  private initRow() {
    if (this.headerConfigInfo && this.headerConfigInfo.length > 0) {
      this.rowCells = this.generateHeadCells(this.headerConfigInfo);
    }
  }
  /*
   * 获取表格行单元格
   * */
  getHeadCell(col: CTable.ColumnConfig): CTable.ICell {
    switch (col.cellType) {
      case "text":
        return new textCell(this.headStyleInfo, this.ctx, col, col.label);
      case "checkbox":
        return new checkBoxCell(this.headStyleInfo, this.ctx, col, col.label);
      case "img":
        return new imgCell(this.headStyleInfo, this.ctx, col, col.label);
      case "button":
        return new buttonCell(this.headStyleInfo, this.ctx, col, col.label);
      case "custom":
        return new customCell(this.headStyleInfo, this.ctx, col, col.label);
      default:
        return new textCell(this.headStyleInfo, this.ctx, col, col.label);
    }
  }
  /*
   * 生成表格单元格
   * */
  generateHeadCells(
    colConfig: Array<CTable.ColumnConfig>
  ): Array<CTable.ICell> {
    const cellList = new Array<CTable.ICell>();
    if (colConfig && colConfig.length > 0) {
      colConfig.forEach((col) => {
        const cell = this.getHeadCell(col);
        if (col.children && col.children.length > 0) {
          cell.children?.push(...this.generateHeadCells(col.children));
        }
        // 计算单元格大小
        cell.calcCellSize();
        cellList.push(cell);
      });
    }
    return cellList;
  }
  /*
   * 表头渲染
   * */
  public renderRow(context: CTable.ITable) {
    // 计算行中每个单元格的位置
    this.calcRowCellPosition(
      {
        x: 0,
        y: 0,
        width: context.canvasSize[0],
        height: context.canvasSize[1],
      },
      this.rowCells
    );
    if (this.rowCells && this.rowCells.length > 0) {
      this.rowCells.forEach((cell) => {
        this.renderCell(cell);
      });
    }
  }
  /*
   * 获取表头计算结果
   * */
  public getRowInfo() {
    return this.rowCells;
  }
}
export default tableHeader;
