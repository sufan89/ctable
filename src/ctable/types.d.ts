declare namespace CTable {
  /*
   * 表格配置
   * */
  type TableConfig = {
    /*
     * 表格列配置信息
     * */
    Columns: Array<ColumnConfig>;
    /*
     * 是否显示CheckBox列
     * */
    showCheckBox?: Boolean;
    /*
     * 是否显示序号列
     * */
    showIndex?: Boolean;
    /*
     * 表头行样式
     * */
    headRowStyle?: Function;
    /*
     * 表头单元格样式
     * */
    headCellStyle?: Function;
    /*
     * 单元格样式
     * */
    rowCellStyle?: Function;
    /*
     * 字体类型
     * */
    baseFont?: baseFont;
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
     * 列宽
     * */
    width?: string | number;
    /*
     * 列固定方式
     * */
    fixed?: "left" | "right";
    /*
     * 最小宽度
     * */
    minWidth?: string | number;
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
    formatter?: Function;
  };
  interface ITable {
    parentElement: HTMLElement | null;
    tableElement: HTMLCanvasElement | null;
    ctx: CanvasRenderingContext2D | null;
    canvasSize: [number, number];
    tableHeader: CTable.IHeadRow | undefined;
    tableStyle: CTable.ITableStyle;
  }
}
