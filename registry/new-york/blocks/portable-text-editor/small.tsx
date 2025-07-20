'use client'

import {
  defineSchema,
  EditorProvider,
  PortableTextEditable,
  useEditor,
} from '@portabletext/editor'
import type {
  PortableTextBlock,
  RenderDecoratorFunction,
  RenderStyleFunction,
} from '@portabletext/editor'
import { EventListenerPlugin } from '@portabletext/editor/plugins'
import { useState } from 'react'
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon,
  ItalicIcon,
  Link2Icon,
  ListIcon,
  ListOrderedIcon,
  PilcrowIcon,
  StrikethroughIcon,
  TextQuoteIcon,
  UnderlineIcon,
} from 'lucide-react'
import {
  ButtonGroup,
  LinkButton,
  RedoButton,
  StyleDropdown,
  Toolbar,
  ToolbarButton,
  UndoButton,
} from '@/registry/new-york/ui/portable-text-editor'
import './editor.css'
import {
  blockquote,
  bold,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  italic,
  link,
  normal,
  strikeThrough,
  underline,
} from '@portabletext/keyboard-shortcuts'

const schemaDefinition = defineSchema({
  decorators: [
    { name: 'strong', title: 'Bold', icon: BoldIcon, shortcut: bold },
    { name: 'em', title: 'Italic', icon: ItalicIcon, shortcut: italic },
    {
      name: 'underline',
      title: 'Underline',
      icon: UnderlineIcon,
      shortcut: underline,
    },
    {
      name: 'strikethrough',
      title: 'Strikethrough',
      icon: StrikethroughIcon,
      shortcut: strikeThrough,
    },
    { name: 'left', title: 'Align Left', icon: AlignLeftIcon },
    { name: 'center', title: 'Align Center', icon: AlignCenterIcon },
    { name: 'right', title: 'Align Right', icon: AlignRightIcon },
    { name: 'justify', title: 'Justify', icon: AlignJustifyIcon },
  ],
  styles: [
    { name: 'normal', title: 'Paragraph', icon: PilcrowIcon, shortcut: normal },
    { name: 'h1', title: 'Heading 1', icon: Heading1Icon, shortcut: h1 },
    { name: 'h2', title: 'Heading 2', icon: Heading2Icon, shortcut: h2 },
    { name: 'h3', title: 'Heading 3', icon: Heading3Icon, shortcut: h3 },
    { name: 'h4', title: 'Heading 4', icon: Heading4Icon, shortcut: h4 },
    { name: 'h5', title: 'Heading 5', icon: Heading5Icon, shortcut: h5 },
    { name: 'h6', title: 'Heading 6', icon: Heading6Icon, shortcut: h6 },
    {
      name: 'blockquote',
      title: 'Blockquote',
      icon: TextQuoteIcon,
      shortcut: blockquote,
    },
  ],
  annotations: [
    { name: 'link', title: 'Link', icon: Link2Icon, shortcut: link },
  ],
  lists: [
    { name: 'bullet', title: 'Bullet List', icon: ListIcon },
    { name: 'number', title: 'Numbered List', icon: ListOrderedIcon },
  ],
  inlineObjects: [],
  blockObjects: [],
})

const renderStyle: RenderStyleFunction = (props) => {
  if (props.schemaType.value === 'h1') {
    return (
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {props.children}
      </h1>
    )
  }
  if (props.schemaType.value === 'h2') {
    return (
      <h2 className="scroll-m-2 text-3xl font-semibold tracking-tight first:mt-0">
        {props.children}
      </h2>
    )
  }
  if (props.schemaType.value === 'h3') {
    return (
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        {props.children}
      </h3>
    )
  }
  if (props.schemaType.value === 'h4') {
    return (
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        {props.children}
      </h4>
    )
  }
  if (props.schemaType.value === 'h5') {
    return (
      <h5 className="scroll-m-20 text-lg font-semibold tracking-tight">
        {props.children}
      </h5>
    )
  }
  if (props.schemaType.value === 'h6') {
    return (
      <h6 className="scroll-m-20 text-base font-semibold tracking-tight">
        {props.children}
      </h6>
    )
  }
  if (props.schemaType.value === 'blockquote') {
    return (
      <blockquote className="mt-6 border-l-2 pl-6 italic">
        {props.children}
      </blockquote>
    )
  }
  return <>{props.children}</>
}

const renderDecorator: RenderDecoratorFunction = (props) => {
  if (props.value === 'strong') {
    return <strong>{props.children}</strong>
  }
  if (props.value === 'em') {
    return <em>{props.children}</em>
  }
  if (props.value === 'underline') {
    return <u>{props.children}</u>
  }
  if (props.value === 'strikethrough') {
    return <del className="line-through">{props.children}</del>
  }
  if (props.value === 'left') {
    return <div className="text-left">{props.children}</div>
  }
  if (props.value === 'center') {
    return <div className="text-center">{props.children}</div>
  }
  if (props.value === 'right') {
    return <div className="text-right">{props.children}</div>
  }
  if (props.value === 'justify') {
    return <div className="text-justify">{props.children}</div>
  }
  return <>{props.children}</>
}

const SmallEditor = () => {
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
          if (event.type === 'mutation') {
            setValue(event.value)
          }
        }}
      />
      <div className="flex flex-col border border-border rounded-md shadow">
        <PortableTextToolbar />
        <PortableTextEditable
          className="w-full h-96 focus-visible:outline-none p-2 text-sm"
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

  const standardDecorators = schemaDefinition.decorators.filter(
    (decorator) =>
      !['left', 'center', 'right', 'justify'].includes(decorator.name)
  )
  const alignmentDecorators = schemaDefinition.decorators.filter((decorator) =>
    ['left', 'center', 'right', 'justify'].includes(decorator.name)
  )

  return (
    <Toolbar>
      <ButtonGroup>
        <UndoButton className="size-6 [&_svg:not([class*='size-'])]:size-3.5" />
        <RedoButton className="size-6 [&_svg:not([class*='size-'])]:size-3.5" />
      </ButtonGroup>
      <ButtonGroup>
        {standardDecorators.map((decorator) => (
          <ToolbarButton
            key={decorator.name}
            definition={decorator}
            className="size-6 [&_svg:not([class*='size-'])]:size-3.5"
            onClick={() => {
              editor.send({
                type: 'decorator.toggle',
                decorator: decorator.name,
              })
              editor.send({ type: 'focus' })
            }}
          />
        ))}
      </ButtonGroup>
      <StyleDropdown styles={schemaDefinition.styles} size="xs" />
      <ButtonGroup>
        {alignmentDecorators.map((decorator) => (
          <ToolbarButton
            key={decorator.name}
            definition={decorator}
            className="size-6 [&_svg:not([class*='size-'])]:size-3.5"
            onClick={() => {
              alignmentDecorators
                .filter((d) => d.name !== decorator.name)
                .forEach((decorator) => {
                  editor.send({
                    type: 'decorator.remove',
                    decorator: decorator.name,
                  })
                })
              editor.send({
                type: 'decorator.toggle',
                decorator: decorator.name,
              })
              editor.send({ type: 'focus' })
            }}
          />
        ))}
      </ButtonGroup>
      <ButtonGroup>
        {schemaDefinition.lists.map((list) => (
          <ToolbarButton
            key={list.name}
            definition={list}
            className="size-6 [&_svg:not([class*='size-'])]:size-3.5"
            onClick={() => {
              editor.send({
                type: 'list item.toggle',
                listItem: list.name,
              })
              editor.send({ type: 'focus' })
            }}
          />
        ))}
      </ButtonGroup>
      {schemaDefinition.annotations
        .filter((annotation) => annotation.name === 'link')
        .map((annotation) => (
          <LinkButton
            key={annotation.name}
            annotation={annotation}
            className="size-6 [&_svg:not([class*='size-'])]:size-3.5"
          />
        ))}
    </Toolbar>
  )
}

export default SmallEditor
