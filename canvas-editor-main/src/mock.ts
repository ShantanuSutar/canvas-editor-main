import {
  ControlType,
  ElementType,
  IEditorOption,
  IElement,
  ListType,
  TitleLevel
} from './editor'

const tempData = {
  report_name: 'Default Report',
  template_name: '409A',
  user: 'Shantanu Sutar',
  created_at: '2025-04-14T10:19:46.371Z',
  // content:
  //   '<p>Common stock valuation for</p>\n<h2 id="revelar-biotherapeutics-inc"><span data-value="COMPANY_NAME" class="variable"><span data-value="COMPANY_NAME" class="variable">{{COMPANY_NAME}}</span></span></h2>\n<p>Valuation Date: <span data-value="VALUATION_DATE" class="variable"><span data-value="VALUATION_DATE" class="variable">{{VALUATION_DATE}}</span></span></p>\n<p>Prepared by <span data-value="PREPARED_BY" class="variable"><span data-value="PREPARED_BY" class="variable">{{PREPARED_BY}}</span></span> on <span data-value="VALUATION_DATE" class="variable"><span data-value="VALUATION_DATE" class="variable">{{VALUATION_DATE}}</span></span></p>\n<p><span data-value="CEO_NAME" class="variable"><span data-value="CEO_NAME" class="variable">{{CEO_NAME}}</span></span><br><span data-value="VALUATION_DATE" class="variable"><span data-value="VALUATION_DATE" class="variable">{{VALUATION_DATE}}</span></span></p>\n<h5>Chief Executive Officer</h5>\n<h3 id="revelar-biotherapeutics-inc-1"><span data-value="COMPANY_NAME" class="variable"><span data-value="COMPANY_NAME" class="variable">{{COMPANY_NAME}}</span></span></h3>\n<h6><span data-value="ADDRESS" class="variable"><span data-value="ADDRESS" class="variable">{{ADDRESS}}</span></span></h6>\n<!-- pagebreak -->\n<h3 id="table-of-contents">TABLE OF CONTENTS</h3>\n<ul>\n<li>Introduction / Letter of Engagement</li>\n<li>Standard of Value</li>\n<li>Scope of Engagement</li>\n<li>Scope of Analysis</li>\n<li>Valuation Summary</li>\n<li>Company Overview &amp; Company Update</li>\n<li><span data-value="COMPANY_NAME" class="variable"><span data-value="COMPANY_NAME" class="variable">{{COMPANY_NAME}}</span></span> Financials</li>\n<li>Capitalization</li>\n<li>Valuation Methodology Summary</li>\n<li>Report Certification</li>\n<li>Appraiser Bio &amp; Credentials</li>\n<li>Statement of Assumptions and Limiting Conditions</li>\n<li>Appendix (Economic Overview, Major Products, Operating Conditions, Valuation Methodologies, Allocation)</li>\n</ul>\n<!-- pagebreak -->\n<h3 id="introduction-letter-of-engagement">Introduction / Letter of Engagement</h3>\n<p><span data-value="CEO_NAME" class="variable"><span data-value="CEO_NAME" class="variable">{{CEO_NAME}}</span></span> March 9, 2022 <br>Chief Executive Officer <br><span data-value="COMPANY_NAME" class="variable"><span data-value="COMPANY_NAME" class="variable">{{COMPANY_NAME}}</span></span> <br>9630 Eagle Ridge Drive Bethesda, MD 20817 <br>This report details the valuation analysis used to derive the fair market value of the common equity of <span data-value="COMPANY_NAME" class="variable"><span data-value="COMPANY_NAME" class="variable">{{COMPANY_NAME}}</span></span> (hereinafter referred to as “<span data-value="COMPANY_NAME" class="variable"><span data-value="COMPANY_NAME" class="variable">{{COMPANY_NAME}}</span></span>” or the “Company”) on a per share basis (“Subject Interest”) as of <span data-value="VALUATION_DATE" class="variable"><span data-value="VALUATION_DATE" class="variable">{{VALUATION_DATE}}</span></span>. It is understood that the valuation of the Subject Interest, as developed in this report, will be used for tax planning and financial reporting purposes in recognition of Internal Revenue Code Section 409A (“409A”) and FASB Accounting Standards Codification Topic 718 - Stock Compensation (“ASC 718”). As such, this report should not be used for any other purpose.</p>\n<p>The analysis was prepared following the guidance of the American Institute of Certified Public Accountants (“AICPA”) Accounting and Valuation Guide: Valuation of Privately-Held-Company Equity Securities Issued as Compensation (the “AICPA Guide”).</p>\n<h3 id="standard-of-value">STANDARD OF VALUE</h3>\n<p>For income tax purposes, the appropriate standard of value is fair market value ("FMV"), which is defined as:</p>\n<h6>The price, expressed in terms of cash equivalents, at which such property would change hands between a hypothetical willing and able buyer and a hypothetical willing and able seller, acting at arms length in an open and unrestricted market, when neither is under compulsion to buy or to sell, and when both have reasonable knowledge of relevant facts.</h6>\n<p>For financial reporting purposes, the appropriate standard of value is fair value ("FV"), which is defined as:</p>\n<h6>The amount at which an asset (or liability) could be bought (or incurred) or sold (or settled) in a current transaction between willing parties, that is, other than in a forced or liquidation sale.</h6>\n<p>As noted in the FASB Board meeting of May ',
  content:
    '&nbsp;\n<p>Common stock valuation for</p>\n<h2 id="revelar-biotherapeutics-inc"><span data-value="COMPANY_NAME" class="variable"><span data-value="COMPANY_NAME" class="variable">{{COMPANY_NAME}}</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></h2>\n<p>valuation date : <span data-value="VALUATION_DATE" class="variable"><span data-value="VALUATION_DATE" class="variable">{{VALUATION_DATE}}</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></p>\n<p>prepared by <span data-value="PREPARED_BY" class="variable"><span data-value="PREPARED_BY" class="variable">{{PREPARED_BY}}</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span> on <span data-value="VALUATION_DATE" class="variable"><span data-value="VALUATION_DATE" class="variable">{{VALUATION_DATE}}</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></p>\n<p><span data-value="CEO_NAME" class="variable"><span data-value="CEO_NAME" class="variable">{{CEO_NAME}}</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span> <span data-value="VALUATION_DATE" class="variable"><span data-value="VALUATION_DATE" class="variable">{{VALUATION_DATE}}</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></p>\n<h5>Chief Executive Officer</h5>\n<h3 id="revelar-biotherapeutics-inc-1"><span data-value="COMPANY_NAME" class="variable"><span data-value="COMPANY_NAME" class="variable">{{COMPANY_NAME}}</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></h3>\n<h6><span data-value="ADDRESS" class="variable"><span data-value="ADDRESS" class="variable">{{ADDRESS}}</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></h6>\n<p>This report details the valuation analysis used to deri the fair market value of the common equity of <span data-value="COMPANY_NAME" class="variable"><span data-value="COMPANY_NAME" class="variable">{{COMPANY_NAME}}</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span> (hereinafter referred to as “<span data-value="COMPANY_NAME" class="variable"><span data-value="COMPANY_NAME" class="variable">{{COMPANY_NAME}}</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span>” or the “Company”) on a per share basis (“Subject Interest”) as of Dec. 31, 2021 (“Valuation Date”). It is understood that the valuation of the Subject Interest, as developed in this report, will be used for tax planning and financial reporting purposes in recognition of Internal Revenue Code Section 409A (“409A”) and FASB Accounting Standards Codification Topic 718 – Stock Compensation (“ASC 718”). As such, this report should not be used for any other purpose.</p>\n<h3 id="asdasdads">asdasdads&nbsp;</h3>\n<p>The analysis was prepared following the guidance of the American Institute of Certified Public Accountants (“AICPA”) Accounting and Valuation Guide: Valuation of Privately-Held-Company Equity Securities Issued as Compensation (the “AICPA Guide”). <span data-value="VALUE" class="variable"><span data-value="VALUE" class="variable">{{VALUE}}</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></p>\n<h3 id="standard-of-value">STANDARD OF VALUE</h3>\n<p>For income tax purposes, the appropriate standard of value is fair market value ("FMV"), which is defined as:&nbsp;</p>\n<h6>The price, expressed in terms of cash equivalents, at which such property would change hands between a hypothetical willing and able buyer and a hypothetical willing and able seller, acting at arm’s length in an open and unrestricted market, when neither is under compulsion to buy or to sell, and when both have reasonable knowledge of relevant facts</h6>\n<p>For financial reporting purposes, the appropriate standard of value is fair value ("FV"), which is defined as:</p>\n<h6>The amount at which an asset (or liability) could be bought (or incurred) or sold (or settled) in a current transaction between willing parties, that is, other than in a forced or liquidation sale.</h6>\n<p>According to the May 7, 2003 FASB Board meeting, the above definition of fair value is consistent with the definition of fair market value in Internal Revenue Ruling 59-60. We are not aware of any facts that would cause a difference in our conclusions on a fair market value basis compared with fair value. As such, it is not unreasonable that our conclusion of fair value for financial reporting purposes be consistent with our conclusion of fair market value for tax reporting purposes.</p>\n<h3 id="scope-of-engagement">SCOPE OF ENGAGEMENT</h3>\n<p>This report was created in compliance with guidance regarding valuation methodologies published by the AICPA</p>\n<p>We considered differences between the Company’s preferred and common shares, as applicable, with respect to liquidation preferences, conversion rights, voting rights, and other features. We also considered appropriate adjustments to recognize lack of marketability related to the Subject Interest</p>\n<h3 id="scope-of-analysis">SCOPE OF ANALYSIS</h3>\n<p><span data-value="PREPARED_BY" class="variable"><span data-value="PREPARED_BY" class="variable">{{PREPARED_BY}}</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span> has based this report on information provided and represented by the management of <span data-value="COMPANY_NAME" class="variable"><span data-value="COMPANY_NAME" class="variable">{{COMPANY_NAME}}</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span> (“Management”). Our review and analysis included, but was not necessarily limited to, the following steps:</p>\n<ul>\n<li>Communication with Management concerning the assets, financial and operating history and forecasted future operations of the Company;</li>\n<li>Analysis of audited and unaudited historical and forecast financial statements, as applicable, and other financial and operational data concerning the Company;</li>\n<li>Review of corporate documents including, but not limited to, the capitalization summary of preferred stock (“Preferred Stock” or “Preferred Shares”), Common Stock, options and warrants;</li>\n<li>Analysis of the Company, its financial and operating history, the nature of its product(s)/service(s), technologies and its competitive position;</li>\n<li>Analysis of the industry in which the Company competes, the stage of the development of the Company’s target markets and the pace of adoption of its chosen technology platforms;</li>\n<li>Research and analysis concerning comparable public companies and transactions involving comparable public and private companies;</li>\n<li>Analysis concerning the current economic conditions and outlook for the US economy, as well as applicable global economic conditions;</li>\n<li>Analysis and estimation of the FMV and FV of the common equity on a non-marketable, minority interest basis as of the Valuation Date.</li>\n</ul>\n<h3 id="valuation-summary">VALUATION SUMMARY</h3>\n<span data-value="FINANCIALS" class="variable"><span data-value="FINANCIALS" class="variable">{{FINANCIALS}}</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span>\n<h3 id="company-overview">COMPANY OVERVIEW</h3>\n<p><span data-value="COMPANY_NAME" class="variable"><span data-value="COMPANY_NAME" class="variable">{{COMPANY_NAME}}</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span> combines the best of antibody target discovery science, technology platforms, and strategic/operational execution to accelerate treatments to improve and extend patient lives. Currently, the Company is undertaking pre-clinical studies for a lead antibody treatment for SARS-COV-2 and are evaluating future targets in infectious diseases such as Flu and oncology. The company was founded in 2021 and is based out of Bethesda, MD</p>\n<h3 id="revelar-biotherapeutics-inc-financials"><span data-value="COMPANY_NAME" class="variable"><span data-value="COMPANY_NAME" class="variable">{{COMPANY_NAME}}</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span> FINANCIALS</h3>\n<span data-value="CAPITALIZATION_TABLE" class="variable"><span data-value="CAPITALIZATION_TABLE" class="variable">{{CAPITALIZATION_TABLE}}</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span>\n<h3 id="comps">COMPS</h3>\n<span data-value="COMPS" class="variable"><span data-value="COMPS" class="variable">{{COMPS}}</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span>',
  variables: {
    mapped: {
      ADDRESS: '9630 Eagle Ridge Drive Bethesda, MD 20817',
      CEO_NAME: 'Glenn Marina',
      FINANCIALS:
        '<table border="1" style="border-collapse: collapse; width: 100%;"><thead><tr><td colspan="3" style="text-align: center; font-weight: bold;">Revelar Biotherapeutics, Inc. Financials as of Year End </td></tr></thead><tbody><tr><td></td><td>2021</td><td>2022</td></tr><tr><td>Revenue</td><td>0</td><td>0</td></tr><tr><td>EBITDA</td><td>-3096843</td><td>-19582000</td></tr><tr><td></td><td>Actual </td><td>Expected</td></tr><thead><tr><td colspan="3" style="text-align: center; font-weight: bold;">Revelar Biotherapeutics, Inc. Balance Sheet as of Year End</td></tr></thead><tbody><tr><td></td><td>2021</td><td></td></tr><tr><td>Cash & Cash Equivalents</td><td>3545941</td><td></td></tr><tr><td>Interest Bearing Liabilities</td><td>8500000</td><td></td></tr></tbody></table>',
      COMPANY_NAME: 'Revelar Biotherapeutics, Inc.',
      VALUATION_DATE: '2021-12-31 ',
      CAPITALIZATION_TABLE:
        '<table border="1" style="border-collapse: collapse; width: 100%;"><thead><tr><td colspan="13" style="text-align: center; font-weight: bold;">Revelar Biotherapeutics, Inc. Capitalization Table (Share Classes) as of December 31, 2021</td></tr></thead><tbody><tr><td>Outstanding Shares</td><td>Shares Outstanding </td><td>Warrants</td><td>Options</td><td>Total</td><td>Issue Price</td><td>Liquidation Preference</td><td>Multiplier</td><td>Dividend Type</td><td>Dividend Rate</td><td>Participation</td><td>Participation Cap</td><td>Conversion Ratio</td></tr><tr><td>Series Seed Preferred Stock</td><td>447066</td><td>0</td><td>0</td><td>447066</td><td>27.96</td><td>1</td><td>1</td><td>Non-Cumulative</td><td></td><td></td><td></td><td>1</td></tr><tr><td>Common</td><td>2451000</td><td>0</td><td>0</td><td>2451000</td><td>-</td><td>2</td><td>1</td><td></td><td></td><td></td><td></td><td>1</td></tr><tr><td>Total</td><td>2898066</td><td>0</td><td>0</td><td>2898066</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><thead><tr><td colspan="13" style="text-align: center; font-weight: bold;">Revelar Biotherapeutics, Inc. Convertible Debt & Details as of December 31, 2021</td></tr></thead><tbody><tr><td>Principal Amount </td><td>Valuation Cap</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>8500000</td><td>25000000</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></tbody></table>'
    },
    unmapped: [
      'PREPARED_BY',
      'AICPA_NAME',
      'COMMON_STOCK_VALUE',
      'OPTION_PRICING_MODEL_TABLE',
      'COMPANY_VALUE_&amp;_BREAKPOINTS',
      'Managing_Director',
      'SENIOR_DIRECTOR',
      'Senior_Manager',
      'BENCHMARK_TABLE'
    ]
  }
}

// const text = `shantanu sutar`

// // 模拟标题（设定多个标题项）
// const titleText = ['shantanu', 'sutar']
// const titleMap: Map<number, string> = new Map()
// for (let t = 0; t < titleText.length; t++) {
//   const value = titleText[t]
//   const i = text.indexOf(value)
//   if (~i) {
//     titleMap.set(i, value)
//   }
// }

// // 模拟颜色字
// const colorText = ['传染性疾病']
// const colorIndex: number[] = colorText
//   .map(b => {
//     const i = text.indexOf(b)
//     return ~i
//       ? Array(b.length)
//           .fill(i)
//           .map((_, j) => i + j)
//       : []
//   })
//   .flat()

// // 模拟高亮字
// const highlightText = ['血细胞比容']
// const highlightIndex: number[] = highlightText
//   .map(b => {
//     const i = text.indexOf(b)
//     return ~i
//       ? Array(b.length)
//           .fill(i)
//           .map((_, j) => i + j)
//       : []
//   })
//   .flat()

// const elementList: IElement[] = []
// // 组合纯文本数据
// const textList = text.split('')
// let index = 0
// while (index < textList.length) {
//   const value = textList[index]
//   const title = titleMap.get(index)
//   if (title) {
//     elementList.push({
//       value: '',
//       type: ElementType.TITLE,
//       level: TitleLevel.FIRST,
//       valueList: [
//         {
//           value: title,
//           size: 18
//         }
//       ]
//     })
//     index += title.length - 1
//   } else if (colorIndex.includes(index)) {
//     elementList.push({
//       value,
//       color: '#FF0000',
//       size: 16
//     })
//   } else if (highlightIndex.includes(index)) {
//     elementList.push({
//       value,
//       highlight: '#F2F27F',
//       groupIds: ['1'] // 模拟批注
//     })
//   } else {
//     elementList.push({
//       value,
//       size: 16
//     })
//   }
//   index++
// }

// // 输出结果
// console.log(elementList)
// //模拟文本控件
// elementList.splice(12, 0, {
//   type: ElementType.CONTROL,
//   value: '',
//   control: {
//     conceptId: '1',
//     type: ControlType.TEXT,
//     value: null,
//     placeholder: '其他补充',
//     prefix: '{',
//     postfix: '}'
//   }
// })

// // 模拟下拉控件
// elementList.splice(94, 0, {
//   type: ElementType.CONTROL,
//   value: '',
//   control: {
//     conceptId: '2',
//     type: ControlType.SELECT,
//     value: null,
//     code: null,
//     placeholder: '有无',
//     prefix: '{',
//     postfix: '}',
//     valueSets: [
//       {
//         value: '有',
//         code: '98175'
//       },
//       {
//         value: '无',
//         code: '98176'
//       },
//       {
//         value: '不详',
//         code: '98177'
//       }
//     ]
//   }
// })

// // 模拟超链接
// elementList.splice(116, 0, {
//   type: ElementType.HYPERLINK,
//   value: '',
//   valueList: [
//     {
//       value: '新',
//       size: 16
//     },
//     {
//       value: '冠',
//       size: 16
//     },
//     {
//       value: '肺',
//       size: 16
//     },
//     {
//       value: '炎',
//       size: 16
//     }
//   ],
//   url: 'https://hufe.club/canvas-editor'
// })

// // 模拟文本控件（前后文本）
// elementList.splice(335, 0, {
//   type: ElementType.CONTROL,
//   value: '',
//   control: {
//     conceptId: '6',
//     type: ControlType.TEXT,
//     value: null,
//     placeholder: '内容',
//     preText: '其他：',
//     postText: '。'
//   }
// })

// // 模拟下标
// elementList.splice(346, 0, {
//   value: '∆',
//   color: '#FF0000',
//   type: ElementType.SUBSCRIPT
// })

// // 模拟上标
// elementList.splice(430, 0, {
//   value: '9',
//   type: ElementType.SUPERSCRIPT
// })

// // 模拟列表
// elementList.splice(451, 0, {
//   value: '',
//   type: ElementType.LIST,
//   listType: ListType.OL,
//   valueList: [
//     {
//       value: '高血压\n糖尿病\n病毒性感冒\n过敏性鼻炎\n过敏性鼻息肉'
//     }
//   ]
// })

// elementList.splice(453, 0, {
//   value: '',
//   type: ElementType.LIST,
//   listType: ListType.OL,
//   valueList: [
//     {
//       value:
//         '超声引导下甲状腺细针穿刺术；\n乙型肝炎表面抗体测定；\n膜式病变细胞采集术、后颈皮下肤层；'
//     }
//   ]
// })

// // 模拟图片
// elementList.splice(456, 0, {
//   value: `data:image/png;base64,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`,
//   width: 89,
//   height: 32,
//   id: 'signature',
//   type: ElementType.IMAGE
// })

// // 模拟表格
// elementList.push({
//   type: ElementType.TABLE,
//   value: '',
//   colgroup: [
//     {
//       width: 180
//     },
//     {
//       width: 80
//     },
//     {
//       width: 130
//     },
//     {
//       width: 130
//     }
//   ],
//   trList: [
//     {
//       height: 40,
//       tdList: [
//         {
//           colspan: 1,
//           rowspan: 2,
//           value: [
//             { value: `1`, size: 16 },
//             { value: '.', size: 16 }
//           ]
//         },
//         {
//           colspan: 1,
//           rowspan: 1,
//           value: [
//             { value: `2`, size: 16 },
//             { value: '.', size: 16 }
//           ]
//         },
//         {
//           colspan: 2,
//           rowspan: 1,
//           value: [
//             { value: `3`, size: 16 },
//             { value: '.', size: 16 }
//           ]
//         }
//       ]
//     },
//     {
//       height: 40,
//       tdList: [
//         {
//           colspan: 1,
//           rowspan: 1,
//           value: [
//             { value: `4`, size: 16 },
//             { value: '.', size: 16 }
//           ]
//         },
//         {
//           colspan: 1,
//           rowspan: 1,
//           value: [
//             { value: `5`, size: 16 },
//             { value: '.', size: 16 }
//           ]
//         },
//         {
//           colspan: 1,
//           rowspan: 1,
//           value: [
//             { value: `6`, size: 16 },
//             { value: '.', size: 16 }
//           ]
//         }
//       ]
//     },
//     {
//       height: 40,
//       tdList: [
//         {
//           colspan: 1,
//           rowspan: 1,
//           value: [
//             { value: `7`, size: 16 },
//             { value: '.', size: 16 }
//           ]
//         },
//         {
//           colspan: 1,
//           rowspan: 1,
//           value: [
//             { value: `8`, size: 16 },
//             { value: '.', size: 16 }
//           ]
//         },
//         {
//           colspan: 1,
//           rowspan: 1,
//           value: [
//             { value: `9`, size: 16 },
//             { value: '.', size: 16 }
//           ]
//         },
//         {
//           colspan: 1,
//           rowspan: 1,
//           value: [
//             { value: `1`, size: 16 },
//             { value: `0`, size: 16 },
//             { value: '.', size: 16 }
//           ]
//         }
//       ]
//     }
//   ]
// })

// // 模拟checkbox
// elementList.push(
//   ...(<IElement[]>[
//     {
//       value: '是否同意以上内容：'
//     },
//     {
//       type: ElementType.CONTROL,
//       control: {
//         conceptId: '3',
//         type: ControlType.CHECKBOX,
//         code: '98175',
//         value: '',
//         valueSets: [
//           {
//             value: '同意',
//             code: '98175'
//           },
//           {
//             value: '否定',
//             code: '98176'
//           }
//         ]
//       },
//       value: ''
//     },
//     {
//       value: '\n'
//     }
//   ])
// )

// // LaTex公式
// elementList.push(
//   ...(<IElement[]>[
//     {
//       value: '医学公式：'
//     },
//     {
//       value: `{E_k} = hv - {W_0}`,
//       type: ElementType.LATEX
//     },
//     {
//       value: '\n'
//     }
//   ])
// )

// // 日期选择
// elementList.push(
//   ...(<IElement[]>[
//     {
//       value: '签署日期：'
//     },
//     {
//       type: ElementType.CONTROL,
//       value: '',
//       control: {
//         conceptId: '5',
//         type: ControlType.DATE,
//         value: [
//           {
//             value: `2022-08-10 17:30:01`
//           }
//         ],
//         placeholder: '签署日期'
//       }
//     },
//     {
//       value: '\n'
//     }
//   ])
// )

// // 模拟固定长度下划线
// elementList.push(
//   ...[
//     {
//       value: '患者签名：'
//     },
//     {
//       type: ElementType.CONTROL,
//       value: '',
//       control: {
//         conceptId: '4',
//         type: ControlType.TEXT,
//         value: null,
//         placeholder: '',
//         prefix: '\u200c',
//         postfix: '\u200c',
//         minWidth: 160,
//         underline: true
//       }
//     }
//   ]
// )

// // 模拟结尾文本
// elementList.push(
//   ...[
//     {
//       value: '\n'
//     },
//     {
//       value: '',
//       type: ElementType.TAB
//     },
//     {
//       value: 'E',
//       size: 16
//     },
//     {
//       value: 'O',
//       size: 16
//     },
//     {
//       value: 'F',
//       size: 16
//     }
//   ]
// )
// 使用 tempData.content 中的 HTML
// 使用 tempData.content 中的 HTML
// 1) 原始 HTML 内容 & 变量映射
const htmlContent = tempData.content
const variablesMap: Record<string, string> = tempData.variables.mapped || {}

// 2) DOMParser / jsdom 兼容层
// NO static import of jsdom up top!

let document: Document

if (typeof window !== 'undefined' && window.DOMParser) {
  // Browser path
  document = new DOMParser().parseFromString(htmlContent, 'text/html')
} else {
  // Server path – dynamically require JSDOM so bundlers won’t include it in the client bundle
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { JSDOM } = require('jsdom')
  document = new JSDOM(htmlContent).window.document
}

// …proceed with traverse(document.body)…

// 3) 准备输出、常量与映射
const elementList: IElement[] = []

const TEXT_NODE = 3
const ELEMENT_NODE = 1
const COMMENT_NODE = 8

const headingMap: Record<string, TitleLevel> = {
  H1: TitleLevel.FIRST,
  H2: TitleLevel.SECOND,
  H3: TitleLevel.THIRD,
  H4: TitleLevel.FOURTH,
  H5: TitleLevel.FIFTH,
  H6: TitleLevel.SIXTH
}

// 4) 核心遍历函数：加入 isVariable 标记
function traverse(node: Node, isVariable = false, varKey?: string) {
  // 1) handle <!-- pagebreak -->
  if (node.nodeType === COMMENT_NODE) {
    const comment = (node as Comment).data || ''
    if (/pagebreak/i.test(comment)) {
      elementList.push({
        value: '',
        type: ElementType.PAGE_BREAK,
        variable: isVariable,
        variableName: isVariable && varKey ? `{{${varKey}}}` : undefined
      })
    }
    return
  }

  // 2) text nodes
  if (node.nodeType === TEXT_NODE) {
    const text = node.textContent || ''
    for (const char of text) {
      elementList.push({
        value: char,
        size: 16,
        variable: isVariable,
        variableName: isVariable && varKey ? `{{${varKey}}}` : undefined
      })
    }
    return
  }

  // 3) element nodes
  const el = node as HTMLElement
  const tag = el.tagName.toUpperCase()

  // —— variable spans ——
  if (el.classList.contains('variable')) {
    const key = el.getAttribute('data-value') || ''
    const mapped = variablesMap[key] || ''
    const container = document.createElement('div')
    container.innerHTML = mapped

    if (!container.querySelector('*')) {
      // pure text → push each char, with mapped text in value
      for (const ch of mapped) {
        elementList.push({
          value: ch,
          size: 16,
          color: '#0000FF',
          groupIds: ['variable'],
          variable: true,
          variableName: `{{${key}}}`
        })
      }
    } else {
      container.childNodes.forEach(n => traverse(n, true, key))
    }
    return
  }

  // —— headings H1–H6 ——
  if (headingMap[tag]) {
    const lvl = headingMap[tag]
    const segments: IElement[] = []

    el.childNodes.forEach(child => {
      if (
        child.nodeType === ELEMENT_NODE &&
        (child as HTMLElement).classList.contains('variable')
      ) {
        const k = (child as HTMLElement).getAttribute('data-value') || ''
        const mapped = variablesMap[k] || ''
        segments.push({
          value: mapped, // actual mapped text
          size: 18,
          color: '#0000FF',
          groupIds: ['variable'],
          variable: true,
          variableName: `{{${k}}}` // keep it only here
        })
      } else {
        const txt = child.textContent || ''
        if (txt) {
          segments.push({ value: txt, size: 18 })
        }
      }
    })

    elementList.push({
      value: '',
      type: ElementType.TITLE,
      level: lvl,
      valueList: segments,
      variable: segments.some(s => s.variable)
      // ← no variableName here anymore
    })
    return
  }

  // —— paragraphs & DIVs ——
  if (tag === 'P' || tag === 'DIV') {
    el.childNodes.forEach(n => traverse(n, isVariable, varKey))
    elementList.push({
      value: '\n',
      size: 16,
      variable: isVariable,
      variableName: isVariable && varKey ? `{{${varKey}}}` : undefined
    })
    return
  }

  // —— BR ——
  if (tag === 'BR') {
    elementList.push({
      value: '\n',
      size: 16,
      variable: isVariable,
      variableName: isVariable && varKey ? `{{${varKey}}}` : undefined
    })
    return
  }

  // —— HR ——
  if (tag === 'HR') {
    elementList.push({
      value: '',
      type: ElementType.SEPARATOR,
      variable: isVariable,
      variableName: isVariable && varKey ? `{{${varKey}}}` : undefined
    })
    return
  }

  // —— UL/OL ——
  if (tag === 'UL' || tag === 'OL') {
    const listType = tag === 'UL' ? ListType.UL : ListType.OL
    el.querySelectorAll('li').forEach(li => {
      elementList.push({
        value: '',
        type: ElementType.LIST,
        listType,
        valueList: [{ value: li.textContent || '', size: 16 }],
        variable: isVariable,
        variableName: isVariable && varKey ? `{{${varKey}}}` : undefined
      })
    })
    return
  }

  // —— TABLE ——
  if (tag === 'TABLE') {
    const trEls = Array.from(el.querySelectorAll('tr'))
    let cols = Array.from(el.querySelectorAll('col, colgroup col')).map(c => ({
      width: parseInt(c.getAttribute('width') || '100', 10)
    }))
    if (!cols.length) {
      const maxCells = trEls.reduce(
        (m, tr) => Math.max(m, tr.children.length),
        0
      )
      cols = Array(maxCells).fill({ width: 100 })
    }
    const trs = trEls.map(tr => ({
      height: parseInt(tr.getAttribute('height') || '0', 10),
      tdList: Array.from(tr.children).map(td => {
        const cell = td as HTMLElement
        const textNodes = Array.from(cell.childNodes).flatMap(ch =>
          ch.nodeType === TEXT_NODE
            ? [{ value: ch.textContent || '', size: 16 }]
            : []
        )
        return {
          colspan: parseInt(cell.getAttribute('colspan') || '1', 10),
          rowspan: parseInt(cell.getAttribute('rowspan') || '1', 10),
          value: textNodes
        }
      })
    }))
    elementList.push({
      type: ElementType.TABLE,
      value: '',
      colgroup: cols,
      trList: trs,
      variable: isVariable,
      variableName: isVariable && varKey ? `{{${varKey}}}` : undefined
    })
    return
  }

  // —— IMG ——
  if (tag === 'IMG') {
    elementList.push({
      type: ElementType.IMAGE,
      value: el.getAttribute('src') || '',
      width: parseInt(el.getAttribute('width') || '0', 10),
      height: parseInt(el.getAttribute('height') || '0', 10),
      id: el.id || undefined,
      variable: isVariable,
      variableName: isVariable && varKey ? `{{${varKey}}}` : undefined
    })
    return
  }

  // —— A link ——
  if (tag === 'A') {
    elementList.push({
      type: ElementType.HYPERLINK,
      value: '',
      valueList: [{ value: el.textContent || '', size: 16 }],
      url: el.getAttribute('href') || '',
      variable: isVariable,
      variableName: isVariable && varKey ? `{{${varKey}}}` : undefined
    })
    return
  }

  // —— CONTROL ——
  if (el.hasAttribute('data-control-type')) {
    const t = el.getAttribute('data-control-type') as ControlType
    const ctrl: any = {
      conceptId: el.getAttribute('data-concept-id') || '',
      type: t
    }
    if (t === ControlType.TEXT) {
      ctrl.placeholder = el.getAttribute('placeholder') || ''
      ctrl.minWidth = parseInt(el.getAttribute('data-min-width') || '0', 10)
      ctrl.underline = el.hasAttribute('data-underline')
    } else if (t === ControlType.SELECT || t === ControlType.CHECKBOX) {
      ctrl.placeholder = el.getAttribute('placeholder') || ''
      ctrl.valueSets = JSON.parse(el.getAttribute('data-values') || '[]')
    } else if (t === ControlType.DATE) {
      ctrl.placeholder = el.getAttribute('placeholder') || ''
    }
    elementList.push({
      type: ElementType.CONTROL,
      value: '',
      control: ctrl,
      variable: isVariable,
      variableName: isVariable && varKey ? `{{${varKey}}}` : undefined
    })
    return
  }

  // —— SUP / SUB ——
  if (tag === 'SUP') {
    elementList.push({
      value: el.textContent || '',
      type: ElementType.SUPERSCRIPT,
      variable: isVariable,
      variableName: isVariable && varKey ? `{{${varKey}}}` : undefined
    })
    return
  }
  if (tag === 'SUB') {
    elementList.push({
      value: el.textContent || '',
      type: ElementType.SUBSCRIPT,
      variable: isVariable,
      variableName: isVariable && varKey ? `{{${varKey}}}` : undefined
    })
    return
  }

  // —— LaTeX ——
  if (el.classList.contains('latex')) {
    elementList.push({
      value: el.textContent || '',
      type: ElementType.LATEX,
      variable: isVariable,
      variableName: isVariable && varKey ? `{{${varKey}}}` : undefined
    })
    return
  }

  // —— styled text B / I / U / S ——
  const styleProps: Record<string, any> = {}
  if (['B', 'STRONG'].includes(tag)) styleProps.bold = true
  if (['I', 'EM'].includes(tag)) styleProps.italic = true
  if (tag === 'U') styleProps.underline = true
  if (['S', 'DEL'].includes(tag)) styleProps.strikethrough = true

  if (Object.keys(styleProps).length) {
    const txt = el.textContent || ''
    for (const ch of txt) {
      elementList.push({
        value: ch,
        size: 16,
        ...styleProps,
        variable: isVariable,
        variableName: isVariable && varKey ? `{{${varKey}}}` : undefined
      })
    }
    return
  }

  // —— fallback recurse ——
  el.childNodes.forEach(n => traverse(n, isVariable, varKey))
}

// kick off traversal
document.body.childNodes.forEach(n => traverse(n))

// now elementList[] entries all carry:
//   - variable: true when applicable
//   - variableName: "{{KEY}}" for each run under that span
console.log(elementList)

export const data: IElement[] = elementList

interface IComment {
  id: string
  content: string
  userName: string
  rangeText: string
  createdDate: string
}
export const commentList: IComment[] = [
  {
    id: '1',
    content:
      '红细胞比容（HCT）是指每单位容积中红细胞所占全血容积的比值，用于反映红细胞和血浆的比例。',
    userName: 'Hufe',
    rangeText: '血细胞比容',
    createdDate: '2023-08-20 23:10:55'
  }
]

export const options: IEditorOption = {
  margins: [100, 120, 100, 120],
  // watermark: {
  //   data: 'CANVAS-EDITOR',
  //   size: 120
  // },
  pageNumber: {
    format: '第{pageNo}页/共{pageCount}页'
  },
  placeholder: {
    data: '请输入正文'
  },
  zone: {
    tipDisabled: false
  },
  maskMargin: [60, 0, 30, 0] // 菜单栏高度60，底部工具栏30为遮盖层
}
