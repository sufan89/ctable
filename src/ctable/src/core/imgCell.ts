import cellClass from "./cell";
class imgCell extends cellClass {
  constructor(
    s: CTable.IRowStyle,
    context: CanvasRenderingContext2D,
    colConfig: CTable.ColumnConfig
  ) {
    super(s, context, colConfig);
  }
}
export default imgCell;
