import { Installation } from "@/components/installation"
import { OpenInV0Button } from "@/components/open-in-v0-button"
import CompactEditor from "@/registry/default/blocks/compact-editor"
import ExtendedEditor from "@/registry/default/blocks/extended-editor"
import SimpleEditor from "@/registry/default/blocks/simple-editor"
// This page displays items from the custom registry.
// You are free to implement this with your own design as needed.

export default function Home() {
  return (
    <div className="mx-auto flex min-h-svh max-w-5xl flex-col gap-8 px-4 py-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">
          Portable Text Editor
        </h1>
        <p className="text-muted-foreground">
          Portable text editor examples installable via the{" "}
          <a
            href="https://ui.shadcn.com/"
            className="font-semibold text-foreground underline"
          >
            shadcn
          </a>{" "}
          registry.
        </p>
      </header>
      <main className="flex flex-1 flex-col gap-8">
        <div className="relative flex flex-col gap-4 rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold">Simple Editor</p>
            <OpenInV0Button name="simple-editor" className="w-fit" />
          </div>
          <Installation component="simple-editor" />
          <div className="relative flex min-h-[400px] items-center justify-center">
            <SimpleEditor />
          </div>
        </div>

        <div className="relative flex flex-col gap-4 rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold">Extended Editor</p>
            <OpenInV0Button name="extended-editor" className="w-fit" />
          </div>
          <Installation component="extended-editor" />
          <div className="relative flex min-h-[400px] items-center justify-center">
            <ExtendedEditor />
          </div>
        </div>

        <div className="relative flex flex-col gap-4 rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold">Compact Editor</p>
            <OpenInV0Button name="compact-editor" className="w-fit" />
          </div>
          <Installation component="compact-editor" />
          <div className="relative flex min-h-[400px] items-center justify-center">
            <CompactEditor />
          </div>
        </div>
      </main>
    </div>
  )
}
