/*
 * canvas表格主类
 * @Author 杨贵超
 * */
import headerRow from "./tableHeader";
import tableStyle from "./tableStyle";

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
  private tableConfig: CTable.TableConfig;
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
  tableHeader: CTable.IHeadRow | undefined;
  /*
   * 表格样式信息
   * */
  tableStyle: CTable.ITableStyle;
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
    this.ctx = this.tableElement.getContext("2d");
    this.canvasSize = [0, 0];
    this.viewSize = [0, 0];
    this.changeCanvasSize();
    // 表格样式
    this.tableStyle = new tableStyle(tableConfig);
    /*
     * 获取表头信息
     * */
    if (this.ctx) {
      this.tableHeader = new headerRow(
        this.ctx,
        tableConfig.Columns,
        this.tableStyle.headerRowStyle
      );
    } else {
      this.tableHeader = undefined;
    }
    // 初始化
    this.init();
  }
  /**
   * 根据配置进行初始化
   */
  private init() {
    if (this.tableHeader) {
      this.tableHeader.renderRow(this);
    }
    console.log(this.tableStyle, this.tableHeader, "this.tableStyle");
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
    // if (this.tableHeaders && this.tableHeaders.length > 0) {
    //   this.tableHeaders.forEach((col, index) => {
    //     if (this.ctx !== null) {
    //       this.ctx.font = "18px Microsoft YaHei";
    //       this.ctx.textAlign = "center";
    //       this.ctx.textBaseline = "middle";
    //       const cellTextWidth = this.ctx.measureText(col.label).width;
    //       this.ctx.fillText(col.label, 0 + index * 200, 10, 100 + index * 100);
    //     }
    //   });
    // }
  }
}

export default tableClass;
