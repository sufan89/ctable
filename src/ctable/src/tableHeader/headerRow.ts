import headerCell from "./headerCell";

class tableHeader implements CTable.IHeadRow {
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
  private headStyleInfo: CTable.IHeaderRowStyle;
  /*
   * 表头
   * */
  constructor(
    ctx: CanvasRenderingContext2D,
    headerConfig: Array<CTable.ColumnConfig>,
    headStyle: CTable.IHeaderRowStyle
  ) {
    this.ctx = ctx;
    this.headerConfigInfo = headerConfig;
    this.rowCells = new Array<CTable.ICell>();
    this.rowHeight = 0;
    // 表头样式信息
    this.headStyleInfo = headStyle;
    // 初始化表头信息
    this.initHeader();
    // 计算行单元格大小
    this.calcRowSize();
  }
  /*
   * 初始化
   * */
  private initHeader() {
    if (this.headerConfigInfo && this.headerConfigInfo.length > 0) {
      this.rowCells = this.generateHeadCells(this.headerConfigInfo);
    }
  }
  /*
   * 获取表格行单元格
   * */
  getHeadCell(col: CTable.ColumnConfig): CTable.ICell {
    return new headerCell(this.headStyleInfo, this.ctx, col);
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
        cell.renderCell(context);
      });
    }
  }
  /*
   * 获取表头计算结果
   * */
  public getHeaderInfo() {
    return this.rowCells;
  }
  /*
   * 计算表头各个单元格大小，并根据大小确定绘制位置
   * */
  public calcRowSize() {
    this.rowHeight = 0;
    if (this.rowCells && this.rowCells.length > 0) {
      this.rowCells.forEach((cell) => {
        cell.calcCellSize();
        // 设置当前行高度
        if (this.rowHeight < cell.cellSize.height) {
          this.rowHeight = cell.cellSize.height;
        }
      });
    }
    // 将单元格设置成行高
    this.rowCells.forEach((cell) => {
      cell.cellSize.height = this.rowHeight;
    });
  }
  /*
   * 计算行所有单元格位置
   * */
  public calcRowCellPosition(
    bbox: { x: number; y: number; width: number; height: number },
    cells: Array<CTable.ICell>
  ) {
    let { x, y, width } = bbox;
    if (cells && cells.length > 0) {
      cells.forEach((cell) => {
        // 为固定列
        if (cell.columnInfo.fixed && cell.columnInfo.fixed === "right") {
          cell.cellPosition = { x: width, y: y };
          width = width - cell.cellSize.height;
        } else {
          cell.cellPosition = { x: x, y: y };
          x = x + cell.cellSize.height;
        }
        if (cell.children && cell.children.length > 0) {
          this.calcRowCellPosition(
            {
              x: cell.cellPosition.x,
              y: cell.cellSize.height,
              width: cell.cellSize.width,
              height: cell.cellSize.height,
            },
            cell.children
          );
        }
      });
    }
  }
}
export default tableHeader;
