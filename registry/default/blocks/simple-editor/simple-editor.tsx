"use client"

import {
  DecoratorButton,
  EditorContainer,
  extendDecorator,
  extendStyle,
  renderDecorator,
  renderStyle,
  StyleDropdown,
  TextEditable,
  Toolbar,
} from "@/registry/default/components/ui/portable-text-editor"
import type { PortableTextBlock } from "@portabletext/editor"
import { defineSchema, EditorProvider } from "@portabletext/editor"
import { EventListenerPlugin } from "@portabletext/editor/plugins"
import { useToolbarSchema } from "@portabletext/toolbar"
import { useState } from "react"

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
      <EditorContainer>
        <EditorToolbar />
        <TextEditable
          renderStyle={renderStyle}
          renderDecorator={renderDecorator}
          renderBlock={(props) => <div>{props.children}</div>}
          renderListItem={(props) => <>{props.children}</>}
        />
      </EditorContainer>
    </EditorProvider>
  )
}

const EditorToolbar = () => {
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
          triggerProps={{
            className: "w-56",
          }}
        />
      )}
    </Toolbar>
  )
}

export default SimpleEditor
