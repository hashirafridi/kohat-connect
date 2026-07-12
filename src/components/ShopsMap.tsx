import { useEffect, useMemo, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Shop } from "@/data/shops";

// Custom SVG pin so we don't rely on Leaflet's default marker image assets
// (those 404 under Vite unless configured).
const pinIcon = L.divIcon({
  className: "kohat-map-pin",
  html: `<div style="
    width: 32px; height: 32px; transform: translate(-50%, -100%);
    display:flex; align-items:center; justify-content:center;
    background: oklch(0.55 0.18 30); color: white;
    border-radius: 9999px; box-shadow: 0 4px 10px rgba(0,0,0,0.35);
    border: 2px solid white;
    font-weight: 600;
  ">
    <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'
      viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.2'
      stroke-linecap='round' stroke-linejoin='round'>
      <path d='M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z'/>
      <circle cx='12' cy='10' r='3'/>
    </svg>
  </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -30],
});

// Kohat city center
const KOHAT: [number, number] = [33.5869, 71.4414];

export default function ShopsMap({ shops }: { shops: Shop[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);

  const points = useMemo(
    () =>
      shops
        .filter((s) => typeof s.lat === "number" && typeof s.lng === "number")
        .map((s) => ({ shop: s, latlng: [s.lat, s.lng] as [number, number] })),
    [shops],
  );

  // Init map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, {
      center: KOHAT,
      zoom: 13,
      scrollWheelZoom: false,
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    layerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
      layerRef.current = null;
    };
  }, []);

  // Update markers whenever shops change
  useEffect(() => {
    const map = mapRef.current;
    const layer = layerRef.current;
    if (!map || !layer) return;
    layer.clearLayers();
    if (points.length === 0) return;

    for (const { shop, latlng } of points) {
      const marker = L.marker(latlng, { icon: pinIcon, title: shop.name });
      marker.bindPopup(
        `<div style="font-family: inherit; min-width: 180px;">
          <strong style="display:block; font-size: 14px; margin-bottom: 2px;">
            ${escapeHtml(shop.name)}
          </strong>
          <div style="font-size: 12px; color: #666; margin-bottom: 6px;">
            ${escapeHtml(shop.categoryLabel)} · ${escapeHtml(shop.area)}
          </div>
          <a href="/shops/${encodeURIComponent(shop.slug)}"
             style="font-size: 12px; color: oklch(0.55 0.18 30); font-weight: 600;">
             View shop →
          </a>
        </div>`,
      );
      marker.addTo(layer);
    }

    const bounds = L.latLngBounds(points.map((p) => p.latlng));
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
  }, [points]);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[16/9] w-full overflow-hidden rounded-sm border border-border bg-secondary/40"
    />
  );
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
