import {
  BaseDefinition,
  useEditor,
  useEditorSelector,
} from '@portabletext/editor'
import * as selectors from '@portabletext/editor/selectors'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/registry/new-york/ui/select'
import { cn } from '@/lib/utils'
import { VariantProps } from 'class-variance-authority'
import { Button, buttonVariants } from './button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/registry/new-york/ui/tooltip'
import { useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/registry/new-york/ui/popover'
import { Input } from '@/registry/new-york/ui/input'
import { RedoIcon, UndoIcon } from 'lucide-react'

export interface ExtendedBaseDefinition extends BaseDefinition {
  icon?: React.ElementType
}

export type ExtendedEditorSchema = {
  annotations: ReadonlyArray<
    ExtendedBaseDefinition & {
      fields: ReadonlyArray<{
        name: string
        type: string
      }>
    }
  >
  block: {
    name: string
  }
  blockObjects: ReadonlyArray<
    ExtendedBaseDefinition & {
      fields: ReadonlyArray<{
        name: string
        type: string
      }>
    }
  >
  decorators: ReadonlyArray<
    ExtendedBaseDefinition & {
      value: string
    }
  >
  inlineObjects: ReadonlyArray<
    ExtendedBaseDefinition & {
      fields: ReadonlyArray<{
        name: string
        type: string
      }>
    }
  >
  span: {
    name: string
  }
  styles: ReadonlyArray<
    ExtendedBaseDefinition & {
      value: string
    }
  >
  lists: ReadonlyArray<
    ExtendedBaseDefinition & {
      value: string
    }
  >
}

export const StyleDropdown = ({
  styles,
}: {
  styles: ReadonlyArray<ExtendedBaseDefinition>
}) => {
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
      <SelectTrigger className="bg-background">
        <SelectValue placeholder="Select a style" />
      </SelectTrigger>
      <SelectContent>
        {styles.map((style) => {
          const Icon = style.icon
          return (
            <SelectItem key={style.name} value={style.name}>
              {Icon && <Icon />}
              <span>{style.title}</span>
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}

export const ButtonGroup = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  return (
    <div
      className={cn(
        'flex flex-row rounded-md -space-x-px',
        '[&_button]:shadow-none shadow-xs',
        'isolate [&_button]:focus:z-10',
        '[&_button]:rounded-none [&_button]:first:rounded-l-md [&_button]:last:rounded-r-md',
        '[&_button]:border',
        className
      )}
      {...props}
    />
  )
}

export const ToolbarButton = ({
  definition,
  showTooltip = true,
  onClick,
  disabled,
  variant = 'outline',
  size = 'icon',
  ref,
}: {
  definition: ExtendedBaseDefinition
  showTooltip?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  variant?: VariantProps<typeof buttonVariants>['variant']
  size?: VariantProps<typeof buttonVariants>['size']
  ref?: React.Ref<HTMLButtonElement>
}) => {
  const { name, icon, title } = definition
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

  const button = (
    <Button
      value={name}
      variant={active ? 'default' : (variant ?? 'outline')}
      size={size}
      onClick={onClick}
      disabled={disabled}
      aria-label={showTooltip ? title : undefined}
      ref={ref}
    >
      {Icon && <Icon />}
    </Button>
  )

  if (showTooltip) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent>{title}</TooltipContent>
      </Tooltip>
    )
  }

  return button
}

export const LinkButton = ({
  annotation,
}: {
  annotation: ExtendedBaseDefinition
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

export const UndoButton = ({
  showTooltip = true,
  ...props
}: {
  showTooltip?: boolean
} & React.ComponentProps<typeof Button>) => {
  const editor = useEditor()

  return (
    <ToolbarButton
      showTooltip={showTooltip}
      definition={{
        name: 'undo',
        icon: UndoIcon,
        title: 'Undo',
      }}
      onClick={() => {
        editor.send({ type: 'history.undo' })
        editor.send({ type: 'focus' })
      }}
      {...props}
    />
  )
}

export const RedoButton = ({
  showTooltip = true,
  ...props
}: {
  showTooltip?: boolean
} & React.ComponentProps<typeof Button>) => {
  const editor = useEditor()

  return (
    <ToolbarButton
      showTooltip={showTooltip}
      definition={{
        name: 'redo',
        icon: RedoIcon,
        title: 'Redo',
      }}
      onClick={() => {
        editor.send({ type: 'history.redo' })
        editor.send({ type: 'focus' })
      }}
      {...props}
    />
  )
}

export const Toolbar = ({ children }: { children?: React.ReactNode }) => {
  return (
    <TooltipProvider>
      <div className="border-b py-1.5 px-2 flex gap-1 bg-muted rounded-t-sm">
        {children}
      </div>
    </TooltipProvider>
  )
}
