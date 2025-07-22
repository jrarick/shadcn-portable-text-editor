import { OpenInV0Button } from "@/components/open-in-v0-button"
import PokemonPage from "@/registry/new-york/blocks/complex-component/page"
import { ExampleForm } from "@/registry/new-york/blocks/example-form/example-form"
import { ExampleCard } from "@/registry/new-york/blocks/example-with-css/example-card"
import { HelloWorld } from "@/registry/new-york/blocks/hello-world/hello-world"
import CompactEditor from "@/registry/new-york/blocks/portable-text-editor/compact"
import KitchenSinkEditor from "@/registry/new-york/blocks/portable-text-editor/kitchen-sink"
import SimpleEditor from "@/registry/new-york/blocks/portable-text-editor/simple"
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
              A full featured rich text editor.
            </h2>
            <OpenInV0Button name="portable-text-editor" className="w-fit" />
          </div>
          <div className="relative flex min-h-[400px] items-center justify-center">
            <KitchenSinkEditor />
          </div>
        </div>

        <div className="relative flex min-h-[450px] flex-col gap-4 rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              A simple text editor.
            </h2>
            <OpenInV0Button name="portable-text-editor" className="w-fit" />
          </div>
          <div className="relative flex min-h-[400px] items-center justify-center">
            <SimpleEditor />
          </div>
        </div>

        <div className="relative flex min-h-[450px] flex-col gap-4 rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              A compact version of the text editor.
            </h2>
            <OpenInV0Button name="portable-text-editor" className="w-fit" />
          </div>
          <div className="relative flex min-h-[400px] items-center justify-center">
            <CompactEditor />
          </div>
        </div>

        <div className="relative flex min-h-[450px] flex-col gap-4 rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              A simple hello world component
            </h2>
            <OpenInV0Button name="hello-world" className="w-fit" />
          </div>
          <div className="relative flex min-h-[400px] items-center justify-center">
            <HelloWorld />
          </div>
        </div>

        <div className="relative flex min-h-[450px] flex-col gap-4 rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              A contact form with Zod validation.
            </h2>
            <OpenInV0Button name="example-form" className="w-fit" />
          </div>
          <div className="relative flex min-h-[500px] items-center justify-center">
            <ExampleForm />
          </div>
        </div>

        <div className="relative flex min-h-[450px] flex-col gap-4 rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              A complex component showing hooks, libs and components.
            </h2>
            <OpenInV0Button name="complex-component" className="w-fit" />
          </div>
          <div className="relative flex min-h-[400px] items-center justify-center">
            <PokemonPage />
          </div>
        </div>

        <div className="relative flex min-h-[450px] flex-col gap-4 rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              A login form with a CSS file.
            </h2>
            <OpenInV0Button name="example-with-css" className="w-fit" />
          </div>
          <div className="relative flex min-h-[400px] items-center justify-center">
            <ExampleCard />
          </div>
        </div>
      </main>
    </div>
  )
}
