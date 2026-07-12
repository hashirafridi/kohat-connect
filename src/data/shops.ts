// Placeholder shop directory. Later this is DB-backed.
import heroBiryani from "@/assets/hero-biryani.jpg";
import heroBikes from "@/assets/hero-bikes.jpg";
import heroBazaar from "@/assets/hero-bazaar.jpg";
import shopFurniture from "@/assets/shop-furniture.jpg";
import shopCafe from "@/assets/shop-cafe.jpg";
import shopRestaurant from "@/assets/shop-restaurant.jpg";
import shopMobile from "@/assets/shop-mobile.jpg";
import shopFabric from "@/assets/shop-fabric.jpg";
import shopBus from "@/assets/shop-bus.jpg";

export type Shop = {
  slug: string;
  name: string;
  category: string; // matches Category.key from home.ts
  categoryLabel: string;
  area: string;
  image: string;
  whatsapp: string;
  phone: string;
  tagline: string;
  featured?: boolean;
  // Optional details for the single-shop page. Fall back to sensible defaults.
  email?: string;
  address?: string;
  hours?: { day: string; open: string }[];
  gallery?: string[];
  about?: string;
  established?: string;
  facebook?: string;
  instagram?: string;
  website?: string;
};

/** Look up a shop by slug and enrich with defaults for the detail page. */
export function getShopBySlug(slug: string) {
  const shop = shops.find((s) => s.slug === slug);
  if (!shop) return undefined;
  const gallery = shop.gallery ?? [
    shop.image,
    heroBazaar,
    shopFabric,
    shopCafe,
    shopRestaurant,
    shopMobile,
  ];
  const hours = shop.hours ?? [
    { day: "Monday – Thursday", open: "10:00 AM – 10:00 PM" },
    { day: "Friday", open: "2:30 PM – 10:30 PM" },
    { day: "Saturday – Sunday", open: "10:00 AM – 11:00 PM" },
  ];
  return {
    ...shop,
    email: shop.email ?? `contact@${shop.slug}.pk`,
    address: shop.address ?? `Near main chowk, ${shop.area}, Kohat, KPK`,
    hours,
    gallery,
    about:
      shop.about ??
      `${shop.name} is a well-known ${shop.categoryLabel.toLowerCase()} spot located on ${shop.area}. ${shop.tagline} Loved by locals, easy to find, and open through the week.`,
    established: shop.established ?? "Est. 2015",
  };
}

export const areas = [
  "Bannu Road",
  "Pindi Road",
  "Hangu Road",
  "KDA Chowk",
  "Cantt Bazaar",
  "Main Bazaar",
  "Kachehri Road",
  "Jungle Khel",
];

export const shops: Shop[] = [
  {
    slug: "shahi-biryani-house",
    name: "Shahi Biryani House",
    category: "biryani",
    categoryLabel: "Biryani",
    area: "Bannu Road",
    image: heroBiryani,
    whatsapp: "+923001234567",
    phone: "+923001234567",
    tagline: "Slow-cooked degi biryani since 1998.",
    featured: true,
  },
  {
    slug: "khyber-motors",
    name: "Khyber Motors",
    category: "bikes",
    categoryLabel: "Bikes",
    area: "KDA Chowk",
    image: heroBikes,
    whatsapp: "+923001234568",
    phone: "+923001234568",
    tagline: "New & used bikes, spare parts, tuning.",
    featured: true,
  },
  {
    slug: "al-madina-furniture",
    name: "Al-Madina Furniture",
    category: "furniture",
    categoryLabel: "Furniture",
    area: "Pindi Road",
    image: shopFurniture,
    whatsapp: "+923001234569",
    phone: "+923001234569",
    tagline: "Handcrafted sofas, beds and dining sets.",
    featured: true,
  },
  {
    slug: "chai-adda",
    name: "Chai Adda",
    category: "cafes",
    categoryLabel: "Cafés",
    area: "Cantt Bazaar",
    image: shopCafe,
    whatsapp: "+923001234570",
    phone: "+923001234570",
    tagline: "Doodh patti, paratha rolls, all day.",
    featured: true,
  },
  {
    slug: "peshawar-karahi",
    name: "Peshawar Karahi Corner",
    category: "restaurants",
    categoryLabel: "Restaurants",
    area: "Hangu Road",
    image: shopRestaurant,
    whatsapp: "+923001234571",
    phone: "+923001234571",
    tagline: "Namkeen karahi, tikka and BBQ.",
    featured: true,
  },
  {
    slug: "smart-mobile-center",
    name: "Smart Mobile Center",
    category: "mobile",
    categoryLabel: "Mobile Shops",
    area: "Main Bazaar",
    image: shopMobile,
    whatsapp: "+923001234572",
    phone: "+923001234572",
    tagline: "New phones, accessories, repairs.",
    featured: true,
  },
  {
    slug: "kohat-fabric-house",
    name: "Kohat Fabric House",
    category: "stalls",
    categoryLabel: "Stalls",
    area: "Main Bazaar",
    image: shopFabric,
    whatsapp: "+923001234573",
    phone: "+923001234573",
    tagline: "Lawn, khaddar and shalwar suits.",
  },
  {
    slug: "daewoo-ticket-agent",
    name: "Daewoo Ticket Agent",
    category: "bus",
    categoryLabel: "Bus Tickets",
    area: "Kachehri Road",
    image: shopBus,
    whatsapp: "+923001234574",
    phone: "+923001234574",
    tagline: "Daewoo, Faisal Movers & Skyways bookings.",
  },
  {
    slug: "quetta-cafe",
    name: "Quetta Café",
    category: "cafes",
    categoryLabel: "Cafés",
    area: "Kachehri Road",
    image: shopCafe,
    whatsapp: "+923001234575",
    phone: "+923001234575",
    tagline: "Quetta chai and bun kebab.",
  },
  {
    slug: "friends-bike-workshop",
    name: "Friends Bike Workshop",
    category: "bikes",
    categoryLabel: "Bikes",
    area: "Jungle Khel",
    image: heroBikes,
    whatsapp: "+923001234576",
    phone: "+923001234576",
    tagline: "Honda, Suzuki & Yamaha service.",
  },
  {
    slug: "madni-biryani-point",
    name: "Madni Biryani Point",
    category: "biryani",
    categoryLabel: "Biryani",
    area: "Main Bazaar",
    image: heroBiryani,
    whatsapp: "+923001234577",
    phone: "+923001234577",
    tagline: "Chicken biryani plates from Rs. 250.",
  },
  {
    slug: "royal-furniture-mall",
    name: "Royal Furniture Mall",
    category: "furniture",
    categoryLabel: "Furniture",
    area: "Bannu Road",
    image: shopFurniture,
    whatsapp: "+923001234578",
    phone: "+923001234578",
    tagline: "Wooden sofas, office chairs, dining.",
  },
  {
    slug: "mobile-hub",
    name: "Mobile Hub",
    category: "mobile",
    categoryLabel: "Mobile Shops",
    area: "Cantt Bazaar",
    image: shopMobile,
    whatsapp: "+923001234579",
    phone: "+923001234579",
    tagline: "iPhone, Samsung & accessories.",
  },
  {
    slug: "afghan-tikka-house",
    name: "Afghan Tikka House",
    category: "restaurants",
    categoryLabel: "Restaurants",
    area: "Pindi Road",
    image: shopRestaurant,
    whatsapp: "+923001234580",
    phone: "+923001234580",
    tagline: "Charcoal tikka, kababs and naan.",
  },
  {
    slug: "sabzi-mandi-stall",
    name: "Sabzi Mandi Stall #14",
    category: "stalls",
    categoryLabel: "Stalls",
    area: "Main Bazaar",
    image: heroBazaar,
    whatsapp: "+923001234581",
    phone: "+923001234581",
    tagline: "Fresh vegetables at wholesale rates.",
  },
  {
    slug: "faisal-movers-office",
    name: "Faisal Movers Office",
    category: "bus",
    categoryLabel: "Bus Tickets",
    area: "KDA Chowk",
    image: shopBus,
    whatsapp: "+923001234582",
    phone: "+923001234582",
    tagline: "Bookings for Islamabad, Lahore, Karachi.",
  },
];
