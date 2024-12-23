class rowClass implements CTable.IRow {
  rowCells: Array<CTable.ICell>;
  rowHeight: number;
  rowStyle: CTable.IRowStyle;
  isMouseSelect: boolean;
  constructor(ctx: CanvasRenderingContext2D, rowStyle: CTable.IRowStyle) {
    this.rowHeight = 0;
    this.rowCells = [];
    this.rowStyle = rowStyle;
    this.isMouseSelect = false;
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
      // 右固定列信息
      const rightCells: Array<CTable.ICell> = cells.filter(
        (c) => c.columnInfo.fixed && c.columnInfo.fixed === "right"
      );
      // 左固定列信息
      const leftCells: Array<CTable.ICell> = cells.filter(
        (c) => c.columnInfo.fixed && c.columnInfo.fixed === "left"
      );
      // 不固定列信息
      const unFixedCells: Array<CTable.ICell> = cells.filter(
        (c) => c.columnInfo.fixed === undefined
      );
      let leftPosition: number = 0;
      let rightPosition: number = width;
      // 计算左固定列位置，
      if (leftCells.length > 0) {
        leftCells.forEach((cell) => {
          cell.cellPosition = { x: leftPosition, y: y };
          leftPosition = cell.cellSize.width + leftPosition;
        });
      }
      // 计算右固定列位置
      if (rightCells.length > 0) {
        rightCells.forEach((cell) => {
          rightPosition = rightPosition - cell.cellSize.width;
          cell.cellPosition = { x: rightPosition, y: y };
        });
      }
      // 技术不固定列位置
      if (unFixedCells.length > 0) {
        unFixedCells.forEach((cell) => {
          cell.cellPosition = { x: leftPosition + x, y: y };
          x = x + cell.cellSize.width;
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
  /*
   * 设置行是否被鼠标移动选中
   * */
  setMouseSelect(isSelect: boolean = false) {
    this.rowCells.forEach((cell) => {
      cell.isMouseSelectRow = isSelect;
      if (!isSelect) {
        // 如果未选中行，则将当前行所有单元格设置为鼠标未选中
        cell.setMouseSelect(false);
      }
    });
  }
}
export default rowClass;
