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
import { cn } from '@/lib/utils'
import {
  ButtonGroup,
  LinkButton,
  StyleDropdown,
  Toolbar,
  ToolbarButton,
} from '@/registry/new-york/ui/portable-text-editor'

const editorClassNames = `
  [counter-reset:list-level-1_list-level-2_list-level-3_list-level-4_list-level-5_list-level-6_list-level-7_list-level-8_list-level-9_list-level-10]
  not-[&>.pt-list-item-number]:[counter-set:list-level-1_list-level-2_list-level-3_list-level-4_list-level-5_list-level-6_list-level-7_list-level-8_list-level-9_list-level-10]
  
  [&_.pt-list-item]:relative
  [&_.pt-list-item]:before:absolute
  [&_.pt-list-item-bullet]:before:content-['•']
  [&_.pt-list-item-nubmer]:before:content-[counter(list-level-1)_'.']

  [&_.pt-list-item-level-1]:pl-4
  [&_.pt-list-item-level-1]:[counter-increment:list-level-1]
  [&_.pt-list-item-level-1]:before:left-0

  [&_.pt-list-item-level-2]:pl-6
  [&_.pt-list-item-level-2]:[counter-increment:list-level-2]
  [&_.pt-list-item-level-2]:before:left-2
  [&_.pt-list-item-number.pt-list-item-level-2]:before:content-[counter(list-level-2)_'.']
  [&_.pt-list-item-bullet.pt-list-item-level-2]:before:content-['◦']

  [&_.pt-list-item-level-3]:pl-8
  [&_.pt-list-item-level-3]:[counter-increment:list-level-3]
  [&_.pt-list-item-level-3]:before:left-4
  [&_.pt-list-item-number.pt-list-item-level-3]:before:content-[counter(list-level-3)_'.']
  [&_.pt-list-item-bullet.pt-list-item-level-3]:before:content-['⬝']

  [&_.pt-list-item-level-4]:pl-10
  [&_.pt-list-item-level-4]:[counter-increment:list-level-4]
  [&_.pt-list-item-level-4]:before:left-6
  [&_.pt-list-item-number.pt-list-item-level-4]:before:content-[counter(list-level-4)_'.']

  [&_.pt-list-item-level-5]:pl-12
  [&_.pt-list-item-level-5]:[counter-increment:list-level-5]
  [&_.pt-list-item-level-5]:before:left-7.5
  [&_.pt-list-item-number.pt-list-item-level-5]:before:content-[counter(list-level-5)_'.']
  [&_.pt-list-item-bullet.pt-list-item-level-5]:before:content-['◦']

  [&_.pt-list-item-level-6]:pl-14
  [&_.pt-list-item-level-6]:[counter-increment:list-level-6]
  [&_.pt-list-item-level-6]:before:left-9
  [&_.pt-list-item-number.pt-list-item-level-6]:before:content-[counter(list-level-6)_'.']
  [&_.pt-list-item-bullet.pt-list-item-level-6]:before:content-['⬝']

  [&_.pt-list-item-level-7]:pl-16
  [&_.pt-list-item-level-7]:[counter-increment:list-level-7]
  [&_.pt-list-item-level-7]:before:left-11
  [&_.pt-list-item-number.pt-list-item-level-7]:before:content-[counter(list-level-7)_'.']

  [&_.pt-list-item-level-8]:pl-18
  [&_.pt-list-item-level-8]:[counter-increment:list-level-8]
  [&_.pt-list-item-level-8]:before:left-13
  [&_.pt-list-item-number.pt-list-item-level-8]:before:content-[counter(list-level-8)_'.']
  [&_.pt-list-item-bullet.pt-list-item-level-8]:before:content-['◦']

  [&_.pt-list-item-level-9]:pl-20
  [&_.pt-list-item-level-9]:[counter-increment:list-level-9]
  [&_.pt-list-item-level-9]:before:left-15
  [&_.pt-list-item-number.pt-list-item-level-9]:before:content-[counter(list-level-9)_'.']
  [&_.pt-list-item-bullet.pt-list-item-level-9]:before:content-['⬝']

  [&_.pt-list-item-level-10]:pl-22
  [&_.pt-list-item-level-10]:[counter-increment:list-level-10]
  [&_.pt-list-item-level-10]:before:left-17
  [&_.pt-list-item-number.pt-list-item-level-10]:before:content-[counter(list-level-10)_'.']
`

const schemaDefinition = defineSchema({
  decorators: [
    { name: 'strong', title: 'Bold', icon: BoldIcon },
    { name: 'em', title: 'Italic', icon: ItalicIcon },
    { name: 'underline', title: 'Underline', icon: UnderlineIcon },
    { name: 'strikethrough', title: 'Strikethrough', icon: StrikethroughIcon },
    { name: 'left', title: 'Align Left', icon: AlignLeftIcon },
    { name: 'center', title: 'Align Center', icon: AlignCenterIcon },
    { name: 'right', title: 'Align Right', icon: AlignRightIcon },
    { name: 'justify', title: 'Justify', icon: AlignJustifyIcon },
  ],
  styles: [
    { name: 'normal', title: 'Paragraph', icon: PilcrowIcon },
    { name: 'h1', title: 'Heading 1', icon: Heading1Icon },
    { name: 'h2', title: 'Heading 2', icon: Heading2Icon },
    { name: 'h3', title: 'Heading 3', icon: Heading3Icon },
    { name: 'h4', title: 'Heading 4', icon: Heading4Icon },
    { name: 'h5', title: 'Heading 5', icon: Heading5Icon },
    { name: 'h6', title: 'Heading 6', icon: Heading6Icon },
    { name: 'blockquote', title: 'Blockquote', icon: TextQuoteIcon },
  ],
  annotations: [{ name: 'link', title: 'Link', icon: Link2Icon }],
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

const PortableTextEditor = () => {
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
          className={cn(
            'w-full h-[350px] focus-visible:outline-none p-2 text-sm',
            editorClassNames
          )}
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
        {standardDecorators.map((decorator) => (
          <ToolbarButton
            key={decorator.name}
            definition={decorator}
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
      <StyleDropdown styles={schemaDefinition.styles} />
      <ButtonGroup>
        {alignmentDecorators.map((decorator) => (
          <ToolbarButton
            key={decorator.name}
            definition={decorator}
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
          <LinkButton key={annotation.name} annotation={annotation} />
        ))}
    </Toolbar>
  )
}

export default PortableTextEditor
