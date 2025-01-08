/*
 * 处理表格事件
 * */
import eventBus from "./event";

class TableEventClass implements CTable.ITableEvent {
  /*
   * 表格主对象
   * */
  ctx: CTable.ITable;
  pressKeyCode!: string;
  isMouseIn!: boolean;
  mouseCursor: CTable.cursorType;
  /*
   * 表格事件主体
   * */
  eventObj: CTable.IEventBus;
  /*
   * 鼠标移动是选中的数据
   * */
  mouseOverData: CTable.MouseOverInfo;

  constructor(context: CTable.ITable) {
    this.ctx = context;
    this.eventObj = new eventBus();
    this.mouseCursor = "default";
    const { tableElement } = context;
    if (tableElement) {
      // 鼠标移动事件
      tableElement.addEventListener("mousemove", (event) => {
        this.onMouseMove(event);
      });
      // 鼠标按下事件
      tableElement.addEventListener("mousedown", (event) => {
        this.onMousedown(event);
      });
      // 鼠标松开事件
      tableElement.addEventListener("mouseup", (event) => {
        this.onMouseup(event);
      });
      // 滚轮事件
      tableElement.addEventListener("wheel", (event) => {
        this.onWheel(event);
      });
      // 鼠标移出画布事件
      tableElement.addEventListener("mouseleave", (event) => {
        this.onMouseLeave(event);
      });
      // 鼠标移入画布事件
      tableElement.addEventListener("mouseenter", (event) => {
        this.onMouseenter(event);
      });
      // 鼠标点击事件
      tableElement.addEventListener("click", (event) => this.onClick(event));
      /*
       * 画布监听不了键盘事件，所以直接监听body的键盘事件
       * */
      if (window && window.document && window.document.body) {
        // 键盘按键按下事件
        window.document.body.addEventListener("keydown", (event) => {
          this.onKeydown(event);
        });
        // 键盘按键松开事件
        window.document.body.addEventListener("keyup", (event) => {
          this.onKeyUp(event);
        });
      }
    }
    this.mouseOverData = {
      currentRow: null,
      currentCell: null,
      isHeader: false,
    };
  }

  on(
    eventName: string,
    callBack: Function,
    callOnce: boolean | undefined
  ): void {
    if (callOnce) {
      this.eventObj.subscribeOnce(eventName, callBack);
    } else {
      this.eventObj.subscribe(eventName, callBack);
    }
  }

  removeEvent(eventName: string): void {
    this.eventObj.clearEvent(eventName);
  }

  /*
   * 处理滚轮事件
   * */
  onWheel(event: WheelEvent) {
    const { shiftKey, deltaY } = event;
    const { scrollTop, scrollLeft } = this.ctx.offsetInfo;
    const { width, height } = this.ctx.viewSize;
    const tableSize: CTable.size = this.ctx.tableScrollBar.getScrollSize();
    const offsetSize = { scrollLeft: 0, scrollTop: 0 };
    if (shiftKey) {
      // 按下shift进行的滚动，实现左右滚动
      const offsetLeft = scrollLeft + deltaY * this.ctx.wheelSpeed;
      const maxLeft = tableSize.width - width;
      offsetSize.scrollLeft =
        offsetLeft < 0 ? 0 : offsetLeft > maxLeft ? maxLeft : offsetLeft;
      offsetSize.scrollTop = scrollTop;
    } else {
      // 实现上下滚动
      const maxHeight = tableSize.height - height;
      const offsetTop = scrollTop + deltaY * this.ctx.wheelSpeed;
      offsetSize.scrollTop =
        offsetTop < 0 ? 0 : offsetTop > maxHeight ? maxHeight : offsetTop;
      offsetSize.scrollLeft = scrollLeft;
    }
    // 修改滚动条位置
    this.ctx.tableScrollBar.setBarPosition(offsetSize);
  }

  /*
   * 处理键盘按下事件
   * */
  onKeydown(event: KeyboardEvent) {
    const { code } = event;
    // 当按键一直按住的时候，这个事件会一直触发
    this.pressKeyCode = code;
    if (this.pressKeyCode === "Space" && this.isMouseIn) {
      if (this.mouseCursor !== "grab" && this.mouseCursor !== "grabbing") {
        this.mouseCursor = "grab";
        this.changeMousePoint(this.mouseCursor);
      }
    }
  }

  /*
   * 处理键盘松开事件
   * */
  onKeyUp(event: KeyboardEvent) {
    const { code } = event;
    // 按键松开事件，如果是同一个code，则将code置空
    if (this.pressKeyCode === code) {
      this.pressKeyCode = "";
    }
    this.mouseCursor = "default";
    this.changeMousePoint(this.mouseCursor);
  }

  /*
   * 鼠标移入事件
   * */
  onMouseenter(e: MouseEvent) {
    this.isMouseIn = true;
    this.changeMousePoint(this.mouseCursor);
  }

  /*
   * 鼠标移出事件
   * */
  onMouseLeave(e: MouseEvent) {
    this.isMouseIn = false;
    // 鼠标移出之后，需要清空鼠标移动选中数据
    this.mouseOverData = {
      currentRow: null,
      currentCell: null,
      isHeader: false,
    };
    this.changeMousePoint("default");
  }

  /*
   * 鼠标移动事件
   * */
  onMouseMove(e: MouseEvent) {
    const { movementX, movementY, offsetX, offsetY } = e;
    // 往上、往右是负数
    if (this.mouseCursor === "grabbing") {
      // 拖动画布
      this.dragCanvas(movementX, movementY);
    } else if (this.isMouseIn) {
      // 计算当前鼠标移动位置在哪行数据，哪个单元格
      this.mouseOverData = this.getMousePointInfo(offsetX, offsetY);
      // 先将所有当前绘制的数据，置为false
      this.ctx.viewRows.forEach((row) => {
        row.setMouseSelect(false);
      });
      // 高亮当前鼠标移动选中数据
      if (!this.mouseOverData.isHeader) {
        this.mouseOverData.currentRow?.setMouseSelect(true);
      }
      // 处理CheckBox交互
      const { currentCell } = this.mouseOverData;
      if (currentCell) {
        if (currentCell.cellType === "checkbox") {
          // 计算当前鼠标位置是否在勾选框内
          if (currentCell.isPointInContent(offsetX, offsetY)) {
            currentCell.isContentSelect = true;
            if (currentCell.disabled) {
              this.mouseCursor = "not-allowed";
            } else {
              // 改变鼠标状态
              this.mouseCursor = "pointer";
            }
          } else {
            currentCell.isContentSelect = false;
            this.mouseCursor = "default";
          }
          const { tableElement } = this.ctx;
          if (tableElement) {
            tableElement.style.cursor = this.mouseCursor;
          }
        }
      }
      this.ctx.reRender();
    }
    // todo 拖动表头宽度
    // todo 拖动表头进行排序
  }

  /*
   * 改变鼠标指针状态
   * */
  changeMousePoint(cursor: CTable.cursorType = "default") {
    const { tableElement } = this.ctx;
    if (tableElement) {
      tableElement.style.cursor = cursor;
    }
  }

  /*
   * 处理鼠标按键事件
   * */
  onMousedown(e: MouseEvent) {
    const { button, buttons } = e;
    // 是否是主键按下了
    const pressMainMouseButton: boolean = button === 0 && buttons === 1;
    // 如果是主键按下，且按住了空格键，且当前鼠标位置在表格内，则将鼠标指针改为抓取状态
    if (
      this.isMouseIn &&
      pressMainMouseButton &&
      this.pressKeyCode === "Space"
    ) {
      this.mouseCursor = "grabbing";
      this.changeMousePoint(this.mouseCursor);
    }
  }

  /*
   * 处理鼠标按键松开事件
   * */
  onMouseup(e: MouseEvent) {
    if (this.isMouseIn && this.pressKeyCode === "Space") {
      this.mouseCursor = "grab";
      this.changeMousePoint(this.mouseCursor);
    }
  }

  /*
   * 拖动画布
   * */
  dragCanvas(movementX: number, movementY: number) {
    const { scrollTop, scrollLeft } = this.ctx.offsetInfo;
    const { width, height } = this.ctx.viewSize;
    const tableSize: CTable.size = this.ctx.tableScrollBar.getScrollSize();
    const offsetSize = { scrollLeft: 0, scrollTop: 0 };
    const offsetLeft = scrollLeft + movementX * -1;
    const maxLeft = tableSize.width - width;
    offsetSize.scrollLeft =
      offsetLeft < 0 ? 0 : offsetLeft > maxLeft ? maxLeft : offsetLeft;
    const maxHeight = tableSize.height - height;
    const offsetTop = scrollTop + movementY * -1;
    offsetSize.scrollTop =
      offsetTop < 0 ? 0 : offsetTop > maxHeight ? maxHeight : offsetTop;
    // 修改滚动条位置
    this.ctx.tableScrollBar.setBarPosition(offsetSize);
  }

  /*
   * 获取当前鼠标移动的点属于哪个行，哪个单元格
   * */
  getMousePointInfo(offsetX: number, offsetY: number): CTable.MouseOverInfo {
    const data: CTable.MouseOverInfo = {
      currentRow: null,
      currentCell: null,
      isHeader: false,
    };
    // 获取鼠标指针当前所在行信息
    const { rowHeight } = this.ctx.tableHeader;
    if (offsetY < rowHeight) {
      // 当前鼠标位置是在表头
      data.isHeader = true;
      // 计算当前在表头哪个单元格
      data.currentRow = this.ctx.tableHeader;
    } else {
      // 当前鼠标指针位置，不在表头，在表格上
      data.isHeader = false;
      // 找到当前行
      for (let index = 0; index < this.ctx.viewRows.length; index++) {
        const currentRow = this.ctx.viewRows[index];
        const firstCell = currentRow.rowCells[0];
        if (
          offsetY >= firstCell.cellPosition.y - currentRow.rowHeight &&
          offsetY < currentRow.rowHeight + firstCell.cellPosition.y
        ) {
          data.currentRow = currentRow;
          break;
        }
      }
    }
    // 获取鼠标指针当前所在的单元格信息
    // 如果是表头单元格，且有二级表头，则计算有异常
    if (data.currentRow) {
      const { rowCells } = data.currentRow;
      for (let index = 0; index < rowCells.length; index++) {
        const cell = rowCells[index];
        if (
          offsetX > cell.cellPosition.x &&
          offsetX <= cell.cellPosition.x + cell.cellSize.width
        ) {
          data.currentCell = cell;
          break;
        } else {
          data.currentCell = cell;
        }
      }
    }
    return data;
  }

  /*
   * 鼠标点击事件
   * */
  onClick(event: MouseEvent) {
    const { currentRow, currentCell, isHeader } = this.mouseOverData;
    // 当前鼠标指针未选中任何数据，直接跳过，不进行事件处理
    if (!currentRow || !currentCell) {
      return;
    }
    // 只有非表格拖动状态时，才进行表格点击事件传递
    if (this.mouseCursor !== "grab" && this.mouseCursor !== "grabbing") {
      if (
        currentCell &&
        currentCell.cellType === "checkbox" &&
        currentCell.isContentSelect
      ) {
        //点击的是勾选框
        // 如果是点击的是行，需要记录当前选中了哪些数据
        // 如果点击的是表头的勾选框，则需要判断是否是全选还是取消勾选
        if (isHeader) {
          this.ctx.headCheckBoxChange(currentCell);
        } else {
          this.ctx.rowCheckBoxChange(currentCell, currentRow);
        }
      } else {
        this.ctx.tableEvent.publish(
          isHeader ? "HeaderRowClick" : "RowClick",
          currentRow
        );
        this.ctx.tableEvent.publish(
          isHeader ? "HeaderCellClick" : "CellClick",
          currentCell
        );
      }
    }
  }
}

export default TableEventClass;
