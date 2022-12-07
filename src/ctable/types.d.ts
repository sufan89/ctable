declare namespace CTable {
  /*
   * 表格配置
   * */
  type TableConfig = {
    Columns: Array<ColumnConfig>;
    showCheckBox?: Boolean;
    showIndex?: Boolean;
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
     * 是否固定
     * 默认是FALSE，不固定，TRUE为左固定
     * 可以使用left和right
     * */
    fixed?: true | false | "left" | "right";
    /*
     * 最小宽度
     * */
    minWidth?: string | number;
    /*
     * 内容对齐方式，默认是左对齐
     * */
    align?: "center" | "left" | "right";
  };
}
