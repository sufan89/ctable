declare namespace CTable {
  /*
   * 默认配置类型
   * */
  export interface ITableStyle {
    /*
     * 总的字体类型
     * */
    baseFont: baseFont;
    headerRowStyle: CTable.IRowStyle;
    tableRowStyle: CTable.IRowStyle;
  }
  /*
   * 单元格样式配置
   * */
  export interface ICellStyle {
    /*
     * 单元格字体
     * */
    cellFont: baseFont;
    /*
     * 单元格 padding
     * */
    cellPadding: padding;
    /*
     * 单元格边框样式
     * */
    cellBorder: border;
    /*
     * 填充样式
     * */
    cellFill: fillStyle;
    /*
     * 单元格行标识
     * */
    cellKey: string;
    /*
     * 获取字体配置
     * */
    getFont: () => string;
  }
  /*
   * 行样式
   * */
  export interface IRowStyle {
    rowFont: baseFont;
    rowPadding: padding;
    rowBorder: border;
    rowFill: fillStyle;
  }
  /*
   * 基本字体配置
   * */
  type baseFont = {
    textBaseline:
      | "alphabetic"
      | "top"
      | "hanging"
      | "middle"
      | "ideographic"
      | "bottom";
    textAlign: "start" | "end" | "center" | "left" | "right";
    fontStyle: "normal" | "italic" | "oblique";
    fontVariant: "normal" | "small-caps";
    fontWeight: number;
    fontSize: string | number;
    lineHeight: number;
    fontFamily: string;
    fontColor: string;
  };
  /*
   * 单元格Padding
   * */
  type padding = {
    top: number;
    left: number;
    right: number;
    bottom: number;
  };
  /*
   * 边框样式
   * */
  type border = {
    width: number;
    color: string;
  };
  /*
   * 填充样式
   * */
  type fillStyle = {
    color: string;
  };
}
