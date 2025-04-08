"use client";
import * as React from "react";

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";

import { $isTextNode, isHTMLElement, ParagraphNode, TextNode } from "lexical";

import ExampleTheme from "./ExampleTheme";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import TreeViewPlugin from "./plugins/TreeViewPlugin";
import { parseAllowedColor, parseAllowedFontSize } from "./styleConfig";
import "./styles.css";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { $getRoot, $insertNodes } from "lexical";

import { useAtom } from "jotai";
import { blockDataAtom } from "@/atoms/block";
import { selectedBlockAtom } from "@/atoms/selectedBlock";

const placeholder = "Enter some rich text...";

const removeStylesExportDOM = (editor, target) => {
  const output = target.exportDOM(editor);
  if (output && isHTMLElement(output.element)) {
    for (const el of [
      output.element,
      ...output.element.querySelectorAll('[style],[class],[dir="ltr"]'),
    ]) {
      el.removeAttribute("class");
      el.removeAttribute("style");
      if (el.getAttribute("dir") === "ltr") {
        el.removeAttribute("dir");
      }
    }
  }
  return output;
};

const exportMap = new Map([
  [ParagraphNode, removeStylesExportDOM],
  [TextNode, removeStylesExportDOM],
]);

const getExtraStyles = (element) => {
  let extraStyles = "";
  const fontSize = parseAllowedFontSize(element.style.fontSize);
  const backgroundColor = parseAllowedColor(element.style.backgroundColor);
  const color = parseAllowedColor(element.style.color);

  if (fontSize && fontSize !== "15px") {
    extraStyles += `font-size: ${fontSize};`;
  }
  if (backgroundColor && backgroundColor !== "rgb(255, 255, 255)") {
    extraStyles += `background-color: ${backgroundColor};`;
  }
  if (color && color !== "rgb(0, 0, 0)") {
    extraStyles += `color: ${color};`;
  }

  return extraStyles;
};

const constructImportMap = () => {
  const importMap = {};

  const textNodeImporters = TextNode.importDOM();
  for (const [tag, fn] of Object.entries(textNodeImporters || {})) {
    importMap[tag] = (importNode) => {
      const importer = fn(importNode);
      if (!importer) return null;

      return {
        ...importer,
        conversion: (element) => {
          const output = importer.conversion(element);
          if (
            !output ||
            output.forChild === undefined ||
            output.after !== undefined ||
            output.node !== null
          ) {
            return output;
          }

          const extraStyles = getExtraStyles(element);
          if (extraStyles) {
            const { forChild } = output;
            return {
              ...output,
              forChild: (child, parent) => {
                const textNode = forChild(child, parent);
                if ($isTextNode(textNode)) {
                  textNode.setStyle((textNode.getStyle() || "") + extraStyles);
                }
                return textNode;
              },
            };
          }

          return output;
        },
      };
    };
  }

  return importMap;
};

const editorConfig = {
  html: {
    export: exportMap,
    import: constructImportMap(),
  },
  namespace: "React.js Demo",
  nodes: [ParagraphNode, TextNode],
  onError: (error) => {
    throw error;
  },
  theme: ExampleTheme,
};

const EditorContentEtractor = () => {
  const [, setBlockData] = useAtom(blockDataAtom);
  const [selectedBlock] = useAtom(selectedBlockAtom);
  const [editor] = useLexicalComposerContext();

  // 자동 저장
  React.useEffect(() => {
    editor.update(() => {
      const parser = new DOMParser();
      const dom = parser.parseFromString(
        selectedBlock.block.content[0] ?? "<p></p>",
        "text/html"
      );

      const nodes = $generateNodesFromDOM(editor, dom);

      const root = $getRoot();
      root.clear();
      root.append(...nodes);
    });

    const unregister = editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        setBlockData((prevData) => {
          const newData = { ...prevData };

          const updateBlockByPath = (blocks, path) => {
            if (path.length === 1) {
              blocks[path[0]].content = [$generateHtmlFromNodes(editor, null)];
            } else {
              updateBlockByPath(blocks[path[0]].content, path.slice(1));
            }
          };

          updateBlockByPath(newData.content, selectedBlock.path);
          return newData;
        });
      });
    });
    return () => unregister();
  }, [editor]);

  return null;
};
export default function App() {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={
              <div className="editor-placeholder">{placeholder}</div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          {/* <TreeViewPlugin /> */}
        </div>
      </div>
      <EditorContentEtractor />
    </LexicalComposer>
  );
}
