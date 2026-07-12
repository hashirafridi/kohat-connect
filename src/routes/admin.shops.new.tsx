import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ShopForm, type ShopFormValues } from "@/components/admin/ShopForm";
import { createShop } from "@/lib/shops-api";

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
  const navigate = useNavigate();
  const qc = useQueryClient();

  async function handleSubmit(values: ShopFormValues) {
    try {
      toast.loading("Creating shop…", { id: "create-shop" });
      const shop = await createShop(values);
      await qc.invalidateQueries({ queryKey: ["shops"] });
      toast.success("Shop created", { id: "create-shop" });
      navigate({ to: "/admin/shops" });
      return shop;
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to create shop";
      toast.error(msg, { id: "create-shop" });
    }
  }

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
      <ShopForm mode="create" onSubmit={handleSubmit} />
    </div>
  );
}
