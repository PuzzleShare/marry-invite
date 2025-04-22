import { $isTextNode } from "lexical"

import { CSS_TO_STYLES } from "./constants"

function getDOMTextNode(element) {
  let node = element

  while (node != null) {
    if (node.nodeType === Node.TEXT_NODE) {
      return node
    }

    node = node.firstChild
  }

  return null
}

function getDOMIndexWithinParent(node) {
  const parent = node.parentNode

  if (parent == null) {
    throw new Error("Should never happen")
  }

  return [parent, Array.from(parent.childNodes).indexOf(node)]
}

/**
 * Creates a selection range for the DOM.
 * @param editor - The lexical editor.
 * @param anchorNode - The anchor node of a selection.
 * @param _anchorOffset - The amount of space offset from the anchor to the focus.
 * @param focusNode - The current focus.
 * @param _focusOffset - The amount of space offset from the focus to the anchor.
 * @returns The range of selection for the DOM that was created.
 */
export function createDOMRange(
  editor,
  anchorNode,
  _anchorOffset,
  focusNode,
  _focusOffset
) {
  const anchorKey = anchorNode.getKey()
  const focusKey = focusNode.getKey()
  const range = document.createRange()
  let anchorDOM = editor.getElementByKey(anchorKey)
  let focusDOM = editor.getElementByKey(focusKey)
  let anchorOffset = _anchorOffset
  let focusOffset = _focusOffset

  if ($isTextNode(anchorNode)) {
    anchorDOM = getDOMTextNode(anchorDOM)
  }

  if ($isTextNode(focusNode)) {
    focusDOM = getDOMTextNode(focusDOM)
  }

  if (
    anchorNode === undefined ||
    focusNode === undefined ||
    anchorDOM === null ||
    focusDOM === null
  ) {
    return null
  }

  if (anchorDOM.nodeName === "BR") {
    ;[anchorDOM, anchorOffset] = getDOMIndexWithinParent(anchorDOM)
  }

  if (focusDOM.nodeName === "BR") {
    ;[focusDOM, focusOffset] = getDOMIndexWithinParent(focusDOM)
  }

  const firstChild = anchorDOM.firstChild

  if (
    anchorDOM === focusDOM &&
    firstChild != null &&
    firstChild.nodeName === "BR" &&
    anchorOffset === 0 &&
    focusOffset === 0
  ) {
    focusOffset = 1
  }

  try {
    range.setStart(anchorDOM, anchorOffset)
    range.setEnd(focusDOM, focusOffset)
  } catch (e) {
    return null
  }

  if (
    range.collapsed &&
    (anchorOffset !== focusOffset || anchorKey !== focusKey)
  ) {
    // Range is backwards, we need to reverse it
    range.setStart(focusDOM, focusOffset)
    range.setEnd(anchorDOM, anchorOffset)
  }

  return range
}

/**
 * Creates DOMRects, generally used to help the editor find a specific location on the screen.
 * @param editor - The lexical editor
 * @param range - A fragment of a document that can contain nodes and parts of text nodes.
 * @returns The selectionRects as an array.
 */
export function createRectsFromDOMRange(editor, range) {
  const rootElement = editor.getRootElement()

  if (rootElement === null) {
    return []
  }
  const rootRect = rootElement.getBoundingClientRect()
  const computedStyle = getComputedStyle(rootElement)
  const rootPadding =
    parseFloat(computedStyle.paddingLeft) +
    parseFloat(computedStyle.paddingRight)
  const selectionRects = Array.from(range.getClientRects())
  let selectionRectsLength = selectionRects.length
  //sort rects from top left to bottom right.
  selectionRects.sort((a, b) => {
    const top = a.top - b.top
    // Some rects match position closely, but not perfectly,
    // so we give a 3px tolerance.
    if (Math.abs(top) <= 3) {
      return a.left - b.left
    }
    return top
  })
  let prevRect
  for (let i = 0; i < selectionRectsLength; i++) {
    const selectionRect = selectionRects[i]
    // Exclude rects that overlap preceding Rects in the sorted list.
    const isOverlappingRect =
      prevRect &&
      prevRect.top <= selectionRect.top &&
      prevRect.top + prevRect.height > selectionRect.top &&
      prevRect.left + prevRect.width > selectionRect.left
    // Exclude selections that span the entire element
    const selectionSpansElement =
      selectionRect.width + rootPadding === rootRect.width
    if (isOverlappingRect || selectionSpansElement) {
      selectionRects.splice(i--, 1)
      selectionRectsLength--
      continue
    }
    prevRect = selectionRect
  }
  return selectionRects
}

/**
 * Creates an object containing all the styles and their values provided in the CSS string.
 * @param css - The CSS string of styles and their values.
 * @returns The styleObject containing all the styles and their values.
 */
export function getStyleObjectFromRawCSS(css) {
  const styleObject = {}
  if (!css) {
    return styleObject
  }
  const styles = css.split(";")

  for (const style of styles) {
    if (style !== "") {
      const [key, value] = style.split(/:([^]+)/) // split on first colon
      if (key && value) {
        styleObject[key.trim()] = value.trim()
      }
    }
  }

  return styleObject
}

/**
 * Given a CSS string, returns an object from the style cache.
 * @param css - The CSS property as a string.
 * @returns The value of the given CSS property.
 */
export function getStyleObjectFromCSS(css) {
  let value = CSS_TO_STYLES.get(css)
  if (value === undefined) {
    value = getStyleObjectFromRawCSS(css)
    CSS_TO_STYLES.set(css, value)
  }

  return value
}

/**
 * Gets the CSS styles from the style object.
 * @param styles - The style object containing the styles to get.
 * @returns A string containing the CSS styles and their values.
 */
export function getCSSFromStyleObject(styles) {
  let css = ""

  for (const style in styles) {
    if (style) {
      css += `${style}: ${styles[style]};`
    }
  }

  return css
}
