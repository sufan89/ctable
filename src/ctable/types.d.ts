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
    headRowStyle?: CTable.IRowStyle | CTable.GetHeaderRowStyle;
    /*
     * 表头单元格样式
     *  (headConfig: CTable.ColumnConfig) => CTable.ICellStyle
     * */
    headCellStyle?: CTable.ICellStyle | CTable.GetHeaderCellStyle;
    /*
     * 表格行样式
     * (row: CTable.rowValueType, rowIndex: number) => CTable.IRowStyle
     */
    rowStyle?: CTable.IRowStyle | CTable.GetRowStyle;
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
    label?: string;
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
    /*
     * 勾选框相关配置
     * */
    checkBoxConfig?: CheckBoxStyle | GetCheckBoxStyle;
    /*
     * 是否可以进行编辑
     * */
    headCellDisabled?: boolean | Function;
    /*
     * 行单元格是否可以编辑
     * */
    rowCellDisabled?: boolean | Function;
    /*
     * 但愿格样式
     * */
    cellStyle?: CTable.ICellStyle | CTable.GetCellStyle;
  };
  /*
   * 获取单元格样式
   * */
  export type GetCellStyle = {
    (
      columnInfo: CTable.ColumnConfig,
      cellValue: CTable.cellValueType
    ): CTable.ICellStyle;
  };
  /*
   * CheckBox样式类型
   * */
  export type CheckBoxStyle = {
    // 勾选宽大小
    size: number;
    // 勾选框背景颜色
    backGround: string;
    // 边框颜色
    borderColor: string;
    // 边框宽度
    borderWidth: number;
    // 禁用状态背景颜色
    disabledColor: string;
    // 禁用状态勾选颜色
    disabledCheckedColor: string;
  };
  /*
   * 获取CheckBoxStyle
   * */
  export type GetCheckBoxStyle = {
    (): CheckBoxStyle;
  };
  /*
   * 获取表格行样式
   * */
  export type GetRowStyle = {
    (rowValue: CTable.rowValueType): CTable.IRowStyle;
  };
  /*
   * 获取表格头样式
   * */
  export type GetHeaderRowStyle = {
    (headerInfo: Array<CTable.ColumnConfig>): CTable.IRowStyle;
  };
  /*
   * 获取表头单元格样式
   * */
  export type GetHeaderCellStyle = {
    (colInfo: CTable.ColumnConfig): CTable.ICellStyle;
  };
  /*
   * 表格事件名称
   * */
  export type TableEventName =
    | "CellClick"
    | "RowClick"
    | "HeaderClick"
    | "HeaderCellClick"
    | "CellMouseEnter"
    | "CellMouseLeave"
    | "CellDoubleClick"
    | "RowDoubleClick";

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
    reRender: Function;
    wheelSpeed: number;
    /*
     * 添加事件
     * */
    on: (eventName: string, callBack: Function, callOnce?: boolean) => void;
    /*
     * 移除事件
     * */
    removeEvent: (eventName: string) => void;
    /*
     * 当前绘制的行数据
     * */
    viewRows: Array<CTable.IRow>;
  }
}
