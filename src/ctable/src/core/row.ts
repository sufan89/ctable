class rowClass implements CTable.IRow {
  rowCells: Array<CTable.ICell>;
  rowHeight: number;
  rowStyle: CTable.IRowStyle;
  constructor(ctx: CanvasRenderingContext2D, rowStyle: CTable.IRowStyle) {
    this.rowHeight = 0;
    this.rowCells = [];
    this.rowStyle = rowStyle;
  }
  // eslint-disable-next-line no-unused-vars
  renderRow(context: CTable.ITable) {}
  /*
   * 计算表头各个单元格大小，并根据大小确定绘制位置
   * */
  public calcRowSize() {
    this.rowHeight = 0;
    if (this.rowCells && this.rowCells.length > 0) {
      this.rowCells.forEach((cell) => {
        // 设置当前行高度
        const cellSize = cell.getCellSize();
        if (this.rowHeight < cellSize.height) {
          this.rowHeight = cellSize.height;
        }
      });
    }
    // 将单元格设置成行高
    this.rowCells.forEach((cell) => {
      cell.setRowHeight(this.rowHeight);
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
          x = x + cell.cellSize.width;
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
  /*
   * 绘制行单元格
   * */
  renderCell(headCell: CTable.ICell) {
    headCell.renderCell();
    if (headCell.children && headCell.children.length > 0) {
      headCell.children.forEach((child) => {
        this.renderCell(child);
      });
    }
  }
  /*
   * 获取行宽度
   * */
  getRowWidth() {
    let width = 0;
    this.rowCells.forEach((r) => {
      width = r.cellSize.width + width;
    });
    return width;
  }
}
export default rowClass;
