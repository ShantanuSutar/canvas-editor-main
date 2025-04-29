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
export function renderElementListToHtml(elements: IElement[]): string {
  let out = ''
  let i = 0

  while (i < elements.length) {
    const el = elements[i]

    switch (el.type) {
      // ==== TITLE ====
      case ElementType.TITLE: {
        const tag =
          {
            [TitleLevel.FIRST]: 'h1',
            [TitleLevel.SECOND]: 'h2',
            [TitleLevel.THIRD]: 'h3',
            [TitleLevel.FOURTH]: 'h4',
            [TitleLevel.FIFTH]: 'h5',
            [TitleLevel.SIXTH]: 'h6'
          }[el.level!] || 'h3'

        // Render each segment in valueList
        const inner = (el.valueList || [])
          .map(seg => {
            if (seg.variable && seg.variableName) {
              // Use the saved placeholder, e.g. "{{COMPANY_NAME}}"
              const placeholder = seg.variableName
              // Un-braced key for data-value attr:
              const key = placeholder.replace(/^\{\{|\}\}$/g, '')
              return `<span class="variable" data-value="${key}">${placeholder}</span>`
            }
            return escapeHtml(seg.value)
          })
          .join('')

        out += `<${tag}>${inner}</${tag}>\n`
        i++
        break
      }

      // ==== TEXT / SUP / SUB runs ====
      case undefined:
      case ElementType.TEXT:
      case ElementType.SUPERSCRIPT:
      case ElementType.SUBSCRIPT: {
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
            piece = `<span class="variable" data-value="${key}">${placeholder}</span>`
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
        break
      }

      // ==== PAGE BREAK ====
      case ElementType.PAGE_BREAK:
        out += `<!-- pagebreak -->\n`
        i++
        break

      // ==== HR / SEPARATOR ====
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
            const cell = td.value.map(c => escapeHtml(c.value)).join('')
            out += `    <td${cs}${rs}>${cell}</td>\n`
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
        out +=
          `<img src="${el.value}"` +
          `${el.id ? ` id="${el.id}"` : ''}` +
          `${el.width ? ` width="${el.width}"` : ''}` +
          `${el.height ? ` height="${el.height}"` : ''}/> \n`
        i++
        break

      // ==== CONTROL ====
      case ElementType.CONTROL: {
        const c = el.control!
        const attrs = [`data-control-type="${c.type}"`]
        if (c.conceptId) attrs.push(`data-concept-id="${c.conceptId}"`)
        if (c.placeholder) attrs.push(`placeholder="${c.placeholder}"`)
        if (c.type === ControlType.TEXT && c.minWidth)
          attrs.push(`data-min-width="${c.minWidth}"`)
        if (c.type === ControlType.TEXT && c.underline)
          attrs.push(`data-underline`)
        if (
          (c.type === ControlType.SELECT || c.type === ControlType.CHECKBOX) &&
          c.valueSets
        )
          attrs.push(`data-values='${JSON.stringify(c.valueSets)}'`)

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

      // ==== FALLBACK ====
      default:
        out += escapeHtml(el.value)
        i++
        break
    }
  }

  return out.trim()
}
