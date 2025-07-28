import { OpenInV0Button } from "@/components/open-in-v0-button"
import CompactEditor from "@/registry/default/blocks/compact-editor/compact-editor"
import ExtendedEditor from "@/registry/default/blocks/extended-editor/extended-editor"
import SimpleEditor from "@/registry/default/blocks/simple-editor/simple-editor"
// This page displays items from the custom registry.
// You are free to implement this with your own design as needed.

export default function Home() {
  return (
    <div className="mx-auto flex min-h-svh max-w-3xl flex-col gap-8 px-4 py-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Custom Registry</h1>
        <p className="text-muted-foreground">
          A custom registry for distributing code using shadcn.
        </p>
      </header>
      <main className="flex flex-1 flex-col gap-8">
        <div className="relative flex min-h-[450px] flex-col gap-4 rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              An extended rich text editor example.
            </h2>
            <OpenInV0Button name="extended-editor" className="w-fit" />
          </div>
          <div className="relative flex min-h-[400px] items-center justify-center">
            <ExtendedEditor />
          </div>
        </div>

        <div className="relative flex min-h-[450px] flex-col gap-4 rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              A simple rich text editor example.
            </h2>
            <OpenInV0Button name="simple-editor" className="w-fit" />
          </div>
          <div className="relative flex min-h-[400px] items-center justify-center">
            <SimpleEditor />
          </div>
        </div>

        <div className="relative flex min-h-[450px] flex-col gap-4 rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              A compact version of the rich text editor.
            </h2>
            <OpenInV0Button name="compact-editor" className="w-fit" />
          </div>
          <div className="relative flex min-h-[400px] items-center justify-center">
            <CompactEditor />
          </div>
        </div>
      </main>
    </div>
  )
}
