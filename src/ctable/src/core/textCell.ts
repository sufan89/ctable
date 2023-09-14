import { translatePxToNumber } from "@/ctable/src/tools";
import cellClass from "./cell";

class textCell extends cellClass {
  private textValue: Array<string> = [];
  constructor(
    s: CTable.IRowStyle,
    context: CanvasRenderingContext2D,
    colConfig: CTable.ColumnConfig,
    cellValue: CTable.cellValueType
  ) {
    super(s, context, colConfig, cellValue);
  }
  /*
   * 渲染一个单元格
   * */
  public renderCell() {
    // 绘制单元格
    super.renderCell();
    this.renderTextCell();
  }
  /*
   * 根据单元格内容，丈量单元格的大小
   * */
  public calcCellSize() {
    this.ctx.font = this.cellStyle.getFont();
    this.ctx.textAlign = this.cellStyle.cellFont.textAlign;
    this.ctx.textBaseline = this.cellStyle.cellFont.textBaseline;
    const textMetrics = this.ctx.measureText(this.realVal as string);
    this.contentSize = {
      width: Math.ceil(textMetrics.width),
      height: translatePxToNumber(this.cellStyle.cellFont.fontSize, "px"),
    };
    if (this.headerSize.width !== 0 && this.headerSize.height !== 0) {
      // 表格行单元格
      this.splitText();
      this.contentSize.width =
        this.headerSize.width -
        this.cellStyle.cellPadding.left -
        this.cellStyle.cellPadding.right;
    }

    let cellWidth = 0;
    // 单元格高度=内容高度+上边距+下边距
    const cellHeight =
      this.contentSize.height +
      this.cellStyle.cellPadding.top +
      this.cellStyle.cellPadding.bottom;
    // 有子，则当前单元格宽度是所有子宽度之和
    if (this.children && this.children.length > 0) {
      this.children.forEach((childCell) => {
        cellWidth = childCell.cellSize.width + cellWidth;
      });
    } else {
      // 没有子，则取内容宽度+左边距+右边距
      cellWidth =
        this.contentSize.width +
        this.cellStyle.cellPadding.right +
        this.cellStyle.cellPadding.left;
    }
    // 当前单元格宽带为内容宽度+内边距宽度
    this.cellSize = {
      width: cellWidth,
      height: cellHeight,
    };
  }
  /*
   * 渲染文本单元格
   * */
  renderTextCell() {
    this.ctx.font = this.cellStyle.getFont();
    this.ctx.textAlign = this.cellStyle.cellFont.textAlign;
    this.ctx.textBaseline = this.cellStyle.cellFont.textBaseline;
    this.ctx.fillStyle = this.cellStyle.cellFont.fontColor;
    const contentPosition = this.getContentPosition();
    if (this.textValue.length > 0) {
      const textMetrics = this.ctx.measureText(this.textValue[0]);
      const textRowHeight = Math.ceil(
        textMetrics.actualBoundingBoxAscent +
          textMetrics.actualBoundingBoxDescent
      );
      for (let index = 0; index < this.textValue.length; index++) {
        const positionY =
          index === 0
            ? this.cellPosition.y + contentPosition.y
            : this.cellPosition.y +
              contentPosition.y +
              textRowHeight * index +
              this.cellStyle.cellFont.lineHeight * index * 1.5;
        this.ctx.fillText(
          this.textValue[index],
          this.cellPosition.x + contentPosition.x,
          positionY,
          this.cellSize.width
        );
      }
    } else {
      this.ctx.fillText(
        this.realVal as string,
        this.cellPosition.x + contentPosition.x,
        this.cellPosition.y + contentPosition.y,
        this.cellSize.width
      );
    }
  }
  /*
   * 设置行高
   * */
  public setRowHeight(height: number = 0) {
    this.rowHeight = height;
  }
  /*
   * 根据当前单元格大小，分割文本
   * */
  splitText() {
    // 表头内容大小
    const headContentSize = {
      width:
        this.headerSize.width -
        this.cellStyle.cellPadding.left -
        this.cellStyle.cellPadding.right,
      height:
        this.headerSize.height -
        this.cellStyle.cellPadding.top -
        this.cellStyle.cellPadding.bottom,
    };
    // 当前文本的宽度大于表头文本宽度，则需要按照表头文本宽度进行分割
    if (this.contentSize.width > headContentSize.width) {
      const cellValue = this.realVal as string;
      const valueArray = cellValue.split("");
      this.ctx.font = this.cellStyle.getFont();
      this.ctx.textAlign = this.cellStyle.cellFont.textAlign;
      this.ctx.textBaseline = this.cellStyle.cellFont.textBaseline;
      if (this.columnInfo.showToolTip) {
        // 裁剪文本
        let showValue = "";
        for (let index = 0; index < valueArray.length; index++) {
          showValue = showValue + valueArray[index] + "...";
          const textMetrics = this.ctx.measureText(showValue);
          if (textMetrics.width > headContentSize.width) {
            this.textValue.push(
              valueArray.slice(0, index - 1).join("") + "..."
            );
            break;
          }
        }
      } else {
        // 分割文本，多行展示
        let showValue = "";
        this.textValue = [];
        for (let index = 0; index < valueArray.length; index++) {
          showValue = showValue + valueArray[index];
          const textMetrics = this.ctx.measureText(showValue);
          if (
            Math.ceil(
              textMetrics.actualBoundingBoxRight +
                textMetrics.actualBoundingBoxLeft
            ) > headContentSize.width
          ) {
            this.textValue.push(showValue);
            showValue = "";
          }
        }
        this.contentSize.height =
          this.textValue.length * headContentSize.height +
          this.textValue.length * this.cellStyle.cellFont.lineHeight;
      }
    }
  }
}
export default textCell;
