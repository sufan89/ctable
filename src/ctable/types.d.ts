declare namespace CTable {
  /*
   * 表格配置
   * */
  export type TableConfig = {
    /*
     * 表格列配置信息
     * */
    Columns: Array<ColumnConfig>;
    /*
     * 表头行样式
     * */
    headRowStyle?: (headConfig: Array<ColumnConfig>) => IRowStyle;
    /*
     * 表头单元格样式
     * */
    headCellStyle?: (headConfig: ColumnConfig) => ICellStyle;
    /*
     * 单元格样式
     * */
    rowCellStyle?: (
      row: IRowValue,
      column: ColumnConfig,
      rowIndex: number,
      columnIndex: number
    ) => ICellStyle;
    /*
     * 表格行样式
     * */
    rowStyle?: (row: IRowValue, rowIndex: number) => IRowStyle;
    /*
     * 字体类型
     * */
    baseFont?: baseFont;
    /*
     * 显示边框
     * 默认显示边框
     * */
    showBorder?: boolean;
  };
  /*
   * 表格列配置
   * */
  type ColumnConfig = {
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
      row: IRowValue,
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
    canvasSize: [number, number];
    tableHeader: CTable.IRow;
    tableStyle: CTable.ITableStyle;
  }
}
