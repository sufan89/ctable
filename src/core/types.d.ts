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
    renderCell: () => void;
    // 计算单元格大小
    calcCellSize: () => void;
    // 列配置信息
    columnInfo: CTable.ColumnConfig;
    // 获取单元格大小，包括子所有子单元格大小
    getCellSize: () => CTable.size;
    // 行高
    rowHeight: number;
    // 设置行高
    setRowHeight: (height: number) => void;
    // 表头大小
    headerSize: CTable.size;
    /*
     * 获取单元格值
     * */
    getCellValue: () => CTable.cellValueType | CTable.checkBoxValueType;
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
    /*
     * 获取当前内容绘制位置
     * */
    getContentPosition: () => CTable.position;
    /*
     * 计算当前给定位置，计算当前位置是否在单元格绘制内容区域内
     * */
    isPointInContent: (x: number, y: number) => boolean;
    /*
     * 当前单元格内容是否被选中
     * */
    isContentSelect: boolean;
    /*
     * 设置单元格值
     * */
    setCellValue(value: CTable.cellValueType | CTable.checkBoxValueType): void;
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
  export type cellValueType =
    | string
    | number
    | boolean
    | { [key: string]: any }
    | Array<any>
    | null
    | undefined;
  /*
   * checkBox值类型
   * */
  export type checkBoxValueType = {
    checked: boolean;
    indeterminate: boolean;
  };
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
    renderRow: (context?: CTable.ITable, x?: number) => void;
    /*
     * 行高
     * */
    rowHeight: number;
    /*
     * 行样式
     * */
    rowStyle: CTable.IRowStyle;
    renderCell: (cell: CTable.ICell) => void;
    /*
     * 获取当前行宽度
     * */
    getRowWidth: () => number;
    /*
     * 计算当前行单元格尺寸
     * */
    calcRowCellPosition: (
      bbox: { x: number; y: number; width: number; height: number },
      cells?: Array<CTable.ICell>
    ) => void;
    /*
     * 是否鼠标选中
     * */
    isMouseSelect: boolean;
    /*
     * 设置当前行选中状态
     * */
    setMouseSelect: (isSelect: boolean) => void;
    /*
     * 获取当前行数据
     * */
    getRowData: () => CTable.rowValueType | Array<CTable.ColumnConfig>;
  }
  /*
   * 表格行数据类型
   * */
  export type rowValueType = {
    [key: string]: CTable.cellValueType;
  };
}
