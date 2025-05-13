import { Draw } from '../draw/Draw'

export class HistoryManager {
  private undoStack: Array<Function> = []
  private redoStack: Array<Function> = []
  private maxRecordCount: number

  // Throttle fields for executeThrottled
  private lastExecuteTime = 0
  private readonly throttleInterval: number = 500 // milliseconds

  constructor(draw: Draw) {
    // 忽略第一次历史记录
    this.maxRecordCount = draw.getOptions().historyMaxRecordCount + 1
  }

  public undo() {
    if (this.undoStack.length > 1) {
      const pop = this.undoStack.pop()!
      this.redoStack.push(pop)
      if (this.undoStack.length) {
        this.undoStack[this.undoStack.length - 1]()
      }
    }
  }

  public redo() {
    if (this.redoStack.length) {
      const pop = this.redoStack.pop()!
      this.undoStack.push(pop)
      pop()
    }
  }

  /**
   * Execute and record a history function immediately
   */
  public execute(fn: Function) {
    this.undoStack.push(fn)
    if (this.redoStack.length) {
      this.redoStack = []
    }
    while (this.undoStack.length > this.maxRecordCount) {
      this.undoStack.shift()
    }
  }

  /**
   * Execute and record a history function, but throttle calls to at most once per throttleInterval
   */
  public executeThrottled(fn: Function) {
    const now = performance.now()
    if (now - this.lastExecuteTime > this.throttleInterval) {
      this.execute(fn)
      this.lastExecuteTime = now
    }
  }

  /**
   * Alias for executeThrottled for compatibility
   * Call this with a function that captures the snapshot to push.
   */
  public pushCurrentStateThrottled(fn: Function) {
    this.executeThrottled(fn)
  }

  public isCanUndo(): boolean {
    return this.undoStack.length > 1
  }

  public isCanRedo(): boolean {
    return !!this.redoStack.length
  }

  public isStackEmpty(): boolean {
    return !this.undoStack.length && !this.redoStack.length
  }

  public recovery() {
    this.undoStack = []
    this.redoStack = []
  }

  public popUndo() {
    return this.undoStack.pop()
  }
}
