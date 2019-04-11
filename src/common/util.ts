
export function supportsCSS(attr: String): Boolean {
  let styleList: String[] = []
  if (!styleList.length) {
    let dom: Element = document.createElement('div')
    styleList = Object.keys(dom)
  }
  return styleList.includes(attr)
}