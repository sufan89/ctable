class defaultConfig implements CTable.IConfig {
  public baseFont: CTable.baseFont;
  public headerStyle: CTable.headerStyleConfig;
  constructor(config: CTable.IConfig) {
    this.baseFont = config.baseFont;
    this.headerStyle = config.headerStyle;
  }
}
export default defaultConfig;
