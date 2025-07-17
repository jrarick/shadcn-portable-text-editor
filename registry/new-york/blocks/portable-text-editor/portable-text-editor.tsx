'use client'

import {
  defineSchema,
  EditorProvider,
  PortableTextEditable,
  useEditor,
  useEditorSelector,
} from '@portabletext/editor'
import * as selectors from '@portabletext/editor/selectors'
import type {
  PortableTextBlock,
  RenderDecoratorFunction,
  RenderStyleFunction,
} from '@portabletext/editor'
import { EventListenerPlugin } from '@portabletext/editor/plugins'
import {
  ComponentProps,
  ElementType,
  FC,
  MouseEventHandler,
  SVGProps,
  useState,
} from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/registry/new-york/ui/tooltip'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/registry/new-york/ui/select'
import { Button, buttonVariants } from '@/registry/new-york/ui/button'
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/registry/new-york/ui/popover'
import { Input } from '@/registry/new-york/ui/input'
import { VariantProps } from 'class-variance-authority'

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

const justificationSchema = defineSchema({
  decorators: [
    { name: 'left', label: 'Align Left', icon: AlignLeftIcon },
    { name: 'center', label: 'Align Center', icon: AlignCenterIcon },
    { name: 'right', label: 'Align Right', icon: AlignRightIcon },
    { name: 'justify', label: 'Justify', icon: AlignJustifyIcon },
  ],
})

const schemaDefinition = defineSchema({
  decorators: [
    { name: 'strong', label: 'Bold', icon: BoldIcon },
    { name: 'em', label: 'Italic', icon: ItalicIcon },
    { name: 'underline', label: 'Underline', icon: UnderlineIcon },
    { name: 'strikethrough', label: 'Strikethrough', icon: StrikethroughIcon },
    ...justificationSchema.decorators,
  ],
  styles: [
    { name: 'normal', label: 'Paragraph', icon: PilcrowIcon },
    { name: 'h1', label: 'Heading 1', icon: Heading1Icon },
    { name: 'h2', label: 'Heading 2', icon: Heading2Icon },
    { name: 'h3', label: 'Heading 3', icon: Heading3Icon },
    { name: 'h4', label: 'Heading 4', icon: Heading4Icon },
    { name: 'h5', label: 'Heading 5', icon: Heading5Icon },
    { name: 'h6', label: 'Heading 6', icon: Heading6Icon },
    { name: 'blockquote', label: 'Blockquote', icon: TextQuoteIcon },
  ],
  annotations: [{ name: 'link', label: 'Link', icon: Link2Icon }],
  lists: [
    { name: 'bullet', label: 'Bullet List', icon: ListIcon },
    { name: 'number', label: 'Numbered List', icon: ListOrderedIcon },
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

function Toolbar() {
  const editor = useEditor()

  const standardDecorators = schemaDefinition.decorators.filter(
    (decorator) =>
      !['left', 'center', 'right', 'justify'].includes(decorator.name)
  )
  const alignmentDecorators = schemaDefinition.decorators.filter((decorator) =>
    ['left', 'center', 'right', 'justify'].includes(decorator.name)
  )

  return (
    <TooltipProvider>
      <div className="border-b py-1.5 px-2 flex gap-1 bg-muted rounded-t-sm">
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
        <StyleDropdown />
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
      </div>
    </TooltipProvider>
  )
}

function ButtonGroup({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'flex flex-row rounded-md -space-x-px',
        '[&_button]:shadow-none shadow-xs',
        'isolate [&_button]:focus:z-10',
        '[&_button]:rounded-none [&_button]:first:rounded-l-md [&_button]:last:rounded-r-md',
        className
      )}
      {...props}
    />
  )
}

function PortableTextEditor() {
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
        <Toolbar />
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

const LinkButton = ({
  annotation,
}: {
  annotation: {
    name: string
    icon: ElementType | FC<SVGProps<SVGSVGElement>>
    label: string
  }
}) => {
  const editor = useEditor()
  const [inputValue, setInputValue] = useState('')

  return (
    <Popover key={annotation.name}>
      <PopoverTrigger asChild>
        <ToolbarButton
          key={annotation.name}
          definition={annotation}
          onClick={() => {
            editor.send({
              type: 'focus',
            })
          }}
        />
      </PopoverTrigger>
      <PopoverContent className="max-w-min">
        <p className="text-xs text-muted-foreground mb-2 font-semibold">
          Enter a URL
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault()

            editor.send({
              type: 'annotation.add',
              annotation: {
                name: annotation.name,
                value: {
                  href: inputValue,
                },
              },
            })

            editor.send({ type: 'focus' })
          }}
        >
          <Input
            className="w-40"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value)
            }}
          />
          <Button type="submit" className="mt-2 w-full" size="sm">
            Submit
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  )
}

const StyleDropdown = () => {
  const editor = useEditor()
  const activeStyle = useEditorSelector(editor, selectors.getActiveStyle)

  return (
    <Select
      onValueChange={(value) => {
        editor.send({
          type: 'style.toggle',
          style: value,
        })
        editor.send({ type: 'focus' })
      }}
      value={activeStyle}
    >
      <SelectTrigger size="xs" className="text-xs bg-background">
        <SelectValue placeholder="Select a style" />
      </SelectTrigger>
      <SelectContent>
        {schemaDefinition.styles.map((style) => {
          return (
            <SelectItem
              key={style.name}
              value={style.name}
              className="text-xs p-1"
            >
              <style.icon className="size-3.5" />
              <span>{style.label}</span>
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}

const ToolbarButton = ({
  definition,
  showTooltip = true,
  onClick,
  disabled,
  variant = 'outline',
  ref,
}: {
  definition: {
    name: string
    icon: ElementType | FC<SVGProps<SVGSVGElement>>
    label: string
  }
  showTooltip?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  variant?: VariantProps<typeof buttonVariants>['variant']
  ref?: React.Ref<HTMLButtonElement>
}) => {
  const { name, icon, label } = definition
  const Icon = icon
  const editor = useEditor()

  const activeDecorator = useEditorSelector(
    editor,
    selectors.isActiveDecorator(name)
  )
  const activeList = useEditorSelector(editor, selectors.isActiveListItem(name))
  const activeAnnotation = useEditorSelector(
    editor,
    selectors.isActiveAnnotation(name)
  )

  const active = activeDecorator || activeList || activeAnnotation

  if (showTooltip) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            value={name}
            variant={active ? 'default' : (variant ?? 'outline')}
            onClick={onClick}
            disabled={disabled}
            className="size-6"
            ref={ref}
          >
            <Icon className="size-3.5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    )
  }
  return (
    <Button
      value={name}
      variant={active ? 'default' : (variant ?? 'outline')}
      onClick={onClick}
      className="size-6"
      ref={ref}
    >
      <Icon />
    </Button>
  )
}

// const UndoButton = ({
//   showTooltip = true,
//   ...props
// }: {
//   showTooltip?: boolean
// } & ComponentProps<typeof Button>) => {
//   const editor = useEditor()

//   return (
//     <ToolbarButton
//       showTooltip={showTooltip}
//       definition={{
//         name: 'undo',
//         icon: UndoIcon,
//         label: 'Undo',
//       }}
//       onClick={() => {
//         editor.send({ type: 'history.undo' })
//         editor.send({ type: 'focus' })
//       }}
//       {...props}
//     />
//   )
// }

// const RedoButton = ({
//   showTooltip = true,
//   ...props
// }: {
//   showTooltip?: boolean
// } & ComponentProps<typeof Button>) => {
//   const editor = useEditor()

//   return (
//     <ToolbarButton
//       showTooltip={showTooltip}
//       definition={{
//         name: 'redo',
//         icon: RedoIcon,
//         label: 'Redo',
//       }}
//       onClick={() => {
//         editor.send({ type: 'history.redo' })
//         editor.send({ type: 'focus' })
//       }}
//       {...props}
//     />
//   )
// }

export default PortableTextEditor
