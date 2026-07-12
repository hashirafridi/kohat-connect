import { createFileRoute, Link } from "@tanstack/react-router";
import { ShopForm } from "@/components/admin/ShopForm";

export const Route = createFileRoute("/admin/shops/new")({
  head: () => ({
    meta: [
      { title: "Create Shop — Admin" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CreateShopPage,
});

function CreateShopPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Admin</p>
            <h1 className="text-xl font-semibold">Create shop</h1>
          </div>
          <Link to="/admin/shops" className="text-sm text-muted-foreground hover:text-foreground">
            ← Back to shops
          </Link>
        </div>
      </header>
      <ShopForm mode="create" />
    </div>
  );
}
