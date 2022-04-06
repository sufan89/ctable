class CTable {
  /**
   * 表格根节点元素
   */
  private parentElement: HTMLElement|null
  /**
   * 表格Element
   */
  private tableElement: HTMLCanvasElement
  /**
   * canvas上下文
   */
  private ctx: CanvasRenderingContext2D | null
  private TableConfig: TableConfig

  /**
   * 构造函数
   */
  constructor(elm: string, tableConfig: TableConfig) {
    if (!elm && elm === "") {
      console.error("root element is not define")
    }
    // 获取根节点信息
    this.parentElement = document.getElementById(elm)
    this.tableElement = document.createElement("canvas")
    this.tableElement.className = "table-main"
    this.parentElement?.appendChild(this.tableElement)
    this.ctx = this.tableElement.getContext("2d")
    this.TableConfig = tableConfig

    // 初始化
    this.init()
  }

  /**
   * 根据配置进行初始化
   */
  private init() {
      //
  }
  /*
  * 重新渲染
  * */
  public reRender(){

  }
}

export default CTable
