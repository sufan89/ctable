/*
 * canvas表格主类
 * @Author 杨贵超
 * */
import headerRow from "./tableHeader";
import tableStyle from "./tableStyle";
import bodyRow from "./tableBody";

class tableClass implements CTable.ITable {
  /**
   * 表格根节点元素
   */
  parentElement: HTMLElement | null;
  /**
   * 表格Element
   */
  tableElement: HTMLCanvasElement;
  /**
   * canvas上下文
   */
  ctx: CanvasRenderingContext2D | null;
  /*
   * 表格配置项
   * */
  tableConfig: CTable.TableConfig;
  /*
   * 当前画布大小,便于计算滚动条位置
   * */
  public canvasSize: [number, number];
  /*
   * 当前活动视口大小
   * */
  public viewSize: [number, number];
  /*
   * 表头信息
   * */
  // @ts-ignore
  tableHeader: CTable.IRow;
  /*
   * 表格样式信息
   * */
  tableStyle: CTable.ITableStyle;
  /*
   * 表格行信息
   * */
  tableBody: Array<CTable.IRow>;
  /*
   * 表格列信息-已进行了平铺
   * */
  tableColumns: Array<CTable.ICell>;
  /**
   * 构造函数
   * @param elm 表格容器元素ID
   * @param tableConfig 表格配置
   * @return CTable 返回表格实例
   */
  constructor(elm: string, tableConfig: CTable.TableConfig) {
    if (!elm && elm === "") {
      console.error("root element is not define");
    }
    // 获取根节点信息
    this.parentElement = document.getElementById(elm);
    this.tableElement = document.createElement("canvas");
    this.tableElement.setAttribute("class", "table-main");
    if (this.parentElement !== null) {
      this.parentElement.appendChild(this.tableElement);
    }
    this.tableConfig = tableConfig;
    this.canvasSize = [0, 0];
    this.viewSize = [0, 0];
    // 表格样式
    this.tableStyle = new tableStyle(this.tableConfig);
    this.tableBody = [];
    this.tableColumns = [];
    this.ctx = this.tableElement.getContext("2d");
    if (!this.ctx) {
      console.error("当前浏览器不支持canvas绘制");
      return;
    }
    // 初始化表头
    this.tableHeader = new headerRow(
      this.ctx,
      this.tableConfig.Columns,
      this.tableStyle.headerRowStyle
    );
    this.changeCanvasSize();
    // 初始化
    this.init();
  }
  /**
   * 根据配置进行初始化
   */
  private init() {
    this.tableHeader.renderRow(this);
    // 平铺表格列信息
    this.flatTableColumns(this.tableHeader.rowCells);
  }
  /*
   * 根据父节点内容，改变画布大小
   * */
  private changeCanvasSize() {
    const boundRect = this.parentElement?.getBoundingClientRect();
    this.tableElement.width = boundRect ? boundRect.width : 200;
    this.tableElement.height = boundRect ? boundRect.height : 200;
    this.canvasSize = [this.tableElement.width, this.tableElement.height];
  }

  /*
   * 重新渲染
   * */
  public reRender() {}

  /*
   * 渲染表格数据
   * @param tableData 表格数据
   * */
  public setTableData(tableData: Array<CTable.rowValueType>) {
    this.ctx?.clearRect(0, 0, this.canvasSize[0], this.canvasSize[1]);
    this.initTableBody(tableData);
  }
  /*
   * 初始化表格行
   * */
  initTableBody(tableData: Array<CTable.rowValueType>) {
    this.tableBody = [];
    let offsetHeight = this.tableHeader.rowHeight;
    tableData.forEach((d) => {
      if (this.ctx) {
        const row = new bodyRow(
          this.ctx,
          this.tableColumns,
          this.tableStyle.tableRowStyle,
          d
        );
        row.calcRowSize();
        row.calcRowCellPosition({
          x: 0,
          y: offsetHeight,
          width: this.canvasSize[0],
          height: this.canvasSize[1],
        });
        offsetHeight = row.rowHeight + offsetHeight;
        // 超过了当前画布大小了，就不进行绘制了，开启滚动条
        // 多渲染一行
        if (offsetHeight - row.rowHeight < this.canvasSize[1]) {
          row.renderRow();
        }
        this.tableBody.push(row);
      }
    });
  }
  /*
   * 平铺表格列
   * */
  flatTableColumns(cols: Array<CTable.ICell>) {
    cols.forEach((col) => {
      if (col.children && col.children.length > 0) {
        this.flatTableColumns(col.children);
      } else {
        // 只保留子节点
        this.tableColumns.push(col);
      }
    });
  }
}

export default tableClass;
