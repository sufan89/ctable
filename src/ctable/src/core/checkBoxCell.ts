import cellClass from "./cell";
class checkBoxCell extends cellClass {
  constructor(
    s: CTable.IRowStyle,
    context: CanvasRenderingContext2D,
    colConfig: CTable.ColumnConfig
  ) {
    super(s, context, colConfig);
  }
}
export default checkBoxCell;
