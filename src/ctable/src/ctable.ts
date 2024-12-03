/*
 * canvas表格主类
 * @Author 杨贵超
 * */
import headerRow from "./tableHeader";
import tableStyle from "./tableStyle";
import bodyRow from "./tableBody";
import scrollBarClass from "./scrollBar";
import eventBus from "./event/event";
import TableEventClass from "./event/tableEvent";

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
  public canvasSize: CTable.size;
  /*
   * 当前活动视口大小
   * */
  viewSize: CTable.size;
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
  /*
   * 表格滚动条
   * */
  tableScrollBar: CTable.IScrollBar;
  /*
   * 表格事件
   * */
  tableEvent: CTable.IEventBus;
  /*
   * 鼠标滚动速率
   * */
  wheelSpeed: number;
  /*
   * 当前滚动的偏移量
   * */
  offsetInfo: {
    scrollTop: number;
    scrollLeft: number;
  };
  /*
   * 当前按下键盘按钮code
   * */
  pressKeyCode: string;
  /*
   * 当前鼠标指针是否在画布内
   * */
  isMouseIn: boolean;
  /*
   * 表格事件，处理表格事件相关
   * */
  tableEventObj: CTable.ITableEvent;

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
    const { wheelSpeed } = tableConfig;
    if (wheelSpeed) {
      this.wheelSpeed = wheelSpeed;
    } else {
      this.wheelSpeed = 0.5;
    }
    this.pressKeyCode = "";
    this.isMouseIn = false;
    this.offsetInfo = { scrollTop: 0, scrollLeft: 0 };
    // 初始化表格事件
    this.tableEvent = new eventBus();
    this.tableEventObj = new TableEventClass(this);
    /*
     * 表格滚动条
     * */
    this.tableScrollBar = new scrollBarClass(this.parentElement);
    this.tableScrollBar.addEvent("scroll", this.scrollEvent.bind(this));
    this.tableConfig = tableConfig;
    this.canvasSize = {
      width: 0,
      height: 0,
    };
    this.viewSize = {
      width: 0,
      height: 0,
    };
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
    // 根据父节点调整表格尺寸
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
    // 设置滚动条宽度
    this.tableScrollBar.setTableSize({
      height: 0,
      width: this.tableHeader.getRowWidth(),
    });
    // 重新设置可视区域大小
    this.tableScrollBar.setViewSize({
      width: this.tableElement.width,
      height: this.tableElement.height - this.tableHeader.rowHeight,
    });
  }

  /*
   * 根据父节点内容，改变画布大小
   * */
  private changeCanvasSize() {
    const boundRect = this.parentElement?.getBoundingClientRect();
    this.tableElement.width = boundRect ? boundRect.width : 200;
    this.tableElement.height = boundRect ? boundRect.height : 200;
    this.viewSize = {
      width: this.tableElement.width,
      height: this.tableElement.height,
    };
    this.tableScrollBar.setViewSize(this.viewSize);
  }

  /*
   * 重新渲染-刷新
   * */
  public reRender() {}

  /*
   * 渲染表格数据
   * @param tableData 表格数据
   * */
  public setTableData(tableData: Array<CTable.rowValueType>) {
    this.offsetInfo = { scrollTop: 0, scrollLeft: 0 };
    this.initTableBody(tableData);
  }

  /*
   * 初始化表格行
   * */
  initTableBody(tableData: Array<CTable.rowValueType>) {
    this.tableBody = [];
    // 表头高度
    let offsetHeight = this.tableHeader.rowHeight;
    let bodyHeight: number = 0;
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
          width: this.viewSize.width,
          height: this.viewSize.height,
        });
        offsetHeight = row.rowHeight + offsetHeight;
        bodyHeight = bodyHeight + row.rowHeight;
        // 超过了当前画布大小了，就不进行绘制了，开启滚动条
        // 多渲染一行
        if (offsetHeight - row.rowHeight < this.viewSize.height) {
          row.renderRow();
        }
        this.tableBody.push(row);
      }
    });
    this.tableScrollBar.setTableSize({
      width: this.tableHeader.getRowWidth(),
      height: bodyHeight,
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

  /*
   * 滚动条事件
   * */
  scrollEvent(data: {
    scrollTop: number;
    scrollHeight: number;
    scrollLeft: number;
    scrollWidth: number;
  }) {
    const { scrollTop, scrollLeft } = data;
    // 偏移进行绘制
    this.offsetRender({ scrollTop, scrollLeft });
  }

  /*
   * 偏移渲染
   * */
  offsetRender(data: { scrollTop: number; scrollLeft: number }) {
    const { scrollTop = 0, scrollLeft = 0 } = data;
    this.offsetInfo = data;
    //  清空绘制区域
    this.ctx?.clearRect(0, 0, this.viewSize.width, this.viewSize.height);
    // 绘制表格区域
    let offsetHeight: number = this.tableHeader.rowHeight - scrollTop;
    for (let index = 0; index < this.tableBody.length; index++) {
      const bodyRow: CTable.IRow = this.tableBody[index];
      bodyRow.calcRowCellPosition({
        x: -scrollLeft,
        y: offsetHeight,
        width: this.viewSize.width,
        height: this.viewSize.height,
      });
      offsetHeight = offsetHeight + bodyRow.rowHeight;
      if (offsetHeight - bodyRow.rowHeight < this.viewSize.height) {
        bodyRow.renderRow();
      } else {
        break;
      }
    }
    // 最后绘制表头
    this.tableHeader.renderRow(this, -scrollLeft);
  }

  /*
   * 添加事件
   * */
  on(eventName: string, callBack: Function, callOnce?: boolean) {
    if (callOnce) {
      this.tableEvent.subscribeOnce(eventName, callBack);
    } else {
      this.tableEvent.subscribe(eventName, callBack);
    }
  }

  /*
   * 移除事件
   * */
  removeEvent(eventName: string) {
    this.tableEvent.clearEvent(eventName);
  }
}

export default tableClass;
