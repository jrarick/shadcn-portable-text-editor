"use client"

import {
  StyleDropdown,
  Toolbar,
  ToolbarButton,
} from "@/registry/new-york/ui/portable-text-editor"
import type {
  PortableTextBlock,
  RenderDecoratorFunction,
  RenderStyleFunction,
} from "@portabletext/editor"
import {
  defineSchema,
  EditorProvider,
  PortableTextEditable,
  useEditor,
} from "@portabletext/editor"
import { EventListenerPlugin } from "@portabletext/editor/plugins"
import {
  bold,
  h1,
  h2,
  italic,
  normal,
  underline,
} from "@portabletext/keyboard-shortcuts"
import {
  BoldIcon,
  Heading1Icon,
  Heading2Icon,
  ItalicIcon,
  PilcrowIcon,
  UnderlineIcon,
} from "lucide-react"
import { useState } from "react"
import "./editor.css"

const schemaDefinition = defineSchema({
  decorators: [
    { name: "strong", title: "Bold", icon: BoldIcon, shortcut: bold },
    { name: "em", title: "Italic", icon: ItalicIcon, shortcut: italic },
    {
      name: "underline",
      title: "Underline",
      icon: UnderlineIcon,
      shortcut: underline,
    },
  ],
  styles: [
    { name: "normal", title: "Paragraph", icon: PilcrowIcon, shortcut: normal },
    { name: "h1", title: "Heading 1", icon: Heading1Icon, shortcut: h1 },
    { name: "h2", title: "Heading 2", icon: Heading2Icon, shortcut: h2 },
  ],
  annotations: [],
  lists: [],
  inlineObjects: [],
  blockObjects: [],
})

const renderStyle: RenderStyleFunction = (props) => {
  if (props.schemaType.value === "h1") {
    return (
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {props.children}
      </h1>
    )
  }
  if (props.schemaType.value === "h2") {
    return (
      <h2 className="scroll-m-2 text-3xl font-semibold tracking-tight first:mt-0">
        {props.children}
      </h2>
    )
  }
  return <>{props.children}</>
}

const renderDecorator: RenderDecoratorFunction = (props) => {
  if (props.value === "strong") {
    return <strong>{props.children}</strong>
  }
  if (props.value === "em") {
    return <em>{props.children}</em>
  }
  if (props.value === "underline") {
    return <u>{props.children}</u>
  }
  return <>{props.children}</>
}

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
  const editor = useEditor()

  return (
    <Toolbar>
      {schemaDefinition.decorators.map((decorator) => (
        <ToolbarButton
          key={decorator.name}
          definition={decorator}
          showTooltip={false}
          showKeyboardShortcut={false}
          onClick={() => {
            editor.send({
              type: "decorator.toggle",
              decorator: decorator.name,
            })
            editor.send({ type: "focus" })
          }}
        />
      ))}
      <StyleDropdown
        styles={schemaDefinition.styles}
        showKeyboardShortcut={false}
      />
    </Toolbar>
  )
}

export default SimpleEditor
