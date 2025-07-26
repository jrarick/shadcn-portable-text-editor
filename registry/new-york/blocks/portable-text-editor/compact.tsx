"use client"

import {
  AnnotationButton,
  ButtonGroup,
  DecoratorButton,
  extendAnnotation,
  extendDecorator,
  extendList,
  extendStyle,
  HistoryButton,
  ListButton,
  renderAnnotation,
  renderDecorator,
  renderStyle,
  StyleDropdown,
  Toolbar,
} from "@/registry/new-york/ui/portable-text-editor"
import type { PortableTextBlock } from "@portabletext/editor"
import {
  defineSchema,
  EditorProvider,
  PortableTextEditable,
} from "@portabletext/editor"
import { EventListenerPlugin } from "@portabletext/editor/plugins"
import { useToolbarSchema } from "@portabletext/toolbar"
import { useState } from "react"
import "./editor.css"

const schemaDefinition = defineSchema({
  decorators: [
    { name: "strong", title: "Bold" },
    { name: "em", title: "Italic" },
    {
      name: "underline",
      title: "Underline",
    },
    {
      name: "strikethrough",
      title: "Strikethrough",
    },
    { name: "subscript", title: "Subscript" },
    { name: "superscript", title: "Superscript" },
    { name: "left", title: "Align Left" },
    { name: "center", title: "Align Center" },
    { name: "right", title: "Align Right" },
    { name: "justify", title: "Justify" },
  ],
  styles: [
    { name: "normal", title: "Paragraph" },
    { name: "h1", title: "Heading 1" },
    { name: "h2", title: "Heading 2" },
    { name: "h3", title: "Heading 3" },
    { name: "h4", title: "Heading 4" },
    { name: "h5", title: "Heading 5" },
    { name: "h6", title: "Heading 6" },
    {
      name: "blockquote",
      title: "Blockquote",
    },
  ],
  annotations: [
    {
      name: "link",
      title: "Link",
      fields: [{ name: "href", title: "URL", type: "string" }],
    },
  ],
  lists: [
    { name: "bullet", title: "Bullet List" },
    { name: "number", title: "Numbered List" },
  ],
  inlineObjects: [],
  blockObjects: [],
})

const CompactEditor = () => {
  const [value, setValue] = useState<Array<PortableTextBlock> | undefined>(
    undefined
  )

  return (
    <EditorProvider
      initialConfig={{
        schemaDefinition,
        initialValue: value,
      }}
    >
      <EventListenerPlugin
        on={(event) => {
          if (event.type === "mutation") {
            setValue(event.value)
          }
        }}
      />
      <div className="flex flex-col rounded-md border border-border shadow">
        <PortableTextToolbar />
        <PortableTextEditable
          className="h-96 w-full p-2 text-sm focus-visible:outline-none"
          renderStyle={renderStyle}
          renderDecorator={renderDecorator}
          renderAnnotation={renderAnnotation}
          renderBlock={(props) => <div>{props.children}</div>}
          renderListItem={(props) => <>{props.children}</>}
        />
      </div>
    </EditorProvider>
  )
}

const PortableTextToolbar = () => {
  const toolbarSchema = useToolbarSchema({
    extendDecorator,
    extendStyle,
    extendAnnotation,
    extendList,
  })

  const standardDecorators =
    toolbarSchema.decorators?.filter((decorator) =>
      ["strong", "em", "underline", "strikethrough"].includes(decorator.name)
    ) ?? []
  const scriptDecorators =
    toolbarSchema.decorators?.filter((decorator) =>
      ["subscript", "superscript"].includes(decorator.name)
    ) ?? []
  const alignmentDecorators =
    toolbarSchema.decorators?.filter((decorator) =>
      ["left", "center", "right", "justify"].includes(decorator.name)
    ) ?? []

  const smallButtonClassName = "size-7 [&_svg:not([class*='size-'])]:size-3.5"

  return (
    <Toolbar>
      <ButtonGroup>
        <HistoryButton
          direction="undo"
          showKeyboardShortcut={true}
          className={smallButtonClassName}
        />
        <HistoryButton
          direction="redo"
          showKeyboardShortcut={true}
          className={smallButtonClassName}
        />
      </ButtonGroup>
      <ButtonGroup>
        {standardDecorators.map((decorator) => (
          <DecoratorButton
            key={decorator.name}
            schemaType={decorator}
            showKeyboardShortcut={true}
            className={smallButtonClassName}
          />
        ))}
      </ButtonGroup>
      {toolbarSchema.styles && (
        <StyleDropdown
          schemaTypes={toolbarSchema.styles}
          showKeyboardShortcut={true}
          width="13rem"
          size="xs"
        />
      )}
      <ButtonGroup>
        {scriptDecorators.map((decorator) => (
          <DecoratorButton
            key={decorator.name}
            schemaType={decorator}
            className={smallButtonClassName}
          />
        ))}
      </ButtonGroup>
      <ButtonGroup>
        {alignmentDecorators.map((decorator) => (
          <DecoratorButton
            key={decorator.name}
            schemaType={decorator}
            showKeyboardShortcut={true}
            className={smallButtonClassName}
          />
        ))}
      </ButtonGroup>
      <ButtonGroup>
        {toolbarSchema.lists?.map((list) => (
          <ListButton
            key={list.name}
            schemaType={list}
            className={smallButtonClassName}
          />
        ))}
      </ButtonGroup>
      {toolbarSchema.annotations?.map((annotation) => (
        <AnnotationButton
          key={annotation.name}
          schemaType={annotation}
          className={smallButtonClassName}
        />
      ))}
    </Toolbar>
  )
}

export default CompactEditor
