import { EditorMode, EditorZone } from '../../../../dataset/enum/Editor'
import { KeyMap } from '../../../../dataset/enum/KeyMap'
import { isMod } from '../../../../utils/hotkey'
import { CanvasEvent } from '../../CanvasEvent'
import { backspace } from './backspace'
import { del } from './delete'
import { enter } from './enter'
import { left } from './left'
import { right } from './right'
import { tab } from './tab'
import { updown } from './updown'

// —— BATCHED INSERT HELPERS ——
let isFlushScheduled = false
let pendingKeys: Array<{ evt: KeyboardEvent; host: CanvasEvent }> = []

/**
 * Flush all pending character insertions in the next animation frame
 */
function flushPending() {
  if (pendingKeys.length === 0) return
  // insert all buffered keystrokes
  const keysToInsert = pendingKeys.slice()
  pendingKeys = []
  isFlushScheduled = false
  for (const { evt, host } of keysToInsert) {
    insertCharacter(evt, host)
  }
}

/**
 * Detect whether this event should insert a single character
 */
function shouldInsertCharacter(evt: KeyboardEvent) {
  return (
    evt.key.length === 1 && // single printable character
    !evt.ctrlKey &&
    !evt.metaKey &&
    !evt.altKey
  )
}

/**
 * Inserts `evt.key` into the document/model and records history throttled
 */
function insertCharacter(evt: KeyboardEvent, host: CanvasEvent) {
  const draw = host.getDraw()

  // TODO: replace with your actual insertion logic:
  // e.g. host.input(evt.key) or draw.getTextManager().insertAtCursor(evt.key)
  host.input(evt.key)

  // record history with throttle
  draw.getHistoryManager().pushCurrentStateThrottled(() => {
    // snapshot function: capture current state
    // e.g. draw.getValue() or deep clone of document model
  })
}

export function keydown(evt: KeyboardEvent, host: CanvasEvent) {
  if (host.isComposing) return
  const draw = host.getDraw()

  // —— BATCHED CHARACTER INSERTION ——
  if (shouldInsertCharacter(evt)) {
    evt.preventDefault()
    pendingKeys.push({ evt, host })
    if (!isFlushScheduled) {
      isFlushScheduled = true
      requestAnimationFrame(flushPending)
    }
    return
  }

  // —— OTHER KEY HANDLERS ——
  if (evt.key === KeyMap.Backspace) {
    backspace(evt, host)
  } else if (evt.key === KeyMap.Delete) {
    del(evt, host)
  } else if (evt.key === KeyMap.Enter) {
    enter(evt, host)
  } else if (evt.key === KeyMap.Left) {
    left(evt, host)
  } else if (evt.key === KeyMap.Right) {
    right(evt, host)
  } else if (evt.key === KeyMap.Up || evt.key === KeyMap.Down) {
    updown(evt, host)
  } else if (isMod(evt) && evt.key.toLocaleLowerCase() === KeyMap.Z) {
    if (draw.isReadonly() && draw.getMode() !== EditorMode.FORM) return
    draw.getHistoryManager().undo()
    evt.preventDefault()
  } else if (isMod(evt) && evt.key.toLocaleLowerCase() === KeyMap.Y) {
    if (draw.isReadonly() && draw.getMode() !== EditorMode.FORM) return
    draw.getHistoryManager().redo()
    evt.preventDefault()
  } else if (isMod(evt) && evt.key.toLocaleLowerCase() === KeyMap.C) {
    host.copy()
    evt.preventDefault()
  } else if (isMod(evt) && evt.key.toLocaleLowerCase() === KeyMap.X) {
    host.cut()
    evt.preventDefault()
  } else if (isMod(evt) && evt.key.toLocaleLowerCase() === KeyMap.A) {
    host.selectAll()
    evt.preventDefault()
  } else if (isMod(evt) && evt.key.toLocaleLowerCase() === KeyMap.S) {
    host.handleSaveShortcut(evt)
  } else if (evt.key === KeyMap.ESC) {
    host.clearPainterStyle()
    const zoneManager = draw.getZone()
    if (!zoneManager.isMainActive()) {
      zoneManager.setZone(EditorZone.MAIN)
    }
    evt.preventDefault()
  } else if (evt.key === KeyMap.TAB) {
    tab(evt, host)
  }
}
