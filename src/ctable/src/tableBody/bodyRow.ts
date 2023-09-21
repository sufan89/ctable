import textCell from "@/ctable/src/core/textCell";
import checkBoxCell from "@/ctable/src/core/checkBoxCell";
import imgCell from "@/ctable/src/core/imgCell";
import buttonCell from "@/ctable/src/core/buttonCell";
import customCell from "@/ctable/src/core/customCell";
import rowClass from "@/ctable/src/core/row";
import cellValueType = CTable.cellValueType;

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
    this.rowCells.forEach((cell) => {
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
      this.rowCells.forEach((cell) => {
        // 为固定列
        if (cell.columnInfo.fixed && cell.columnInfo.fixed === "right") {
          cell.cellPosition = { x: width, y: y };
          width = width - cell.cellSize.width;
        } else {
          cell.cellPosition = { x: x, y: y };
          x = x + cell.cellSize.width;
        }
      });
    }
  }
}
export default bodyRow;
