"use client"

import {
  DecoratorButton,
  extendDecorator,
  extendStyle,
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
  ],
  styles: [
    { name: "normal", title: "Paragraph" },
    { name: "h1", title: "Heading 1" },
    { name: "h2", title: "Heading 2" },
  ],
  annotations: [],
  lists: [],
  inlineObjects: [],
  blockObjects: [],
})

const SimpleEditor = () => {
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
          className="h-96 w-full p-2 focus-visible:outline-none"
          renderStyle={renderStyle}
          renderDecorator={renderDecorator}
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
  })

  return (
    <Toolbar>
      {toolbarSchema.decorators?.map((decorator) => (
        <DecoratorButton
          key={decorator.name}
          schemaType={decorator}
          showKeyboardShortcut={false}
        />
      ))}
      {toolbarSchema.styles && (
        <StyleDropdown
          schemaTypes={toolbarSchema.styles}
          showKeyboardShortcut={false}
          width="14rem"
        />
      )}
    </Toolbar>
  )
}

export default SimpleEditor
