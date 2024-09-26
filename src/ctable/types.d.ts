declare namespace CTable {
  /*
   * 表格配置
   * */
  export interface TableConfig {
    /*
     * 表格列配置信息
     * */
    Columns: Array<CTable.ColumnConfig>;
    /*
     * 表头行样式
     *  (headConfig: Array<CTable.ColumnConfig>) => CTable.IRowStyle
     * */
    headRowStyle?: CTable.IRowStyle | Function;
    /*
     * 表头单元格样式
     *  (headConfig: CTable.ColumnConfig) => CTable.ICellStyle
     * */
    headCellStyle?: CTable.ICellStyle | Function;
    /*
     * 单元格样式
     * (
      row: CTable.rowValueType,
      column: CTable.ColumnConfig,
      rowIndex: number,
      columnIndex: number
    ) => CTable.ICellStyle;
     * */
    rowCellStyle?: CTable.ICellStyle | Function;
    /*
     * 表格行样式
     * (row: CTable.rowValueType, rowIndex: number) => CTable.IRowStyle
     */
    rowStyle?: CTable.IRowStyle | Function;
    /*
     * 字体类型
     * */
    baseFont?: CTable.baseFont;
    /*
     * 显示边框
     * 默认显示边框
     * */
    showBorder?: boolean;
    /*
     * 滚轮速率
     * */
    wheelSpeed?: number;
  }
  /*
   * 表格列配置
   * */
  export type ColumnConfig = {
    /*
     * 列名
     * */
    prop: string;
    /*
     * 列标题
     * */
    label: string;
    /*
     * 列宽,为空的话，则根据内容进行计算，设置之后如果当前宽度小于内容宽度，则根据内容宽度进行拉伸；保证列文本能平铺
     * */
    width?: string | number;
    /*
     * 列固定方式
     * */
    fixed?: "left" | "right";
    /*
     * 内容对齐方式，默认是左对齐
     * */
    align?: "start" | "end" | "center" | "left" | "right";
    /*
     * 多级表头
     * */
    children?: Array<ColumnConfig>;
    /*
     * 格式化函数
     * */
    formatter?: (
      row: rowValueType,
      column: ColumnConfig,
      cellValue: cellValueType,
      rowIndex: number
    ) => cellValueType;
    /*
     * 是否排序
     * */
    sortable?: true | "custom" | false;
    /*
     * 单元格类型
     * */
    cellType?: CTable.cellType;
    /*
     * 是否显示tooltip
     * 如果是TRUE，则进行截断，鼠标移入显示tooltip
     * 如果是false,则进行换行处理
     * 默认是false
     * */
    showToolTip?: true | false;
  };
  export interface ITable {
    parentElement: HTMLElement | null;
    tableElement: HTMLCanvasElement | null;
    ctx: CanvasRenderingContext2D | null;
    canvasSize: CTable.size;
    tableHeader: CTable.IRow;
    tableStyle: CTable.ITableStyle;
    tableScrollBar: CTable.IScrollBar;
    tableEvent: CTable.IEventBus;
    viewSize: CTable.size;
    offsetInfo: {
      scrollTop: number;
      scrollLeft: number;
    };
    wheelSpeed: number;
    /*
     * 添加事件
     * */
    on: (eventName: string, callBack: Function, callOnce?: boolean) => void;
    /*
     * 移除事件
     * */
    removeEvent: (eventName: string) => void;
  }
}
