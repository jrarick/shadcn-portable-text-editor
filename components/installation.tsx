"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/default/components/ui/button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/default/components/ui/tabs"
import { Check, Copy } from "lucide-react"
import { useState } from "react"

interface InstallationProps {
  component?: string
  className?: string
}

export function Installation({
  component = "tabs",
  className,
}: InstallationProps) {
  const [copied, setCopied] = useState<string | null>(null)

  const url =
    (component = `${process.env.NEXT_PUBLIC_BASE_URL}/r/${component}.json`)

  const packageManagers = [
    {
      id: "pnpm",
      label: "pnpm",
      command: `pnpm dlx shadcn@latest add ${url}`,
    },
    { id: "npm", label: "npm", command: `npx shadcn@latest add ${url}` },
    {
      id: "yarn",
      label: "yarn",
      command: `yarn shadcn@latest add ${url}`,
    },
    {
      id: "bun",
      label: "bun",
      command: `bunx --bun shadcn@latest add ${url}`,
    },
  ]

  const copyToClipboard = async (text: string, managerId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(managerId)
      setTimeout(() => setCopied(null), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <div>
      <div
        className={cn(
          "mt-2 mb-8 w-full rounded-md border border-border bg-muted shadow-xs",
          className
        )}
      >
        <Tabs defaultValue="pnpm" className="w-full gap-0">
          <TabsList className="mx-2 my-1 grid grid-cols-4">
            {packageManagers.map((pm) => (
              <TabsTrigger key={pm.id} value={pm.id}>
                {pm.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {packageManagers.map((pm) => (
            <TabsContent key={pm.id} value={pm.id}>
              <div className="relative border-t border-border">
                <div className="flex items-center justify-between rounded-md bg-muted px-4 py-2">
                  <code className="font-mono text-xs sm:text-sm">
                    {pm.command}
                  </code>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 shrink-0"
                    onClick={() => copyToClipboard(pm.command, pm.id)}
                    aria-label={`Copy ${pm.label} command`}
                  >
                    {copied === pm.id ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
