import cellClass from "./cell";
class checkBoxCell extends cellClass {
  // 是否选中
  checked: boolean = false;
  // 半选
  indeterminate: boolean = false;
  constructor(
    s: CTable.IRowStyle,
    context: CanvasRenderingContext2D,
    colConfig: CTable.ColumnConfig,
    cellValue: CTable.cellValueType
  ) {
    super(s, context, colConfig, cellValue);
    // 当前选中状态
    this.checked = false;
    // 当前半选状态
    this.indeterminate = false;
  }
  getCellSize(): CTable.size {
    return super.getCellSize();
  }
  /*
   * 渲染单元格
   * */
  renderCell() {
    super.renderCell();
    this.renderCheckBoxCell();
  }
  /*
   * 渲染一个CheckBox单元格
   * */
  renderCheckBoxCell() {
    // 绘制一个填充方块
    const contentPosition = this.getContentPosition();
    const cellStyle: CTable.CheckBoxStyle = this.cellStyle.checkBoxStyle;
    // 清空绘制区域
    this.ctx.clearRect(
      this.cellPosition.x + contentPosition.x,
      this.cellPosition.y + contentPosition.y,
      cellStyle.size,
      cellStyle.size
    );
    // 获取绘制颜色
    const fillColor: string = this.disabled
      ? cellStyle.disabledColor
      : cellStyle.backGround;
    const borderColor: string = this.disabled
      ? "#c0c4cc"
      : this.checked
      ? "#ffffff"
      : cellStyle.borderColor;
    const checkedColor: string = this.disabled
      ? cellStyle.disabledCheckedColor
      : "#FFFFFF";
    this.ctx.lineJoin = "bevel";
    // 只有选中的时候，才绘制背景
    if (this.checked) {
      // 绘制矩形
      this.ctx.fillStyle = fillColor;
      this.ctx.fillRect(
        this.cellPosition.x + contentPosition.x,
        this.cellPosition.y + contentPosition.y,
        cellStyle.size,
        cellStyle.size
      );
    }
    // 绘制边框
    this.ctx.strokeStyle = borderColor;
    this.ctx.strokeRect(
      this.cellPosition.x + contentPosition.x,
      this.cellPosition.y + contentPosition.y,
      cellStyle.size,
      cellStyle.size
    );
    // 绘制选中情况和半选情况
    if (this.checked && this.indeterminate) {
      // 半选情况
      const lineLength: number = 5;
      const paddingLeft: number = 3;
      const paddingTop: number = 7;
      const point = {
        x: this.cellPosition.x + contentPosition.x + paddingLeft,
        y: this.cellPosition.y + contentPosition.y + paddingTop,
      };
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.strokeStyle = checkedColor;
      this.ctx.lineWidth = 1;
      this.ctx.translate(point.x, point.y);
      this.ctx.moveTo(0, 0);
      this.ctx.lineTo(lineLength + paddingLeft, 0);
      this.ctx.stroke();
      this.ctx.restore();
    } else if (this.checked && !this.indeterminate) {
      // 选中情况
      const transformAngle: number = (Math.PI / 180) * 45;
      const widthLength: number = 3;
      const heightLength: number = 7;
      const paddingLeft: number = 3;
      const paddingTop: number = 2;
      this.ctx.strokeStyle = checkedColor;
      this.ctx.lineWidth = 1;
      const point2 = {
        x: this.cellPosition.x + contentPosition.x + paddingLeft + widthLength,
        y: this.cellPosition.y + contentPosition.y + heightLength + paddingTop,
      };
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.translate(point2.x, point2.y);
      this.ctx.rotate(transformAngle);
      this.ctx.moveTo(-widthLength, 0);
      this.ctx.lineTo(0, 0);
      this.ctx.lineTo(0, -heightLength);
      this.ctx.stroke();
      this.ctx.restore();
    }
  }
  /*
   * 计算单元格大小
   * */
  calcCellSize() {
    super.calcCellSize();
    const cellStyle: CTable.CheckBoxStyle = this.cellStyle.checkBoxStyle;
    const { cellPadding } = this.cellStyle;
    this.contentSize = {
      width: cellStyle.size,
      height: cellStyle.size,
    };
    this.cellSize = {
      width: cellStyle.size + cellPadding.left + cellPadding.right,
      height: cellStyle.size + cellPadding.top + cellPadding.bottom,
    };
  }
  /*
   * 获取当前单元格值
   * */
  getCellValue(): CTable.cellValueType {
    return {
      checked: this.checked,
      indeterminate: this.indeterminate,
    };
  }
}
export default checkBoxCell;
