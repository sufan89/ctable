import headerCell from "./headerCell";

class tableHeader {
  /*
   * 计算后的表头表格数据
   * */
  private headerCells: Array<headerCell>;
  /*
   * 当前canvas上下文
   * */
  private ctx: CanvasRenderingContext2D;
  /*
   * 当前表格表头配置
   * */
  private headerConfigInfo: Array<CTable.ColumnConfig>;
  /*
   * 当前表头高度，取表头单元格中的最大值，保持一直
   * */
  private maxHeaderHeight: number;
  /*
   * 表头
   * */
  constructor(
    ctx: CanvasRenderingContext2D,
    headerConfig: Array<CTable.ColumnConfig>
  ) {
    this.ctx = ctx;
    this.headerConfigInfo = headerConfig;
    this.headerCells = new Array<headerCell>();
    this.maxHeaderHeight = 0;
    this.initHeader();
    this.renderHeader();
  }
  /*
   * 初始化
   * */
  private initHeader() {}
  /*
   * 表头渲染
   * */
  private renderHeader() {}
  /*
   * 获取表头计算结果
   * */
  public getHeaderInfo() {
    return this.headerCells;
  }
}
export default tableHeader;
