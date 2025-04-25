import {
  ElementType,
  ControlType,
  ListType,
  TitleLevel,
  IElement
} from './editor'

// helpers for escaping
function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/**
 * Render a flat IElement[] back into an HTML string.
 */
export function renderElementListToHtml(elements: IElement[]): string {
  let out = ''
  let i = 0

  // Utility to consume N elements
  // function next(): IElement | null {
  //   return elements[++i] || null
  // }

  while (i < elements.length) {
    const el = elements[i]

    switch (el.type) {
      // ==== TITLE ====
      case ElementType.TITLE: {
        // pick the right <h#> from level
        const tag =
          {
            [TitleLevel.FIRST]: 'h1',
            [TitleLevel.SECOND]: 'h2',
            [TitleLevel.THIRD]: 'h3',
            [TitleLevel.FOURTH]: 'h4',
            [TitleLevel.FIFTH]: 'h5',
            [TitleLevel.SIXTH]: 'h6'
          }[el.level!] || 'h3'

        // render each segment in valueList
        const inner = (el.valueList || [])
          .map(seg => {
            let txt = escapeHtml(seg.value)
            // if variable flagged, wrap in span
            if (seg.variable) {
              txt = `<span class="variable" data-value="${
                seg.groupIds?.[0] || ''
              }">${txt}</span>`
            }
            return txt
          })
          .join('')

        out += `<${tag}>${inner}</${tag}>\n`
        i++
        break
      }

      // ==== PARAGRAPHS (\n runs) ====
      case undefined:
      case ElementType.TEXT: {
        // accumulate until a newline-only element or non-text
        let txt = ''
        while (
          i < elements.length &&
          (!elements[i].type ||
            elements[i].type === ElementType.TEXT ||
            elements[i].type === ElementType.SUPERSCRIPT ||
            elements[i].type === ElementType.SUBSCRIPT)
        ) {
          const t = elements[i]
          let v = escapeHtml(t.value)
          if (t.type === ElementType.SUPERSCRIPT) v = `<sup>${v}</sup>`
          if (t.type === ElementType.SUBSCRIPT) v = `<sub>${v}</sub>`
          if (t.variable) {
            v = `<span class="variable" data-value="${
              t.groupIds?.[0] || ''
            }">${v}</span>`
          }
          txt += v
          i++
        }
        // wrap in <p> if it contains non-newline text
        if (txt.trim()) {
          out += `<p>${txt.replace(/\n/g, '<br/>')}</p>\n`
        }
        break
      }

      // ==== PAGE BREAK ====
      case ElementType.PAGE_BREAK:
        out += `<!-- pagebreak -->\n`
        i++
        break

      // ==== SEPARATOR (HR) ====
      case ElementType.SEPARATOR:
        out += `<hr/>\n`
        i++
        break

      // ==== LISTS ====
      case ElementType.LIST: {
        const tag = el.listType === ListType.UL ? 'ul' : 'ol'
        out += `<${tag}>\n`
        ;(el.valueList || []).forEach(item => {
          const txt = escapeHtml(item.value).replace(/\n/g, '<br/>')
          out += `  <li>${txt}</li>\n`
        })
        out += `</${tag}>\n`
        i++
        break
      }

      // ==== TABLE ====
      case ElementType.TABLE: {
        out += `<table border="1" style="border-collapse:collapse;">\n`
        // colgroup if any
        if (el.colgroup) {
          out += `  <colgroup>\n`
          el.colgroup.forEach(c => (out += `    <col width="${c.width}" />\n`))
          out += `  </colgroup>\n`
        }
        // eslint-disable-next-line @typescript-eslint/no-extra-semi
        ;(el.trList || []).forEach(tr => {
          out += `  <tr${tr.height ? ` height="${tr.height}"` : ''}>\n`
          tr.tdList.forEach(td => {
            const cs = td.colspan > 1 ? ` colspan="${td.colspan}"` : ''
            const rs = td.rowspan > 1 ? ` rowspan="${td.rowspan}"` : ''
            const cellHtml = td.value.map(c => escapeHtml(c.value)).join('')
            out += `    <td${cs}${rs}>${cellHtml}</td>\n`
          })
          out += `  </tr>\n`
        })
        out += `</table>\n`
        i++
        break
      }

      // ==== HYPERLINK ====
      case ElementType.HYPERLINK: {
        const inner = (el.valueList || [])
          .map(c => escapeHtml(c.value))
          .join('')
        out += `<a href="${el.url}">${inner}</a>`
        i++
        break
      }

      // ==== IMAGE ====
      case ElementType.IMAGE:
        out += `<img src="${el.value}"${el.id ? ` id="${el.id}"` : ''}`
        if (el.width) out += ` width="${el.width}"`
        if (el.height) out += ` height="${el.height}"`
        out += `/>\n`
        i++
        break

      // ==== CONTROL (TEXT, SELECT, CHECKBOX, DATE) ====
      case ElementType.CONTROL: {
        const ctrl = el.control!
        const attrs = [`data-control-type="${ctrl.type}"`]
        if (ctrl.conceptId) attrs.push(`data-concept-id="${ctrl.conceptId}"`)
        if (ctrl.placeholder) attrs.push(`placeholder="${ctrl.placeholder}"`)
        if (ctrl.type === ControlType.TEXT && ctrl.minWidth)
          attrs.push(`data-min-width="${ctrl.minWidth}"`)
        if (ctrl.type === ControlType.TEXT && ctrl.underline)
          attrs.push(`data-underline`)
        if (
          ctrl.type === ControlType.SELECT ||
          ctrl.type === ControlType.CHECKBOX
        )
          attrs.push(`data-values='${JSON.stringify(ctrl.valueSets)}'`)
        // date uses format
        out += `<span ${attrs.join(' ')}></span>\n`
        i++
        break
      }

      // ==== LATEX ====
      case ElementType.LATEX:
        out += `\\(${escapeHtml(el.value)}\\)\n`
        i++
        break

      // ==== TAB ====
      case ElementType.TAB:
        out += `\t`
        i++
        break

      default:
        // unknown—print raw
        out += escapeHtml(el.value)
        i++
        break
    }
  }

  return out.trim()
}
