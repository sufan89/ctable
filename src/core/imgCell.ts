import cellClass from "./cell";
class imgCell extends cellClass {
  constructor(
    s: CTable.IRowStyle,
    context: CanvasRenderingContext2D,
    colConfig: CTable.ColumnConfig,
    cellValue: CTable.cellValueType
  ) {
    super(s, context, colConfig, cellValue);
  }
}
export default imgCell;
