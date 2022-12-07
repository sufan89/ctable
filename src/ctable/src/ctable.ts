/*
 * canvas表格主类
 * @Author 杨贵超
 * */
class CTable {
  /**
   * 表格根节点元素
   */
  private parentElement: HTMLElement | null;
  /**
   * 表格Element
   */
  private tableElement: HTMLCanvasElement;
  /**
   * canvas上下文
   */
  private ctx: CanvasRenderingContext2D | null;
  /*
   * 表格配置项
   * */
  private TableConfig: CTable.TableConfig;
  /*
   * 当前画布大小,便于计算滚动条位置
   * */
  private canvasSize: [Number, Number];
  /*
   * 表头信息
   * */
  private tableHeaders: Array<CTable.ColumnConfig>;

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
    this.tableHeaders = tableConfig.Columns;
    // 获取根节点信息
    this.parentElement = document.getElementById(elm);
    this.tableElement = document.createElement("canvas");
    this.tableElement.className = "table-main";
    if (this.parentElement !== null) {
      this.parentElement.appendChild(this.tableElement);
    }
    this.ctx = this.tableElement.getContext("2d");
    this.TableConfig = tableConfig;
    this.canvasSize = [0, 0];
    this.changeCanvasSize();
    // 初始化
    this.init();
  }
  /**
   * 根据配置进行初始化
   */
  private init() {
    // 绘制表头
    this.drawTableHeader();
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
  public setTableData(tableData: Array<object>) {
    console.log(tableData);
  }

  /*
   * 绘制表头
   * */
  drawTableHeader() {
    if (this.tableHeaders && this.tableHeaders.length > 0) {
      this.tableHeaders.forEach((col, index) => {
        if (this.ctx !== null) {
          this.ctx.font = "12px Microsoft YaHei";
          this.ctx.textAlign = "center";
          console.log(this.ctx.measureText(col.label), "文本宽度");
          this.ctx.fillText(col.label, 0 + index * 200, 10, 100 + index * 100);
        }
      });
    }
  }
}

export default CTable;
