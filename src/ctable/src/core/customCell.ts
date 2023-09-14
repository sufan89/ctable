import cellClass from "./cell";
class customCell extends cellClass {
  constructor(
    s: CTable.IRowStyle,
    context: CanvasRenderingContext2D,
    colConfig: CTable.ColumnConfig,
    cellValue: CTable.cellValueType
  ) {
    super(s, context, colConfig, cellValue);
  }
}
export default customCell;
