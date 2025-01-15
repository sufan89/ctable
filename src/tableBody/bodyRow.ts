import textCell from "../core/textCell";
import checkBoxCell from "../core/checkBoxCell";
import imgCell from "../core/imgCell";
import buttonCell from "../core/buttonCell";
import customCell from "../core/customCell";
import rowClass from "../core/row";

class bodyRow extends rowClass {
  /*
   * 行单元格集合
   * */
  rowCells: Array<CTable.ICell>;
  /*
   * 行高
   * */
  rowHeight: number;
  /*
   * 当前canvas上下文
   * */
  private ctx: CanvasRenderingContext2D;
  /*
   * 当前表格表头配置
   * */
  private headerConfigInfo: Array<CTable.ICell>;
  /*
   * 行样式信息
   * */
  private bodyRowStyle: CTable.IRowStyle;
  /*
   * 行数据
   * */
  private rowData: CTable.rowValueType;
  /*
   * 行索引
   * */
  private rowIndex: number;
  constructor(
    ctx: CanvasRenderingContext2D,
    headerConfig: Array<CTable.ICell>,
    bodyRowStyle: CTable.IRowStyle,
    rowData: CTable.rowValueType
  ) {
    super(ctx, bodyRowStyle);
    this.rowCells = Array<CTable.ICell>();
    this.rowHeight = 0;
    this.rowIndex = 0;
    this.ctx = ctx;
    this.headerConfigInfo = headerConfig;
    this.bodyRowStyle = bodyRowStyle;
    this.rowData = rowData;
    this.initBodyRow();
    // 计算行大小
    this.calcRowSize();
  }
  /*
   * 初始化行
   * */
  initBodyRow() {
    if (this.headerConfigInfo && this.headerConfigInfo.length > 0) {
      // 生成表格行单元格
      this.headerConfigInfo.forEach((col) => {
        const rowCell = this.getRowCell(col);
        this.rowCells.push(rowCell);
      });
    }
  }
  /*
   * 渲染行
   * */
  renderRow() {
    // 先渲染未固定列
    this.rowCells
      .filter((c) => c.columnInfo.fixed === undefined)
      .forEach((cell) => {
        cell.renderCell();
      });
    // 渲染固定列
    this.rowCells
      .filter((c) => c.columnInfo.fixed)
      .forEach((cell) => {
        cell.renderCell();
      });
  }
  /*
   * 生成行单元格
   * */
  getRowCell(headCell: CTable.ICell): CTable.ICell {
    let newCell: CTable.ICell;
    const colConfig = headCell.columnInfo;
    let cellVal = this.rowData[colConfig.prop];
    // 如果需要进行格式化
    if (colConfig.formatter) {
      cellVal = colConfig.formatter(
        this.rowData,
        headCell.columnInfo,
        cellVal,
        this.rowIndex
      );
    }
    switch (colConfig.cellType) {
      case "text":
        newCell = new textCell(this.bodyRowStyle, this.ctx, colConfig, cellVal);
        break;
      case "checkbox":
        newCell = new checkBoxCell(
          this.bodyRowStyle,
          this.ctx,
          colConfig,
          cellVal
        );
        break;
      case "img":
        newCell = new imgCell(this.bodyRowStyle, this.ctx, colConfig, cellVal);
        break;
      case "button":
        newCell = new buttonCell(
          this.bodyRowStyle,
          this.ctx,
          colConfig,
          cellVal
        );
        break;
      case "custom":
        newCell = new customCell(
          this.bodyRowStyle,
          this.ctx,
          colConfig,
          cellVal
        );
        break;
      default:
        newCell = new textCell(this.bodyRowStyle, this.ctx, colConfig, cellVal);
        break;
    }
    // 表头大小
    newCell.headerSize = headCell.cellSize;
    newCell.calcCellSize();
    return newCell;
  }
  /*
   * 计算行位置与行单元格位置
   * */
  public calcRowCellPosition(bbox: {
    x: number;
    y: number;
    width: number;
    height: number;
  }) {
    let { x, y, width } = bbox;
    if (this.rowCells && this.rowCells.length > 0) {
      const rightCells = this.rowCells.filter(
        (t) => t.columnInfo.fixed && t.columnInfo.fixed === "right"
      );
      const leftCells = this.rowCells.filter(
        (c) => c.columnInfo.fixed && c.columnInfo.fixed === "left"
      );
      const unFixedCells = this.rowCells.filter(
        (c) => c.columnInfo.fixed === undefined
      );
      let leftPosition: number = 0;
      let rightPosition: number = width;
      // 计算左固定单元格位置
      leftCells.forEach((cell) => {
        cell.cellPosition = { x: leftPosition, y: y };
        leftPosition = cell.cellSize.width + leftPosition;
      });
      rightCells.forEach((cell) => {
        rightPosition = rightPosition - cell.cellSize.width;
        cell.cellPosition = { x: rightPosition, y: y };
      });
      unFixedCells.forEach((cell) => {
        cell.cellPosition = { x: leftPosition + x, y: y };
        x = x + cell.cellSize.width;
      });
    }
  }
  getRowData(): CTable.rowValueType | Array<CTable.ColumnConfig> {
    return this.rowData;
  }
}
export default bodyRow;
