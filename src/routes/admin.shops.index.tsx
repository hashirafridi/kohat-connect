import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Pencil, Plus, Search, Star, Trash2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useShops } from "@/hooks/use-shops";
import { deleteShop } from "@/lib/shops-api";

export const Route = createFileRoute("/admin/shops/")({
  head: () => ({
    meta: [
      { title: "Shops — Admin" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminShopsList,
});

function AdminShopsList() {
  const [q, setQ] = useState("");
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);
  const { shops, usingFallback, isLoading } = useShops();
  const qc = useQueryClient();

  async function handleDelete(slug: string, name: string) {
    if (usingFallback) {
      toast.error("Can't delete sample data. Create a shop first.");
      return;
    }
    try {
      setDeletingSlug(slug);
      toast.loading(`Deleting ${name}…`, { id: `del-${slug}` });
      await deleteShop(slug);
      await qc.invalidateQueries({ queryKey: ["shops"] });
      await qc.invalidateQueries({ queryKey: ["shop", slug] });
      toast.success("Shop deleted", { id: `del-${slug}` });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to delete shop";
      toast.error(msg, { id: `del-${slug}` });
    } finally {
      setDeletingSlug(null);
    }
  }

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return shops;
    return shops.filter(
      (s) =>
        s.name.toLowerCase().includes(term) ||
        s.slug.toLowerCase().includes(term) ||
        s.categoryLabel.toLowerCase().includes(term) ||
        s.area.toLowerCase().includes(term),
    );
  }, [q, shops]);

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Admin</p>
            <h1 className="text-xl font-semibold">Shops</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/shops" className="text-sm text-muted-foreground hover:text-foreground">
              View site
            </Link>
            <Button asChild size="sm">
              <Link to="/admin/shops/new">
                <Plus className="mr-1 h-4 w-4" /> Create shop
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-4 px-4 py-8">
        <div className="relative max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, slug, category, area…"
            className="pl-9"
          />
        </div>

        <div className="overflow-hidden rounded-lg border bg-background">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Shop</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Area</th>
                <th className="px-4 py-3">Featured</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.slug} className="border-t">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={s.image} alt="" className="h-10 w-10 rounded object-cover" />
                      <div>
                        <div className="font-medium">{s.name}</div>
                        <div className="text-xs text-muted-foreground">{s.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{s.categoryLabel}</td>
                  <td className="px-4 py-3">{s.area}</td>
                  <td className="px-4 py-3">
                    {s.featured ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                        <Star className="h-3 w-3" /> Featured
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button asChild size="sm" variant="outline">
                      <Link to="/admin/shops/$slug/edit" params={{ slug: s.slug }}>
                        <Pencil className="mr-1 h-3.5 w-3.5" /> Edit
                      </Link>
                    </Button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-sm text-muted-foreground">
                    No shops match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-muted-foreground">
          {isLoading
            ? "Loading shops…"
            : `Showing ${filtered.length} of ${shops.length} shops.${usingFallback ? " (Showing sample data — no shops in the database yet.)" : ""}`}
        </p>
      </div>
    </div>
  );
}
