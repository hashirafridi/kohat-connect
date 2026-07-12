import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, Trash2, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/data/home";
import { areas } from "@/data/shops";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/shops/new")({
  head: () => ({
    meta: [
      { title: "Create Shop — Admin" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CreateShopPage,
});

type WebpImage = { name: string; dataUrl: string; blob: Blob };
type HourRow = { day: string; open: string; close: string };

const MAX_GALLERY_IMAGES = 6;

const DEFAULT_HOURS: HourRow[] = [
  { day: "Monday", open: "10:00", close: "22:00" },
  { day: "Tuesday", open: "10:00", close: "22:00" },
  { day: "Wednesday", open: "10:00", close: "22:00" },
  { day: "Thursday", open: "10:00", close: "22:00" },
  { day: "Friday", open: "14:30", close: "22:30" },
  { day: "Saturday", open: "10:00", close: "23:00" },
  { day: "Sunday", open: "10:00", close: "23:00" },
];

/** Convert a File (image) into a webp Blob + data URL using canvas. */
async function fileToWebp(file: File, quality = 0.85): Promise<WebpImage> {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");
  ctx.drawImage(bitmap, 0, 0);
  const blob: Blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("webp encode failed"))),
      "image/webp",
      quality,
    );
  });
  const dataUrl: string = await new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = () => reject(r.error);
    r.readAsDataURL(blob);
  });
  const baseName = file.name.replace(/\.[^.]+$/, "");
  return { name: `${baseName}.webp`, dataUrl, blob };
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function CreateShopPage() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [area, setArea] = useState("");
  const [tagline, setTagline] = useState("");
  const [about, setAbout] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [established, setEstablished] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [website, setWebsite] = useState("");
  const [featured, setFeatured] = useState(false);
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [cover, setCover] = useState<WebpImage | null>(null);
  const [gallery, setGallery] = useState<WebpImage[]>([]);
  const [hours, setHours] = useState<HourRow[]>(DEFAULT_HOURS);
  const [converting, setConverting] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const autoSlug = useMemo(() => slugify(name), [name]);
  const effectiveSlug = slug || autoSlug;

  async function handleCover(file: File | undefined) {
    if (!file) return;
    try {
      setConverting(true);
      const w = await fileToWebp(file);
      setCover(w);
    } catch (e) {
      toast.error("Failed to convert cover image");
      console.error(e);
    } finally {
      setConverting(false);
    }
  }

  async function handleGallery(files: FileList | null) {
    if (!files || files.length === 0) return;
    try {
      setConverting(true);
      const converted = await Promise.all(
        Array.from(files).map((f) => fileToWebp(f)),
      );
      setGallery((prev) => [...prev, ...converted]);
    } catch (e) {
      toast.error("Failed to convert gallery images");
      console.error(e);
    } finally {
      setConverting(false);
    }
  }

  function updateHour(idx: number, patch: Partial<HourRow>) {
    setHours((prev) => prev.map((h, i) => (i === idx ? { ...h, ...patch } : h)));
  }
  function addHourRow() {
    setHours((prev) => [...prev, { day: "", open: "10:00", close: "22:00" }]);
  }
  function removeHourRow(idx: number) {
    setHours((prev) => prev.filter((_, i) => i !== idx));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !category || !area || !cover) {
      toast.error("Name, category, area and cover image are required");
      return;
    }
    if (!lat || !lng) {
      toast.error("Coordinates (latitude & longitude) are required");
      return;
    }
    setSubmitting(true);
    // Not integrated yet — just log the payload for now.
    const payload = {
      slug: effectiveSlug,
      name,
      category,
      area,
      tagline,
      about,
      whatsapp,
      phone,
      email,
      address,
      established,
      facebook,
      instagram,
      website,
      featured,
      coordinates: { lat: parseFloat(lat), lng: parseFloat(lng) },
      hours,
      cover: cover.name,
      gallery: gallery.map((g) => g.name),
    };
    console.log("[admin] create shop payload", payload);
    toast.success("Shop draft ready (not yet saved to database)");
    setSubmitting(false);
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Admin
            </p>
            <h1 className="text-xl font-semibold">Create shop</h1>
          </div>
          <Link
            to="/shops"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back to site
          </Link>
        </div>
      </header>

      <form
        onSubmit={onSubmit}
        className="mx-auto max-w-5xl space-y-8 px-4 py-8"
      >
        {/* Basic */}
        <section className="rounded-lg border bg-background p-6">
          <h2 className="mb-4 text-base font-semibold">Basic info</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="name">Shop name *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Shahi Biryani House"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder={autoSlug || "auto-generated-from-name"}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Category *</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.key} value={c.key}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Area *</Label>
              <Select value={area} onValueChange={setArea}>
                <SelectTrigger>
                  <SelectValue placeholder="Select area" />
                </SelectTrigger>
                <SelectContent>
                  {areas.map((a) => (
                    <SelectItem key={a} value={a}>
                      {a}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="tagline">Tagline</Label>
              <Input
                id="tagline"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="Short one-liner shown on cards"
                maxLength={140}
              />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="about">About</Label>
              <Textarea
                id="about"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                rows={4}
                placeholder="Longer description shown on the shop page"
              />
            </div>
            <div className="flex items-center gap-2 md:col-span-2">
              <Checkbox
                id="featured"
                checked={featured}
                onCheckedChange={(v) => setFeatured(v === true)}
              />
              <Label htmlFor="featured" className="cursor-pointer">
                Mark as featured (appears in Featured Shops sections)
              </Label>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="rounded-lg border bg-background p-6">
          <h2 className="mb-4 text-base font-semibold">Contact & links</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="whatsapp">WhatsApp number</Label>
              <Input
                id="whatsapp"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="+923001234567"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+923001234567"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contact@shop.pk"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="established">Established</Label>
              <Input
                id="established"
                value={established}
                onChange={(e) => setEstablished(e.target.value)}
                placeholder="Est. 2015"
              />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Near main chowk, Bannu Road, Kohat"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="facebook">Facebook URL</Label>
              <Input
                id="facebook"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="instagram">Instagram URL</Label>
              <Input
                id="instagram"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Coordinates */}
        <section className="rounded-lg border bg-background p-6">
          <h2 className="mb-1 text-base font-semibold">Map coordinates *</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Stored in a separate coordinates table so the map view can load all
            pins in one query.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="lat">Latitude</Label>
              <Input
                id="lat"
                inputMode="decimal"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                placeholder="33.5772"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="lng">Longitude</Label>
              <Input
                id="lng"
                inputMode="decimal"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                placeholder="71.4339"
              />
            </div>
          </div>
        </section>

        {/* Hours */}
        <section className="rounded-lg border bg-background p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold">Opening hours</h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addHourRow}
            >
              <Plus className="mr-1 h-4 w-4" /> Add row
            </Button>
          </div>
          <div className="space-y-2">
            {hours.map((h, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_auto_auto_auto] md:items-end"
              >
                <div className="space-y-1.5">
                  <Label className="text-xs">Day</Label>
                  <Input
                    value={h.day}
                    onChange={(e) => updateHour(idx, { day: e.target.value })}
                    placeholder="Monday"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Open</Label>
                  <Input
                    type="time"
                    value={h.open}
                    onChange={(e) => updateHour(idx, { open: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Close</Label>
                  <Input
                    type="time"
                    value={h.close}
                    onChange={(e) => updateHour(idx, { close: e.target.value })}
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeHourRow(idx)}
                  aria-label="Remove row"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Images */}
        <section className="rounded-lg border bg-background p-6">
          <h2 className="mb-1 text-base font-semibold">Images</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            All uploads are automatically converted to WebP before saving.
          </p>

          <div className="space-y-6">
            <div>
              <Label className="mb-2 block">Cover image *</Label>
              {cover ? (
                <div className="relative w-fit">
                  <img
                    src={cover.dataUrl}
                    alt="cover preview"
                    className="h-40 w-64 rounded-md object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setCover(null)}
                    className="absolute -right-2 -top-2 rounded-full bg-background p-1 shadow ring-1 ring-border"
                    aria-label="Remove cover"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {cover.name} · {(cover.blob.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              ) : (
                <label className="flex h-40 w-64 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground hover:bg-muted/50">
                  <Upload className="mb-1 h-5 w-5" />
                  Upload cover
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleCover(e.target.files?.[0])}
                  />
                </label>
              )}
            </div>

            <div>
              <Label className="mb-2 block">Gallery images</Label>
              <div className="flex flex-wrap gap-3">
                {gallery.map((g, i) => (
                  <div key={i} className="relative">
                    <img
                      src={g.dataUrl}
                      alt={g.name}
                      className="h-24 w-24 rounded-md object-cover"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setGallery((prev) => prev.filter((_, j) => j !== i))
                      }
                      className="absolute -right-2 -top-2 rounded-full bg-background p-1 shadow ring-1 ring-border"
                      aria-label="Remove image"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
                <label className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed text-xs text-muted-foreground hover:bg-muted/50">
                  <Plus className="mb-0.5 h-4 w-4" />
                  Add
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => handleGallery(e.target.files)}
                  />
                </label>
              </div>
            </div>

            {converting ? (
              <p className="text-xs text-muted-foreground">
                Converting to WebP…
              </p>
            ) : null}
          </div>
        </section>

        <div className="flex items-center justify-end gap-3">
          <Link
            to="/shops"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Cancel
          </Link>
          <Button type="submit" disabled={submitting || converting}>
            {submitting ? "Saving…" : "Create shop"}
          </Button>
        </div>
      </form>
    </div>
  );
}
