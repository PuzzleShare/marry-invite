﻿/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { isModifierMatch } from "lexical"

const IS_APPLE = Boolean(navigator.userAgent.match(/Mac|PPC/))

//disable eslint sorting rule for quick reference to shortcuts
/* eslint-disable sort-keys-fix/sort-keys-fix */
export const SHORTCUTS = Object.freeze({
  // (Ctrl|⌘) + (Alt|Option) + <key> shortcuts
  NORMAL: IS_APPLE ? "⌘+Opt+0" : "Ctrl+Alt+0",
  HEADING1: IS_APPLE ? "⌘+Opt+1" : "Ctrl+Alt+1",
  HEADING2: IS_APPLE ? "⌘+Opt+2" : "Ctrl+Alt+2",
  HEADING3: IS_APPLE ? "⌘+Opt+3" : "Ctrl+Alt+3",
  BULLET_LIST: IS_APPLE ? "⌘+Opt+4" : "Ctrl+Alt+4",
  NUMBERED_LIST: IS_APPLE ? "⌘+Opt+5" : "Ctrl+Alt+5",
  CHECK_LIST: IS_APPLE ? "⌘+Opt+6" : "Ctrl+Alt+6",
  CODE_BLOCK: IS_APPLE ? "⌘+Opt+C" : "Ctrl+Alt+C",
  QUOTE: IS_APPLE ? "⌘+Opt+Q" : "Ctrl+Alt+Q",
  ADD_COMMENT: IS_APPLE ? "⌘+Opt+M" : "Ctrl+Alt+M",

  // (Ctrl|⌘) + Shift + <key> shortcuts
  INCREASE_FONT_SIZE: IS_APPLE ? "⌘+Shift+." : "Ctrl+Shift+.",
  DECREASE_FONT_SIZE: IS_APPLE ? "⌘+Shift+," : "Ctrl+Shift+,",
  INSERT_CODE_BLOCK: IS_APPLE ? "⌘+Shift+C" : "Ctrl+Shift+C",
  STRIKETHROUGH: IS_APPLE ? "⌘+Shift+S" : "Ctrl+Shift+S",
  LOWERCASE: IS_APPLE ? "⌘+Shift+1" : "Ctrl+Shift+1",
  UPPERCASE: IS_APPLE ? "⌘+Shift+2" : "Ctrl+Shift+2",
  CAPITALIZE: IS_APPLE ? "⌘+Shift+3" : "Ctrl+Shift+3",
  CENTER_ALIGN: IS_APPLE ? "⌘+Shift+E" : "Ctrl+Shift+E",
  JUSTIFY_ALIGN: IS_APPLE ? "⌘+Shift+J" : "Ctrl+Shift+J",
  LEFT_ALIGN: IS_APPLE ? "⌘+Shift+L" : "Ctrl+Shift+L",
  RIGHT_ALIGN: IS_APPLE ? "⌘+Shift+R" : "Ctrl+Shift+R",

  // (Ctrl|⌘) + <key> shortcuts
  SUBSCRIPT: IS_APPLE ? "⌘+," : "Ctrl+,",
  SUPERSCRIPT: IS_APPLE ? "⌘+." : "Ctrl+.",
  INDENT: IS_APPLE ? "⌘+]" : "Ctrl+]",
  OUTDENT: IS_APPLE ? "⌘+[" : "Ctrl+[",
  CLEAR_FORMATTING: IS_APPLE ? "⌘+\\" : "Ctrl+\\",
  REDO: IS_APPLE ? "⌘+Shift+Z" : "Ctrl+Y",
  UNDO: IS_APPLE ? "⌘+Z" : "Ctrl+Z",
  BOLD: IS_APPLE ? "⌘+B" : "Ctrl+B",
  ITALIC: IS_APPLE ? "⌘+I" : "Ctrl+I",
  UNDERLINE: IS_APPLE ? "⌘+U" : "Ctrl+U",
  INSERT_LINK: IS_APPLE ? "⌘+K" : "Ctrl+K"
})

const CONTROL_OR_META = { ctrlKey: !IS_APPLE, metaKey: IS_APPLE }

export function isFormatParagraph(event) {
  const { code } = event

  return (
    (code === "Numpad0" || code === "Digit0") &&
    isModifierMatch(event, { ...CONTROL_OR_META, altKey: true })
  )
}

export function isFormatHeading(event) {
  const { code } = event
  const keyNumber = code[code.length - 1]

  return (
    ["1", "2", "3"].includes(keyNumber) &&
    isModifierMatch(event, { ...CONTROL_OR_META, altKey: true })
  )
}

export function isFormatBulletList(event) {
  const { code } = event
  return (
    (code === "Numpad4" || code === "Digit4") &&
    isModifierMatch(event, { ...CONTROL_OR_META, altKey: true })
  )
}

export function isFormatNumberedList(event) {
  const { code } = event
  return (
    (code === "Numpad5" || code === "Digit5") &&
    isModifierMatch(event, { ...CONTROL_OR_META, altKey: true })
  )
}

export function isFormatCheckList(event) {
  const { code } = event
  return (
    (code === "Numpad6" || code === "Digit6") &&
    isModifierMatch(event, { ...CONTROL_OR_META, altKey: true })
  )
}

export function isFormatCode(event) {
  const { code } = event
  return (
    code === "KeyC" &&
    isModifierMatch(event, { ...CONTROL_OR_META, altKey: true })
  )
}

export function isFormatQuote(event) {
  const { code } = event
  return (
    code === "KeyQ" &&
    isModifierMatch(event, { ...CONTROL_OR_META, altKey: true })
  )
}

export function isLowercase(event) {
  const { code } = event
  return (
    (code === "Numpad1" || code === "Digit1") &&
    isModifierMatch(event, { ...CONTROL_OR_META, shiftKey: true })
  )
}

export function isUppercase(event) {
  const { code } = event
  return (
    (code === "Numpad2" || code === "Digit2") &&
    isModifierMatch(event, { ...CONTROL_OR_META, shiftKey: true })
  )
}

export function isCapitalize(event) {
  const { code } = event
  return (
    (code === "Numpad3" || code === "Digit3") &&
    isModifierMatch(event, { ...CONTROL_OR_META, shiftKey: true })
  )
}

export function isStrikeThrough(event) {
  const { code } = event
  return (
    code === "KeyS" &&
    isModifierMatch(event, { ...CONTROL_OR_META, shiftKey: true })
  )
}

export function isIndent(event) {
  const { code } = event
  return code === "BracketRight" && isModifierMatch(event, CONTROL_OR_META)
}

export function isOutdent(event) {
  const { code } = event
  return code === "BracketLeft" && isModifierMatch(event, CONTROL_OR_META)
}

export function isCenterAlign(event) {
  const { code } = event
  return (
    code === "KeyE" &&
    isModifierMatch(event, { ...CONTROL_OR_META, shiftKey: true })
  )
}

export function isLeftAlign(event) {
  const { code } = event
  return (
    code === "KeyL" &&
    isModifierMatch(event, { ...CONTROL_OR_META, shiftKey: true })
  )
}

export function isRightAlign(event) {
  const { code } = event
  return (
    code === "KeyR" &&
    isModifierMatch(event, { ...CONTROL_OR_META, shiftKey: true })
  )
}

export function isJustifyAlign(event) {
  const { code } = event
  return (
    code === "KeyJ" &&
    isModifierMatch(event, { ...CONTROL_OR_META, shiftKey: true })
  )
}

export function isSubscript(event) {
  const { code } = event
  return code === "Comma" && isModifierMatch(event, CONTROL_OR_META)
}

export function isSuperscript(event) {
  const { code } = event
  return code === "Period" && isModifierMatch(event, CONTROL_OR_META)
}

export function isInsertCodeBlock(event) {
  const { code } = event
  return (
    code === "KeyC" &&
    isModifierMatch(event, { ...CONTROL_OR_META, shiftKey: true })
  )
}

export function isIncreaseFontSize(event) {
  const { code } = event
  return (
    code === "Period" &&
    isModifierMatch(event, { ...CONTROL_OR_META, shiftKey: true })
  )
}

export function isDecreaseFontSize(event) {
  const { code } = event
  return (
    code === "Comma" &&
    isModifierMatch(event, { ...CONTROL_OR_META, shiftKey: true })
  )
}

export function isClearFormatting(event) {
  const { code } = event
  return code === "Backslash" && isModifierMatch(event, CONTROL_OR_META)
}

export function isInsertLink(event) {
  const { code } = event
  return code === "KeyK" && isModifierMatch(event, CONTROL_OR_META)
}

export function isAddComment(event) {
  const { code } = event
  return (
    code === "KeyM" &&
    isModifierMatch(event, { ...CONTROL_OR_META, altKey: true })
  )
}
