import { IElement } from '../../../..'
import { EDITOR_PREFIX } from '../../../../dataset/constant/Editor'
import { TableOrder } from '../../../../dataset/enum/table/TableTool'
import { DeepRequired } from '../../../../interface/Common'
import { IEditorOption } from '../../../../interface/Editor'
import { Position } from '../../../position/Position'
import { RangeManager } from '../../../range/RangeManager'
import { Draw } from '../../Draw'

interface IAnchorMouseDown {
  evt: MouseEvent
  order: TableOrder
  index: number
  element: IElement
}

export class TableTool {
  // 单元格最小宽度
  private readonly MIN_TD_WIDTH = 20
  // 行列工具相对表格偏移值
  private readonly ROW_COL_OFFSET = 18
  // 快速添加行列工具宽度
  private readonly ROW_COL_QUICK_WIDTH = 16
  // 快速添加行列工具偏移值
  private readonly ROW_COL_QUICK_OFFSET = 5
  // 快速添加行列工具相对表格位置
  private readonly ROW_COL_QUICK_POSITION =
    this.ROW_COL_OFFSET + (this.ROW_COL_OFFSET - this.ROW_COL_QUICK_WIDTH) / 2
  // 边框工具宽/高度
  private readonly BORDER_VALUE = 4
  // 快速选择工具偏移值
  private readonly TABLE_SELECT_OFFSET = 20

  private draw: Draw
  private canvas: HTMLCanvasElement
  private options: DeepRequired<IEditorOption>
  private position: Position
  private range: RangeManager
  private container: HTMLDivElement
  private toolRowContainer: HTMLDivElement | null
  private toolRowAddBtn: HTMLDivElement | null
  private toolColAddBtn: HTMLDivElement | null
  private toolTableSelectBtn: HTMLDivElement | null
  private toolColContainer: HTMLDivElement | null
  private toolBorderContainer: HTMLDivElement | null
  private anchorLine: HTMLDivElement | null
  private mousedownX: number
  private mousedownY: number

  constructor(draw: Draw) {
    this.draw = draw
    this.canvas = draw.getPage()
    this.options = draw.getOptions()
    this.position = draw.getPosition()
    this.range = draw.getRange()
    this.container = draw.getContainer()
    // x、y轴
    this.toolRowContainer = null
    this.toolRowAddBtn = null
    this.toolColAddBtn = null
    this.toolTableSelectBtn = null
    this.toolColContainer = null
    this.toolBorderContainer = null
    this.anchorLine = null
    this.mousedownX = 0
    this.mousedownY = 0
  }

  public dispose() {
    this.toolRowContainer?.remove()
    this.toolRowAddBtn?.remove()
    this.toolColAddBtn?.remove()
    this.toolTableSelectBtn?.remove()
    this.toolColContainer?.remove()
    this.toolBorderContainer?.remove()
    this.toolRowContainer = null
    this.toolRowAddBtn = null
    this.toolColAddBtn = null
    this.toolTableSelectBtn = null
    this.toolColContainer = null
    this.toolBorderContainer = null
  }

  public render() {
    const { isTable, index, trIndex, tdIndex } =
      this.position.getPositionContext()
    if (!isTable) return
    // 销毁之前工具
    this.dispose()
    const elementList = this.draw.getOriginalElementList()
    const positionList = this.position.getOriginalPositionList()
    const element = elementList[index!]
    // 表格工具配置禁用又非设计模式时不渲染
    if (element.tableToolDisabled && !this.draw.isDesignMode()) return
    // 渲染所需数据
    const { scale } = this.options
    const position = positionList[index!]
    const { colgroup, trList } = element
    const {
      coordinate: { leftTop }
    } = position
    const height = this.draw.getHeight()
    const pageGap = this.draw.getPageGap()
    const prePageHeight = this.draw.getPageNo() * (height + pageGap)
    const tableX = leftTop[0]
    const tableY = leftTop[1] + prePageHeight
    const td = element.trList![trIndex!].tdList[tdIndex!]
    const rowIndex = td.rowIndex
    const colIndex = td.colIndex
    const tableHeight = element.height! * scale
    const tableWidth = element.width! * scale
    // 表格选择工具
    const tableSelectBtn = document.createElement('div')
    tableSelectBtn.classList.add(`${EDITOR_PREFIX}-table-tool__select`)
    tableSelectBtn.style.height = `${tableHeight * scale}`
    tableSelectBtn.style.left = `${tableX}px`
    tableSelectBtn.style.top = `${tableY}px`
    tableSelectBtn.style.transform = `translate(-${
      this.TABLE_SELECT_OFFSET * scale
    }px, ${-this.TABLE_SELECT_OFFSET * scale}px)`
    // 快捷全选
    tableSelectBtn.onclick = () => {
      this.draw.getTableOperate().tableSelectAll()
    }
    this.container.append(tableSelectBtn)
    this.toolTableSelectBtn = tableSelectBtn
    // 渲染行工具
    const rowHeightList = trList!.map(tr => tr.height)
    const rowContainer = document.createElement('div')
    rowContainer.classList.add(`${EDITOR_PREFIX}-table-tool__row`)
    rowContainer.style.transform = `translateX(-${
      this.ROW_COL_OFFSET * scale
    }px)`
    for (let r = 0; r < rowHeightList.length; r++) {
      const rowHeight = rowHeightList[r] * scale
      const rowItem = document.createElement('div')
      rowItem.classList.add(`${EDITOR_PREFIX}-table-tool__row__item`)
      if (r === rowIndex) {
        rowItem.classList.add('active')
      }
      // 快捷行选择
      rowItem.onclick = () => {
        const tdList = this.draw
          .getTableParticle()
          .getTdListByRowIndex(trList!, r)
        const firstTd = tdList[0]
        const lastTd = tdList[tdList.length - 1]
        this.position.setPositionContext({
          index,
          isTable: true,
          trIndex: firstTd.trIndex,
          tdIndex: firstTd.tdIndex,
          tableId: element.id
        })
        this.range.setRange(
          0,
          0,
          element.id,
          firstTd.tdIndex,
          lastTd.tdIndex,
          firstTd.trIndex,
          lastTd.trIndex
        )
        this.draw.render({
          curIndex: 0,
          isCompute: false,
          isSubmitHistory: false
        })
        this._setAnchorActive(rowContainer, r)
      }
      const rowItemAnchor = document.createElement('div')
      rowItemAnchor.classList.add(`${EDITOR_PREFIX}-table-tool__anchor`)
      // 行高度拖拽开始
      rowItemAnchor.onmousedown = evt => {
        this._mousedown({
          evt,
          element,
          index: r,
          order: TableOrder.ROW
        })
      }
      rowItem.append(rowItemAnchor)
      rowItem.style.height = `${rowHeight}px`
      rowContainer.append(rowItem)
    }
    rowContainer.style.left = `${tableX}px`
    rowContainer.style.top = `${tableY}px`
    this.container.append(rowContainer)
    this.toolRowContainer = rowContainer
    // 添加行按钮
    const rowAddBtn = document.createElement('div')
    rowAddBtn.classList.add(`${EDITOR_PREFIX}-table-tool__quick__add`)
    rowAddBtn.style.height = `${tableHeight * scale}`
    rowAddBtn.style.left = `${tableX}px`
    rowAddBtn.style.top = `${tableY + tableHeight}px`
    rowAddBtn.style.transform = `translate(-${
      this.ROW_COL_QUICK_POSITION * scale
    }px, ${this.ROW_COL_QUICK_OFFSET * scale}px)`
    // 快捷添加行
    rowAddBtn.onclick = () => {
      this.position.setPositionContext({
        index,
        isTable: true,
        trIndex: trList!.length - 1,
        tdIndex: 0,
        tableId: element.id
      })
      this.draw.getTableOperate().insertTableBottomRow()
    }
    this.container.append(rowAddBtn)
    this.toolRowAddBtn = rowAddBtn
    // 渲染列工具
    const colWidthList = colgroup!.map(col => col.width)
    const colContainer = document.createElement('div')
    colContainer.classList.add(`${EDITOR_PREFIX}-table-tool__col`)
    colContainer.style.transform = `translateY(-${
      this.ROW_COL_OFFSET * scale
    }px)`
    for (let c = 0; c < colWidthList.length; c++) {
      const colWidth = colWidthList[c] * scale
      const colItem = document.createElement('div')
      colItem.classList.add(`${EDITOR_PREFIX}-table-tool__col__item`)
      if (c === colIndex) {
        colItem.classList.add('active')
      }
      // 快捷列选择
      colItem.onclick = () => {
        const tdList = this.draw
          .getTableParticle()
          .getTdListByColIndex(trList!, c)
        const firstTd = tdList[0]
        const lastTd = tdList[tdList.length - 1]
        this.position.setPositionContext({
          index,
          isTable: true,
          trIndex: firstTd.trIndex,
          tdIndex: firstTd.tdIndex,
          tableId: element.id
        })
        this.range.setRange(
          0,
          0,
          element.id,
          firstTd.tdIndex,
          lastTd.tdIndex,
          firstTd.trIndex,
          lastTd.trIndex
        )
        this.draw.render({
          curIndex: 0,
          isCompute: false,
          isSubmitHistory: false
        })
        this._setAnchorActive(colContainer, c)
      }
      const colItemAnchor = document.createElement('div')
      colItemAnchor.classList.add(`${EDITOR_PREFIX}-table-tool__anchor`)
      // 列高度拖拽开始
      colItemAnchor.onmousedown = evt => {
        this._mousedown({
          evt,
          element,
          index: c,
          order: TableOrder.COL
        })
      }
      colItem.append(colItemAnchor)
      colItem.style.width = `${colWidth}px`
      colContainer.append(colItem)
    }
    colContainer.style.left = `${tableX}px`
    colContainer.style.top = `${tableY}px`
    this.container.append(colContainer)
    this.toolColContainer = colContainer
    // 添加列按钮
    const colAddBtn = document.createElement('div')
    colAddBtn.classList.add(`${EDITOR_PREFIX}-table-tool__quick__add`)
    colAddBtn.style.height = `${tableHeight * scale}`
    colAddBtn.style.left = `${tableX + tableWidth}px`
    colAddBtn.style.top = `${tableY}px`
    colAddBtn.style.transform = `translate(${
      this.ROW_COL_QUICK_OFFSET * scale
    }px, -${this.ROW_COL_QUICK_POSITION * scale}px)`
    // 快捷添加列
    colAddBtn.onclick = () => {
      this.position.setPositionContext({
        index,
        isTable: true,
        trIndex: 0,
        tdIndex: trList![0].tdList.length - 1 || 0,
        tableId: element.id
      })
      this.draw.getTableOperate().insertTableRightCol()
    }
    this.container.append(colAddBtn)
    this.toolColAddBtn = colAddBtn
    // 渲染单元格边框拖拽工具
    const borderContainer = document.createElement('div')
    borderContainer.classList.add(`${EDITOR_PREFIX}-table-tool__border`)
    borderContainer.style.height = `${tableHeight}px`
    borderContainer.style.width = `${tableWidth}px`
    borderContainer.style.left = `${tableX}px`
    borderContainer.style.top = `${tableY}px`
    for (let r = 0; r < trList!.length; r++) {
      const tr = trList![r]
      for (let d = 0; d < tr.tdList.length; d++) {
        const td = tr.tdList[d]
        const rowBorder = document.createElement('div')
        rowBorder.classList.add(`${EDITOR_PREFIX}-table-tool__border__row`)
        rowBorder.style.width = `${td.width! * scale}px`
        rowBorder.style.height = `${this.BORDER_VALUE}px`
        rowBorder.style.top = `${
          (td.y! + td.height!) * scale - this.BORDER_VALUE / 2
        }px`
        rowBorder.style.left = `${td.x! * scale}px`
        // 行宽度拖拽开始
        rowBorder.onmousedown = evt => {
          this._mousedown({
            evt,
            element,
            index: td.rowIndex! + td.rowspan - 1,
            order: TableOrder.ROW
          })
        }
        borderContainer.appendChild(rowBorder)
        const colBorder = document.createElement('div')
        colBorder.classList.add(`${EDITOR_PREFIX}-table-tool__border__col`)
        colBorder.style.width = `${this.BORDER_VALUE}px`
        colBorder.style.height = `${td.height! * scale}px`
        colBorder.style.top = `${td.y! * scale}px`
        colBorder.style.left = `${
          (td.x! + td.width!) * scale - this.BORDER_VALUE / 2
        }px`
        // 列高度拖拽开始
        colBorder.onmousedown = evt => {
          this._mousedown({
            evt,
            element,
            index: td.colIndex! + td.colspan - 1,
            order: TableOrder.COL
          })
        }
        borderContainer.appendChild(colBorder)
      }
    }
    this.container.append(borderContainer)
    this.toolBorderContainer = borderContainer
  }

  private _setAnchorActive(container: HTMLDivElement, index: number) {
    const children = container.children
    for (let c = 0; c < children.length; c++) {
      const child = children[c]
      if (c === index) {
        child.classList.add('active')
      } else {
        child.classList.remove('active')
      }
    }
  }

  private _mousedown(payload: IAnchorMouseDown) {
    const { evt, index, order, element } = payload
    const { x, y } = evt
    // 鼠标位置
    this.mousedownX = x
    this.mousedownY = y
    // 基础信息
    const pageNo = this.draw.getPageNo();
    const scale = this.options.scale;
    const page = this.draw.getPage(pageNo)
    // 拖拽线
    const parentRect = page.getBoundingClientRect()
    const anchorLine = document.createElement('div')
    const isCol = order === TableOrder.COL
    anchorLine.classList.add(`${EDITOR_PREFIX}-table-tool__anchor-line`)
    if (isCol) {
      anchorLine.classList.add(`${EDITOR_PREFIX}-table-tool__anchor-line__col`)
    } else {
      anchorLine.classList.add(`${EDITOR_PREFIX}-table-tool__anchor-line__row`)
    }
    anchorLine.style.top = `${y - parentRect.top}px`
    anchorLine.style.left = `${x - parentRect.left}px`
    this.container.append(anchorLine)
    this.anchorLine = anchorLine
    // 原始鼠标样式
    this.canvas.style.cursor = 'none'
    document.body.style.cursor = isCol ? 'col-resize' : 'row-resize'
    // 绑定移动事件
    let dx = 0
    let dy = 0
    const mousemoveFn = (evt: MouseEvent) => {
      const { x, y } = evt
      const anchorLine = this.anchorLine
      if (!anchorLine) return
      // x轴方向拖拽
      if (isCol) {
        dx = Math.ceil((x - this.mousedownX) / scale)
        anchorLine.style.left = `${x - parentRect.left}px`
      } else {
        dy = Math.ceil((y - this.mousedownY) / scale)
        anchorLine.style.top = `${y - parentRect.top}px`
      }
    }
    document.addEventListener('mousemove', mousemoveFn)
    document.addEventListener(
      'mouseup',
      () => {
        let isChangeSize = false
        // 改变尺寸
        if (order === TableOrder.ROW) {
          const trList = element.trList!
          const tr = trList[index] || trList[index - 1]
          // 最大移动高度-向上移动超出最小高度限定，则减少移动量
          const { defaultTrMinHeight } = this.options.table
          if (dy < 0 && tr.height + dy < defaultTrMinHeight) {
            dy = defaultTrMinHeight - tr.height
          }
          if (dy) {
            tr.height += dy
            tr.minHeight = tr.height
            isChangeSize = true
          }
        } else {
          const { colgroup } = element
          if (colgroup && dx) {
            // 宽度分配
            const innerWidth = this.draw.getOriginalInnerWidth()
            const curColWidth = colgroup[index].width
            // 最小移动距离计算-如果向左移动：使单元格小于最小宽度，则减少移动量
            if (dx < 0 && curColWidth + dx < this.MIN_TD_WIDTH) {
              dx = this.MIN_TD_WIDTH - curColWidth
            }
            // 最大移动距离计算-如果向右移动：使后面一个单元格小于最小宽度，则减少移动量
            const nextColWidth = colgroup[index + 1]?.width
            if (
              dx > 0 &&
              nextColWidth &&
              nextColWidth - dx < this.MIN_TD_WIDTH
            ) {
              dx = nextColWidth - this.MIN_TD_WIDTH
            }
            
            // Check if resize would make the table exceed the available width
            const isLastColumn = index === colgroup.length - 1;
            const currentTableWidth = colgroup.reduce((pre, cur) => pre + cur.width, 0);
            const newTableWidth = currentTableWidth + (isLastColumn ? dx : 0);
            
            if (isLastColumn && newTableWidth > innerWidth) {
              // Limit the resize to prevent exceeding available width
              dx = innerWidth - currentTableWidth;
            }
            
            if (dx) {
              // 当前列增加，后列减少
              if (colgroup.length - 1 !== index) {
                colgroup[index + 1].width -= dx
              }
              colgroup[index].width += dx
              
              // If this resize would cause the table to exceed available width, adjust
              const updatedTableWidth = colgroup.reduce((pre, cur) => pre + cur.width, 0);
              if (updatedTableWidth > innerWidth) {
                this.draw.getTableOperate().adjustColWidth(element);
              }
              
              isChangeSize = true
            }
          }
        }
        if (isChangeSize) {
          this.draw.render({ isSetCursor: false })
        }
        // 还原副作用
        anchorLine.remove()
        document.removeEventListener('mousemove', mousemoveFn)
        document.body.style.cursor = ''
        this.canvas.style.cursor = 'text'
      },
      {
        once: true
      }
    )
    evt.preventDefault()
  }
}
