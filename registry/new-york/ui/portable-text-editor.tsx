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
import { Button } from './button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/registry/new-york/ui/tooltip'
import { CSSProperties, useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/registry/new-york/ui/popover'
import { Input } from '@/registry/new-york/ui/input'
import {
  ArrowBigUpIcon,
  ChevronUpIcon,
  OptionIcon,
  RedoIcon,
  UndoIcon,
} from 'lucide-react'
import { KeyboardShortcut, undo, redo } from '@portabletext/keyboard-shortcuts'

export interface ExtendedBaseDefinition extends BaseDefinition {
  icon?: React.ElementType
  shortcut?: KeyboardShortcut<
    Pick<
      KeyboardEvent,
      'code' | 'key' | 'altKey' | 'ctrlKey' | 'metaKey' | 'shiftKey'
    >
  >
}

export const StyleDropdown = ({
  styles,
  showKeyboardShortcut = true,
  width = 'auto',
  size = 'default',
}: {
  styles: ReadonlyArray<ExtendedBaseDefinition>
  showKeyboardShortcut?: boolean
  width?: CSSProperties['width']
  size?: 'xs' | 'sm' | 'default'
}) => {
  const editor = useEditor()
  const activeStyle =
    useEditorSelector(editor, selectors.getActiveStyle) ?? styles[0].name

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
      <SelectTrigger
        className={cn('bg-background', {
          'data-[size=default]:h-6 data-[size=sm]:h-6 text-xs': size === 'xs',
        })}
        style={{ width }}
      >
        <SelectValue placeholder="Select a style" />
      </SelectTrigger>
      <SelectContent>
        {styles.map((style) => {
          return (
            <SelectItem
              key={style.name}
              value={style.name}
              className={cn(size === 'xs' && 'py-1')}
            >
              <div className="flex flex-row items-center gap-4">
                <div className="flex items-center gap-2">
                  {style.icon && (
                    <style.icon className={cn(size === 'xs' && 'size-3.5')} />
                  )}
                  <span className={cn(size === 'xs' && 'text-xs')}>
                    {style.title}
                  </span>
                </div>
                {showKeyboardShortcut && style.shortcut && (
                  <KeyboardShortcutPreview shortcut={style.shortcut} />
                )}
              </div>
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
  showKeyboardShortcut = true,
  ref,
  ...props
}: {
  definition: ExtendedBaseDefinition
  showTooltip?: boolean
  showKeyboardShortcut?: boolean
  ref?: React.Ref<HTMLButtonElement>
} & React.ComponentPropsWithoutRef<typeof Button>) => {
  const { name, icon, title, shortcut } = definition
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
      variant={active ? 'default' : (props.variant ?? 'outline')}
      size={props.size ?? 'icon'}
      aria-label={showTooltip ? title : undefined}
      ref={ref}
      {...props}
    >
      {Icon && <Icon />}
    </Button>
  )

  if (showTooltip) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent>
          <div className="flex space-x-2">
            <span>{title}</span>
            {showKeyboardShortcut && !!shortcut && (
              <KeyboardShortcutPreview shortcut={shortcut} />
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    )
  }

  return button
}

export const KeyboardShortcutPreview = ({
  shortcut,
}: {
  shortcut: KeyboardShortcut
}) => {
  const keyToIcon = {
    shift: ArrowBigUpIcon,
    ctrl: ChevronUpIcon,
    option: OptionIcon,
  }

  const KeyboardKey = ({ keyboardKey }: { keyboardKey: string }) => {
    const Icon = keyToIcon[keyboardKey.toLowerCase() as keyof typeof keyToIcon]

    return (
      <kbd className="rounded-xs bg-muted text-muted-foreground h-4 min-w-4 flex items-center justify-center text-xs">
        {Icon ? <Icon className="size-3" /> : keyboardKey}
      </kbd>
    )
  }

  return (
    <div className="space-x-1 flex items-center z-10">
      {shortcut.keys.map((keyboardKey) => (
        <kbd
          key={keyboardKey}
          className="rounded-xs bg-muted text-muted-foreground h-4 min-w-4 flex items-center justify-center text-xs"
        >
          {keyboardKey.toLowerCase() in keyToIcon ? (
            <KeyboardKey keyboardKey={keyboardKey} />
          ) : (
            keyboardKey
          )}
        </kbd>
      ))}
    </div>
  )
}

export const LinkButton = ({
  annotation,
  ref,
  ...props
}: {
  annotation: ExtendedBaseDefinition
  ref?: React.Ref<HTMLButtonElement>
} & React.ComponentPropsWithoutRef<typeof Button>) => {
  const editor = useEditor()
  const [inputValue, setInputValue] = useState('')

  return (
    <Popover key={annotation.name}>
      <PopoverTrigger asChild>
        <ToolbarButton
          key={annotation.name}
          definition={annotation}
          ref={ref}
          onClick={() => {
            editor.send({
              type: 'focus',
            })
          }}
          {...props}
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

export const UndoButton = (props: React.ComponentProps<typeof Button>) => {
  const editor = useEditor()

  return (
    <ToolbarButton
      definition={{
        name: 'undo',
        icon: UndoIcon,
        title: 'Undo',
        shortcut: undo,
      }}
      onClick={() => {
        editor.send({ type: 'history.undo' })
        editor.send({ type: 'focus' })
      }}
      {...props}
    />
  )
}

export const RedoButton = (props: React.ComponentProps<typeof Button>) => {
  const editor = useEditor()

  return (
    <ToolbarButton
      definition={{
        name: 'redo',
        icon: RedoIcon,
        title: 'Redo',
        shortcut: redo,
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
      <div className="border-b py-1.5 px-2.5 flex gap-1.5 bg-muted rounded-t-sm flex-wrap">
        {children}
      </div>
    </TooltipProvider>
  )
}
