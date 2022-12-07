import { CTable } from "@/ctable";

class CellClass implements CTable.Cell {
  public cellPosition: CTable.position;
  public cellStyle: CTable.cellStyle;
  /**
   * canvas上下文
   */
  private ctx: CanvasRenderingContext2D | null;

  constructor(
    p: CTable.position,
    s: CTable.cellStyle,
    context: CanvasRenderingContext2D
  ) {
    this.cellPosition = p;
    this.cellStyle = s;
    this.ctx = context;
  }
  /*
   * 渲染一个单元格
   * */
  private renderCell() {}
}
export default CellClass;
