import textCell from "../core/textCell";
import checkBoxCell from "../core/checkBoxCell";
import imgCell from "../core/imgCell";
import buttonCell from "../core/buttonCell";
import customCell from "../core/customCell";
import ICell = CTable.ICell;
import { translatePxToNumber } from "../tools";

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
    // 计算行大小
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
    switch (col.cellType) {
      case "text":
        return new textCell(this.headStyleInfo, this.ctx, col);
      case "checkbox":
        return new checkBoxCell(this.headStyleInfo, this.ctx, col);
      case "img":
        return new imgCell(this.headStyleInfo, this.ctx, col);
      case "button":
        return new buttonCell(this.headStyleInfo, this.ctx, col);
      case "custom":
        return new customCell(this.headStyleInfo, this.ctx, col);
      default:
        return new textCell(this.headStyleInfo, this.ctx, col);
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
        cell.calcCellSize(col.label);
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
        this.renderHeaderCell(cell);
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
   * 绘制表头单元格
   * */
  private renderHeaderCell(headCell: ICell) {
    headCell.renderCell(headCell.columnInfo.label);
    if (headCell.children && headCell.children.length > 0) {
      headCell.children.forEach((child) => {
        this.renderHeaderCell(child);
      });
    }
  }
}
export default tableHeader;
