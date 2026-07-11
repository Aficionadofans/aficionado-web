import { ComposeForm } from "@/features/studio/ui/ComposeForm";

export default function CreatePage() {
  return (
    <div className="max-w-2xl px-4 py-8 mx-auto lg:py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-off-white">Studio</h1>
        <p className="mt-2 text-muted-foreground">Share an update with your circles or followers.</p>
      </header>

      <ComposeForm />
      
      <p className="text-xs text-center text-muted-foreground mt-8 px-8">
        All content passes through our automated AI moderation gate to ensure a safe, trigger-free environment.
      </p>
    </div>
  );
}
