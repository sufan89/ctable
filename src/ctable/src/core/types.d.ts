/*
 * 渲染核心
 * */
declare namespace CTable {
  /*
   * 单元格绘制接口
   * */
  export interface ICell {
    cellPosition: CTable.position;
    cellStyle: CTable.ICellStyle;
    cellKey: string;
    // 单元格大小
    cellSize: CTable.size;
    // 内容大小
    contentSize: CTable.size;
    // 子单元格
    children?: Array<CTable.ICell>;
    // 单元格类型
    cellType: CTable.cellType;
    // 实际内容
    realVal: CTable.cellValueType;
    // 绘制单元格
    renderCell: Function;
    // 计算单元格大小
    calcCellSize: Function;
    // 列配置信息
    columnInfo: CTable.ColumnConfig;
    // 获取单元格大小，包括子所有子单元格大小
    getCellSize: Function;
    // 行高
    rowHeight: number;
    // 设置行高
    setRowHeight: Function;
    // 表头大小
    headerSize: CTable.size;
    /*
     * 获取单元格值
     * */
    getCellValue: () => CTable.cellValueType;
    /*
     * 禁用状态
     * */
    disabled: boolean;
    /*
     * 当前行是否被鼠标选中
     * */
    isMouseSelectRow: boolean;
    /*
     * 当前单元格是否被鼠标选中
     * */
    isMouseSelect: boolean;
    /*
     * 设置当前单元格鼠标选中状态
     * */
    setMouseSelect: (isSelect: boolean) => void;
  }
  /*
   * 位置
   * */
  export type position = {
    x: number;
    y: number;
  };
  /*
   * 尺寸
   * */
  export type size = {
    width: number;
    height: number;
  };
  /*
   * 单元格内容类型
   * */
  export type cellValueType = string | number | object | [] | null | undefined;
  /*
   * 单元格类型
   * */
  export type cellType = "text" | "button" | "checkbox" | "custom" | "img";
  /*
   * 表格行接口
   * */
  export interface IRow {
    /*
     * 表格行下所有单元格信息
     * */
    rowCells: Array<CTable.ICell>;
    /*
     * 渲染行
     * */
    renderRow: Function;
    /*
     * 行高
     * */
    rowHeight: number;
    /*
     * 行样式
     * */
    rowStyle: CTable.IRowStyle;
    renderCell: Function;
    /*
     * 获取当前行宽度
     * */
    getRowWidth: () => number;
    /*
     * 计算当前行单元格尺寸
     * */
    calcRowCellPosition: Function;
    /*
     * 是否鼠标选中
     * */
    isMouseSelect: boolean;
    /*
     * 设置当前行选中状态
     * */
    // eslint-disable-next-line no-unused-vars
    setMouseSelect: (isSelect: boolean) => void;
  }
  /*
   * 表格行数据类型
   * */
  export type rowValueType = {
    [key: string]: CTable.cellValueType;
  };
}
