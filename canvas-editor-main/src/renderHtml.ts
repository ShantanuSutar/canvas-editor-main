import {
  ElementType,
  ControlType,
  ListType,
  TitleLevel,
  IElement
} from './editor'

// Escape helper
function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/**
 * Render a flat IElement[] back into HTML,
 * replacing any .variable run with {{KEY}} (from groupIds[0]).
 */
// utils/renderElementListToHtml.ts

export function renderElementListToHtml(elements: IElement[]): string {
  console.log(elements)
  let out = ''
  let i = 0

  while (i < elements.length) {
    const el = elements[i]

    // ==== TITLE ==== (detect by presence of level)
    if (el.level !== undefined) {
      // Map level strings/numbers to heading tags
      const tagMap: Record<string, string> = {
        first: 'h1',
        second: 'h2',
        third: 'h3',
        fourth: 'h4',
        fifth: 'h5',
        sixth: 'h6'
      }
      const levelKey = String(el.level).toLowerCase()
      const tag = tagMap[levelKey] || 'h3'

      // Build segments: prefer valueList, otherwise single segment from el.value
      const segments =
        el.valueList && el.valueList.length
          ? el.valueList
          : [
              {
                value: el.value,
                size: el.size,
                variable: el.variable,
                variableName: el.variableName
              }
            ]

      const inner = segments
        .map(seg => {
          if (seg.variable && seg.variableName) {
            const placeholder = seg.variableName
            const key = placeholder.replace(/^\{\{|\}\}$/g, '')
            return `<span class=\"variable\" data-value=\"${key}\">${placeholder}</span>`
          }
          return escapeHtml(seg.value)
        })
        .join('')

      out += `<${tag}>${inner}</${tag}>
`
      i++
      continue
      continue
    }

    // ==== TEXT / SUP / SUB runs ====
    if (
      !el.type ||
      el.type === ElementType.TEXT ||
      el.type === ElementType.SUPERSCRIPT ||
      el.type === ElementType.SUBSCRIPT
    ) {
      let buf = ''
      while (
        i < elements.length &&
        (!elements[i].type ||
          elements[i].type === ElementType.TEXT ||
          elements[i].type === ElementType.SUPERSCRIPT ||
          elements[i].type === ElementType.SUBSCRIPT)
      ) {
        const t = elements[i]
        let piece = ''

        if (t.variable && t.variableName) {
          const placeholder = t.variableName
          const key = placeholder.replace(/^\{\{|\}\}$/g, '')
          piece = `<span class=\"variable\" data-value=\"${key}\">${placeholder}</span>`
        } else if (t.type === ElementType.SUPERSCRIPT) {
          piece = `<sup>${escapeHtml(t.value)}</sup>`
        } else if (t.type === ElementType.SUBSCRIPT) {
          piece = `<sub>${escapeHtml(t.value)}</sub>`
        } else {
          piece = escapeHtml(t.value)
        }

        buf += piece
        i++
      }
      if (buf.trim()) {
        out += `<p>${buf.replace(/\n/g, '<br/>')}</p>\n`
      }
      continue
    }

    // ==== PAGE BREAK ====
    if (el.type === ElementType.PAGE_BREAK) {
      out += `<!-- pagebreak -->\n`
      i++
      continue
    }

    // ==== SEPARATOR ====
    if (el.type === ElementType.SEPARATOR) {
      out += `<hr/>\n`
      i++
      continue
    }

    // ==== LISTS ====
    if (el.type === ElementType.LIST) {
      const tag = el.listType === ListType.UL ? 'ul' : 'ol'
      out += `<${tag}>\n`
      ;(el.valueList || []).forEach(item => {
        const txt = escapeHtml(item.value).replace(/\n/g, '<br/>')
        out += `  <li>${txt}</li>\n`
      })
      out += `</${tag}>\n`
      i++
      continue
    }

    // ==== TABLE ====
    if (el.type === ElementType.TABLE) {
      out += `<table border=\"1\" style=\"border-collapse:collapse;\">\n`
      if (el.colgroup) {
        out += `  <colgroup>\n`
        el.colgroup.forEach(c => (out += `    <col width=\"${c.width}\" />\n`))
        out += `  </colgroup>\n`
      }
      ;(el.trList || []).forEach(tr => {
        out += `  <tr${tr.height ? ` height=\"${tr.height}\"` : ''}>\n`
        tr.tdList.forEach(td => {
          const cs = td.colspan > 1 ? ` colspan=\"${td.colspan}\"` : ''
          const rs = td.rowspan > 1 ? ` rowspan=\"${td.rowspan}\"` : ''
          const cell = td.value.map(c => escapeHtml(c.value)).join('')
          out += `    <td${cs}${rs}>${cell}</td>\n`
        })
        out += `  </tr>\n`
      })
      out += `</table>\n`
      i++
      continue
    }

    // ==== HYPERLINK ====
    if (el.type === ElementType.HYPERLINK) {
      const inner = (el.valueList || []).map(c => escapeHtml(c.value)).join('')
      out += `<a href=\"${el.url}\">${inner}</a>`
      i++
      continue
    }

    // ==== IMAGE ====
    if (el.type === ElementType.IMAGE) {
      out += `<img src=\"${el.value}\"${el.id ? ` id=\"${el.id}\"` : ''}${
        el.width ? ` width=\"${el.width}\"` : ''
      }${el.height ? ` height=\"${el.height}\"` : ''}/> \n`
      i++
      continue
    }

    // ==== CONTROL ====
    if (el.type === ElementType.CONTROL) {
      const c = el.control!
      const attrs = [`data-control-type=\"${c.type}\"`]
      if (c.conceptId) attrs.push(`data-concept-id=\"${c.conceptId}\"`)
      if (c.placeholder) attrs.push(`placeholder=\"${c.placeholder}\"`)
      if (c.type === ControlType.TEXT && c.minWidth)
        attrs.push(`data-min-width=\"${c.minWidth}\"`)
      if (c.type === ControlType.TEXT && c.underline)
        attrs.push(`data-underline`)
      if (
        (c.type === ControlType.SELECT || c.type === ControlType.CHECKBOX) &&
        c.valueSets
      )
        attrs.push(`data-values='${JSON.stringify(c.valueSets)}'`)

      out += `<span ${attrs.join(' ')}></span>\n`
      i++
      continue
    }

    // ==== LATEX ====
    if (el.type === ElementType.LATEX) {
      out += `\\(${escapeHtml(el.value)}\\)\n`
      i++
      continue
    }

    // ==== TAB ====
    if (el.type === ElementType.TAB) {
      out += `\t`
      i++
      continue
    }

    // ==== FALLBACK ====
    out += escapeHtml(el.value)
    i++
  }

  return out.trim()
}
