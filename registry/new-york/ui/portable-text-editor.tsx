import { cn } from "@/lib/utils"
import { Button } from "@/registry/new-york/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/new-york/ui/dialog"
import { Input } from "@/registry/new-york/ui/input"
import { Label } from "@/registry/new-york/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/new-york/ui/tooltip"
import {
  RenderAnnotationFunction,
  RenderDecoratorFunction,
  RenderStyleFunction,
} from "@portabletext/editor"
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
  KeyboardShortcut,
  link,
  normal,
  redo,
  strikeThrough,
  underline,
  undo,
} from "@portabletext/keyboard-shortcuts"
import {
  ExtendAnnotationSchemaType,
  ExtendDecoratorSchemaType,
  ExtendListSchemaType,
  ExtendStyleSchemaType,
  ToolbarAnnotationSchemaType,
  ToolbarBlockObjectSchemaType,
  ToolbarDecoratorSchemaType,
  ToolbarListSchemaType,
  ToolbarStyleSchemaType,
  useAnnotationButton,
  useDecoratorButton,
  useHistoryButtons,
  useListButton,
  useStyleSelector,
} from "@portabletext/toolbar"
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  ArrowBigUpIcon,
  BoldIcon,
  ChevronUpIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  OptionIcon,
  PilcrowIcon,
  RedoIcon,
  StrikethroughIcon,
  SubscriptIcon,
  SuperscriptIcon,
  TextQuoteIcon,
  UnderlineIcon,
  UndoIcon,
} from "lucide-react"
import { isValidElement } from "react"
import { isValidElementType } from "react-is"
import { z } from "zod"

export const LinkAnnotationSchema = z.object({
  schemaType: z.object({
    name: z.literal("link"),
  }),
  value: z.object({
    href: z.string(),
  }),
})

export const renderStyle: RenderStyleFunction = (props) => {
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
  if (props.schemaType.value === "h3") {
    return (
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        {props.children}
      </h3>
    )
  }
  if (props.schemaType.value === "h4") {
    return (
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        {props.children}
      </h4>
    )
  }
  if (props.schemaType.value === "h5") {
    return (
      <h5 className="scroll-m-20 text-lg font-semibold tracking-tight">
        {props.children}
      </h5>
    )
  }
  if (props.schemaType.value === "h6") {
    return (
      <h6 className="scroll-m-20 text-base font-semibold tracking-tight">
        {props.children}
      </h6>
    )
  }
  if (props.schemaType.value === "blockquote") {
    return (
      <blockquote className="mt-6 border-l-2 pl-6 italic">
        {props.children}
      </blockquote>
    )
  }
  return <>{props.children}</>
}

export const renderDecorator: RenderDecoratorFunction = (props) => {
  if (props.value === "strong") {
    return <strong>{props.children}</strong>
  }
  if (props.value === "em") {
    return <em>{props.children}</em>
  }
  if (props.value === "underline") {
    return <u>{props.children}</u>
  }
  if (props.value === "strikethrough") {
    return <del className="line-through">{props.children}</del>
  }
  if (props.value === "left") {
    return <div className="text-left">{props.children}</div>
  }
  if (props.value === "center") {
    return <div className="text-center">{props.children}</div>
  }
  if (props.value === "right") {
    return <div className="text-right">{props.children}</div>
  }
  if (props.value === "justify") {
    return <div className="text-justify">{props.children}</div>
  }
  return <>{props.children}</>
}

export const renderAnnotation: RenderAnnotationFunction = (props) => {
  console.log("renderAnnotation", props)

  if (LinkAnnotationSchema.safeParse(props).success) {
    return <span className="text-blue-800 underline">{props.children}</span>
  }

  return props.children
}

export const extendDecorator: ExtendDecoratorSchemaType = (decorator) => {
  if (decorator.name === "strong") {
    return {
      ...decorator,
      icon: BoldIcon,
      shortcut: bold,
    }
  }

  if (decorator.name === "em") {
    return {
      ...decorator,
      icon: ItalicIcon,
      shortcut: italic,
    }
  }

  if (decorator.name === "underline") {
    return {
      ...decorator,
      icon: UnderlineIcon,
      shortcut: underline,
    }
  }

  if (decorator.name === "strikethrough") {
    return {
      ...decorator,
      icon: StrikethroughIcon,
      shortcut: strikeThrough,
    }
  }

  if (decorator.name === "subscript") {
    return {
      ...decorator,
      icon: SubscriptIcon,
      mutuallyExclusive: ["superscript"],
    }
  }

  if (decorator.name === "superscript") {
    return {
      ...decorator,
      icon: SuperscriptIcon,
      mutuallyExclusive: ["subscript"],
    }
  }

  if (decorator.name === "left") {
    return {
      ...decorator,
      icon: AlignLeftIcon,
      mutuallyExclusive: ["center", "right", "justify"],
    }
  }

  if (decorator.name === "center") {
    return {
      ...decorator,
      icon: AlignCenterIcon,
      mutuallyExclusive: ["left", "right", "justify"],
    }
  }

  if (decorator.name === "right") {
    return {
      ...decorator,
      icon: AlignRightIcon,
      mutuallyExclusive: ["left", "center", "justify"],
    }
  }

  if (decorator.name === "justify") {
    return {
      ...decorator,
      icon: AlignJustifyIcon,
      mutuallyExclusive: ["left", "center", "right"],
    }
  }

  return decorator
}

export const extendAnnotation: ExtendAnnotationSchemaType = (annotation) => {
  if (annotation.name === "link") {
    return {
      ...annotation,
      icon: LinkIcon,
      defaultValues: {
        href: "https://example.com",
      },
      shortcut: link,
    }
  }

  return annotation
}

export const extendStyle: ExtendStyleSchemaType = (style) => {
  if (style.name === "normal") {
    return {
      ...style,
      icon: PilcrowIcon,
      shortcut: normal,
    }
  }
  if (style.name === "h1") {
    return {
      ...style,
      icon: Heading1Icon,
      shortcut: h1,
    }
  }

  if (style.name === "h2") {
    return {
      ...style,
      icon: Heading2Icon,
      shortcut: h2,
    }
  }

  if (style.name === "h3") {
    return {
      ...style,
      icon: Heading3Icon,
      shortcut: h3,
    }
  }

  if (style.name === "h4") {
    return {
      ...style,
      icon: Heading4Icon,
      shortcut: h4,
    }
  }

  if (style.name === "h5") {
    return {
      ...style,
      icon: Heading5Icon,
      shortcut: h5,
    }
  }

  if (style.name === "h6") {
    return {
      ...style,
      icon: Heading6Icon,
      shortcut: h6,
    }
  }

  if (style.name === "blockquote") {
    return {
      ...style,
      icon: TextQuoteIcon,
      shortcut: blockquote,
    }
  }

  return style
}

export const extendList: ExtendListSchemaType = (list) => {
  if (list.name === "bullet") {
    return {
      ...list,
      icon: ListIcon,
    }
  }

  if (list.name === "number") {
    return {
      ...list,
      icon: ListOrderedIcon,
    }
  }

  return list
}

export const ButtonGroup = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "flex flex-row -space-x-px rounded-md",
        "shadow-xs [&_button]:shadow-none",
        "isolate [&_button]:focus:z-10",
        "[&_button]:rounded-none [&_button]:first:rounded-l-md [&_button]:last:rounded-r-md",
        "[&_button]:border",
        className
      )}
      {...props}
    />
  )
}

export const StyleDropdown = ({
  schemaTypes,
  showKeyboardShortcut = false,
  width = "auto",
  size = "default",
}: {
  schemaTypes: ReadonlyArray<ToolbarStyleSchemaType>
  showKeyboardShortcut?: boolean
  width?: React.CSSProperties["width"]
  size?: "xs" | "sm" | "default"
}) => {
  const styleSelector = useStyleSelector({ schemaTypes })

  return (
    <Select
      onValueChange={(style) => {
        if (typeof style === "string") {
          styleSelector.send({ type: "toggle", style })
        }
      }}
      value={styleSelector.snapshot.context.activeStyle ?? undefined}
    >
      <SelectTrigger
        className={cn("bg-background", {
          "text-xs data-[size=default]:h-6 data-[size=sm]:h-6": size === "xs",
        })}
        style={{ width }}
        size={size !== "xs" ? size : "default"}
      >
        <SelectValue placeholder="Select a style" />
      </SelectTrigger>
      <SelectContent>
        {schemaTypes.map((style) => {
          return (
            <SelectItem
              key={style.name}
              value={style.name}
              className={cn(size === "xs" && "py-1")}
            >
              <div className="flex flex-row items-center gap-4">
                <div className="flex items-center gap-2">
                  <ToolbarIcon
                    icon={style.icon}
                    fallback={style.title ?? style.name}
                  />
                  <span className={cn(size === "xs" && "text-xs")}>
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

export const ToolbarButton = ({
  schemaType,
  active,
  showTooltip = true,
  showKeyboardShortcut = false,
  ...props
}: {
  schemaType:
    | ToolbarDecoratorSchemaType
    | ToolbarListSchemaType
    | ToolbarAnnotationSchemaType
  active: boolean
  showTooltip?: boolean
  showKeyboardShortcut?: boolean
} & React.ComponentProps<typeof Button>) => {
  const hasShortcut = "shortcut" in schemaType

  const button = (
    <Button
      variant={active ? "default" : (props.variant ?? "outline")}
      size={props.size ?? "icon"}
      aria-label={!showTooltip ? schemaType.title : undefined}
      {...props}
    >
      <ToolbarIcon
        icon={schemaType.icon}
        fallback={schemaType.title ?? schemaType.name}
      />
    </Button>
  )

  if (showTooltip) {
    return (
      <ToolbarButtonTooltip
        tooltipContent={
          <div className="flex space-x-2">
            <span>{schemaType.title}</span>
            {showKeyboardShortcut && hasShortcut && schemaType.shortcut && (
              <KeyboardShortcutPreview shortcut={schemaType.shortcut} />
            )}
          </div>
        }
      >
        {button}
      </ToolbarButtonTooltip>
    )
  }

  return button
}

export const DecoratorButton = ({
  schemaType,
  showTooltip,
  showKeyboardShortcut,
  ...props
}: {
  schemaType: ToolbarDecoratorSchemaType
  showTooltip?: boolean
  showKeyboardShortcut?: boolean
} & React.ComponentProps<typeof Button>) => {
  const decoratorButton = useDecoratorButton({ schemaType })
  const active =
    decoratorButton.snapshot.matches({ disabled: "active" }) ||
    decoratorButton.snapshot.matches({ enabled: "active" })
  const disabled = decoratorButton.snapshot.matches("disabled")

  return (
    <ToolbarButton
      schemaType={schemaType}
      showTooltip={showTooltip}
      showKeyboardShortcut={showKeyboardShortcut}
      active={active}
      disabled={disabled}
      onClick={() => decoratorButton.send({ type: "toggle" })}
      {...props}
    >
      <ToolbarIcon
        icon={schemaType.icon}
        fallback={schemaType.title ?? schemaType.name}
      />
    </ToolbarButton>
  )
}

export const ListButton = ({
  schemaType,
  showTooltip = true,
  ...props
}: {
  schemaType: ToolbarListSchemaType
  showTooltip?: boolean
} & React.ComponentProps<typeof Button>) => {
  const listButton = useListButton({ schemaType })
  const active = listButton.snapshot.matches({ enabled: "active" })
  const disabled = listButton.snapshot.matches("disabled")

  return (
    <ToolbarButton
      schemaType={schemaType}
      showTooltip={showTooltip}
      active={active}
      disabled={disabled}
      onClick={() => {
        listButton.send({ type: "toggle" })
      }}
      {...props}
    >
      <ToolbarIcon
        icon={schemaType.icon}
        fallback={schemaType.title ?? schemaType.name}
      />
    </ToolbarButton>
  )
}

export const AnnotationButton = ({
  schemaType,
  ...props
}: {
  schemaType: ToolbarAnnotationSchemaType
} & React.ComponentProps<typeof Button>) => {
  const annotationButton = useAnnotationButton({ schemaType })
  const disabled = annotationButton.snapshot.matches("disabled")

  if (
    annotationButton.snapshot.matches({ disabled: "active" }) ||
    annotationButton.snapshot.matches({ enabled: "active" })
  ) {
    return (
      <ToolbarButton
        schemaType={schemaType}
        active={true}
        disabled={disabled}
        showKeyboardShortcut={true}
        onClick={() => annotationButton.send({ type: "remove" })}
        {...props}
      >
        <ToolbarIcon
          icon={schemaType.icon}
          fallback={schemaType.title ?? schemaType.name}
        />
      </ToolbarButton>
    )
  }

  return (
    <Dialog
      open={annotationButton.snapshot.matches({
        enabled: { inactive: "showing dialog" },
      })}
      onOpenChange={(open) => {
        if (!open) {
          annotationButton.send({ type: "close dialog" })
        }
      }}
    >
      <DialogTrigger asChild>
        <ToolbarButton
          schemaType={schemaType}
          active={false}
          disabled={disabled}
          showKeyboardShortcut={true}
          onClick={() => annotationButton.send({ type: "open dialog" })}
          {...props}
        >
          <ToolbarIcon
            icon={schemaType.icon}
            fallback={schemaType.title ?? schemaType.name}
          />
        </ToolbarButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="pb-4">
          <DialogTitle>Create a Link</DialogTitle>
        </DialogHeader>
        <AnnotationForm
          submitLabel="Add"
          fields={schemaType.fields}
          defaultValues={schemaType.defaultValues}
          onSubmit={({ value }) => {
            annotationButton.send({ type: "add", annotation: { value } })
            annotationButton.send({ type: "close dialog" })
          }}
        />
      </DialogContent>
    </Dialog>
  )
}

export const AnnotationForm = (
  props: Pick<ToolbarBlockObjectSchemaType, "fields" | "defaultValues"> & {
    submitLabel: string
  } & {
    onSubmit: ({ value }: { value: { [key: string]: unknown } }) => void
  }
) => {
  const FormDataSchema = z.record(z.string(), z.unknown())

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault()

        const formData = new FormData(e.target as HTMLFormElement)
        const formDataValues = Object.fromEntries(formData)
        const value = FormDataSchema.parse(formDataValues)

        props.onSubmit({
          value,
        })
      }}
    >
      {props.fields.map((field) => (
        <div key={field.name} className="grid w-full items-center gap-3">
          <Label htmlFor={field.name}>{field.title ?? field.name}</Label>
          <Input
            type={field.type}
            name={field.name}
            id={field.name}
            // defaultValue={props.defaultValues?.[field.name] ?? undefined}
          />
        </div>
      ))}
      <Button className="self-end" type="submit" size="sm">
        {props.submitLabel}
      </Button>
    </form>
  )
}

export const HistoryButton = ({
  direction,
  showTooltip = true,
  showKeyboardShortcut = false,
  ...props
}: {
  direction: "undo" | "redo"
  showTooltip?: boolean
  showKeyboardShortcut?: boolean
} & React.ComponentProps<typeof Button>) => {
  const historyButtons = useHistoryButtons()
  const disabled = historyButtons.snapshot.matches("disabled")

  const extendedSchema: Record<
    typeof direction,
    { icon: React.ElementType; shortcut: KeyboardShortcut; title: string }
  > = {
    undo: {
      icon: UndoIcon,
      shortcut: undo,
      title: "Undo",
    },
    redo: {
      icon: RedoIcon,
      shortcut: redo,
      title: "Redo",
    },
  }

  const button = (
    <Button
      variant={props.variant ?? "outline"}
      size={props.size ?? "icon"}
      aria-label={!showTooltip ? direction : undefined}
      disabled={disabled}
      onClick={() => historyButtons.send({ type: `history.${direction}` })}
      {...props}
    >
      <ToolbarIcon
        icon={extendedSchema[direction].icon}
        fallback={extendedSchema[direction].title}
      />
    </Button>
  )

  if (showTooltip) {
    return (
      <ToolbarButtonTooltip
        tooltipContent={
          <div className="flex space-x-2">
            <span>{extendedSchema[direction].title}</span>
            {showKeyboardShortcut && (
              <KeyboardShortcutPreview
                shortcut={extendedSchema[direction].shortcut}
              />
            )}
          </div>
        }
      >
        {button}
      </ToolbarButtonTooltip>
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
    const IconComponent =
      keyToIcon[keyboardKey.toLowerCase() as keyof typeof keyToIcon]

    return (
      <kbd className="flex h-4 min-w-4 items-center justify-center rounded-xs bg-muted text-xs text-muted-foreground">
        {IconComponent ? <IconComponent className="size-3" /> : keyboardKey}
      </kbd>
    )
  }

  return (
    <div className="z-10 flex items-center space-x-1">
      {shortcut.keys.map((keyboardKey) => (
        <kbd
          key={keyboardKey}
          className="flex h-4 min-w-4 items-center justify-center rounded-xs bg-muted text-xs text-muted-foreground"
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

export const ToolbarButtonTooltip = ({
  children,
  tooltipContent,
}: {
  children: React.ReactNode
  tooltipContent: React.ReactNode
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>{tooltipContent}</TooltipContent>
    </Tooltip>
  )
}

export const ToolbarIcon = (props: {
  icon?: React.ReactNode | React.ComponentType
  fallback: string | null
}) => {
  const IconComponent = props.icon

  return isValidElement(IconComponent) ? (
    IconComponent
  ) : isValidElementType(IconComponent) ? (
    <IconComponent />
  ) : (
    props.fallback
  )
}

export const Toolbar = ({ children }: { children?: React.ReactNode }) => {
  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-1.5 rounded-t-sm border-b bg-muted px-2.5 py-1.5">
        {children}
      </div>
    </TooltipProvider>
  )
}
