declare namespace CTable {
  /*
   * 默认配置类型
   * */
  interface IConfig {
    /*
     * 总的字体类型
     * */
    baseFont: baseFont;
    headerStyle: headerStyleConfig;
  }

  /*
   * 表头样式配置
   * */
  type headerStyleConfig = {
    cellStyle: cellStyle;
  };

  /*
   * 单元格样式配置
   * */
  type cellStyle = {
    cellFont: baseFont;
  };

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
    fontWeight: String | Number;
    fontSize: String | Number;
    lineHeight: Number;
    fontFamily: String;
    fontColor: String;
  };
}
