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
  /** Main category key (e.g. "food-drinks"). */
  category: string;
  /** Main category label (e.g. "Food & Drinks"). */
  categoryLabel: string;
  /** Sub category key (e.g. "biryani"). */
  subcategory?: string;
  /** Sub category label (e.g. "Biryani"). */
  subcategoryLabel?: string;
  area: string;
  image: string;
  whatsapp: string;
  phone: string;
  tagline: string;
  featured?: boolean;
  lat: number;
  lng: number;
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

export function enrichShop(shop: Shop) {
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
  const displayLabel = shop.subcategoryLabel ?? shop.categoryLabel;
  return {
    ...shop,
    email: shop.email ?? `contact@${shop.slug}.pk`,
    address: shop.address ?? `Near main chowk, ${shop.area}, Kohat, KPK`,
    hours,
    gallery,
    about:
      shop.about ??
      `${shop.name} is a well-known ${displayLabel.toLowerCase()} located on ${shop.area}. ${shop.tagline} Loved by locals, easy to find, and open through the week.`,
    established: shop.established ?? "Est. 2015",
  };
}

export function getShopBySlug(slug: string) {
  const shop = shops.find((s) => s.slug === slug);
  if (!shop) return undefined;
  return enrichShop(shop);
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
    category: "food-drinks",
    categoryLabel: "Food & Drinks",
    subcategory: "biryani",
    subcategoryLabel: "Biryani",
    area: "Bannu Road",
    lat: 33.5772,
    lng: 71.4339,
    image: heroBiryani,
    whatsapp: "+923001234567",
    phone: "+923001234567",
    tagline: "Slow-cooked degi biryani since 1998.",
    featured: true,
  },
  {
    slug: "khyber-motors",
    name: "Khyber Motors",
    category: "vehicles",
    categoryLabel: "Vehicles",
    subcategory: "bikes",
    subcategoryLabel: "Bikes",
    area: "KDA Chowk",
    lat: 33.5982,
    lng: 71.4499,
    image: heroBikes,
    whatsapp: "+923001234568",
    phone: "+923001234568",
    tagline: "New & used bikes, spare parts, tuning.",
    featured: true,
  },
  {
    slug: "al-madina-furniture",
    name: "Al-Madina Furniture",
    category: "shopping",
    categoryLabel: "Shopping",
    subcategory: "furniture",
    subcategoryLabel: "Furniture Stores",
    area: "Pindi Road",
    lat: 33.5931,
    lng: 71.4533,
    image: shopFurniture,
    whatsapp: "+923001234569",
    phone: "+923001234569",
    tagline: "Handcrafted sofas, beds and dining sets.",
    featured: true,
  },
  {
    slug: "chai-adda",
    name: "Chai Adda",
    category: "food-drinks",
    categoryLabel: "Food & Drinks",
    subcategory: "cafes",
    subcategoryLabel: "Cafés",
    area: "Cantt Bazaar",
    lat: 33.5748,
    lng: 71.4462,
    image: shopCafe,
    whatsapp: "+923001234570",
    phone: "+923001234570",
    tagline: "Doodh patti, paratha rolls, all day.",
    featured: true,
  },
  {
    slug: "peshawar-karahi",
    name: "Peshawar Karahi Corner",
    category: "food-drinks",
    categoryLabel: "Food & Drinks",
    subcategory: "restaurants",
    subcategoryLabel: "Restaurants",
    area: "Hangu Road",
    lat: 33.5832,
    lng: 71.4188,
    image: shopRestaurant,
    whatsapp: "+923001234571",
    phone: "+923001234571",
    tagline: "Namkeen karahi, tikka and BBQ.",
    featured: true,
  },
  {
    slug: "smart-mobile-center",
    name: "Smart Mobile Center",
    category: "shopping",
    categoryLabel: "Shopping",
    subcategory: "mobile",
    subcategoryLabel: "Mobile Shops",
    area: "Main Bazaar",
    lat: 33.5884,
    lng: 71.4424,
    image: shopMobile,
    whatsapp: "+923001234572",
    phone: "+923001234572",
    tagline: "New phones, accessories, repairs.",
    featured: true,
  },
  {
    slug: "kohat-fabric-house",
    name: "Kohat Fabric House",
    category: "shopping",
    categoryLabel: "Shopping",
    subcategory: "clothing",
    subcategoryLabel: "Clothing Stores",
    area: "Main Bazaar",
    lat: 33.5898,
    lng: 71.4445,
    image: shopFabric,
    whatsapp: "+923001234573",
    phone: "+923001234573",
    tagline: "Lawn, khaddar and shalwar suits.",
  },
  {
    slug: "daewoo-ticket-agent",
    name: "Daewoo Ticket Agent",
    category: "travel",
    categoryLabel: "Travel",
    subcategory: "bus-tickets",
    subcategoryLabel: "Bus Tickets",
    area: "Kachehri Road",
    lat: 33.59,
    lng: 71.4488,
    image: shopBus,
    whatsapp: "+923001234574",
    phone: "+923001234574",
    tagline: "Daewoo, Faisal Movers & Skyways bookings.",
  },
  {
    slug: "quetta-cafe",
    name: "Quetta Café",
    category: "food-drinks",
    categoryLabel: "Food & Drinks",
    subcategory: "cafes",
    subcategoryLabel: "Cafés",
    area: "Kachehri Road",
    lat: 33.5876,
    lng: 71.4489,
    image: shopCafe,
    whatsapp: "+923001234575",
    phone: "+923001234575",
    tagline: "Quetta chai and bun kebab.",
    facebook: "https://facebook.com/QuettaCafeKohat",
    instagram: "https://instagram.com/quetta_cafe_kohat",
  },
  {
    slug: "friends-bike-workshop",
    name: "Friends Bike Workshop",
    category: "vehicles",
    categoryLabel: "Vehicles",
    subcategory: "auto-workshops",
    subcategoryLabel: "Auto Workshops",
    area: "Jungle Khel",
    lat: 33.6025,
    lng: 71.4613,
    image: heroBikes,
    whatsapp: "+923001234576",
    phone: "+923001234576",
    tagline: "Honda, Suzuki & Yamaha service.",
  },
  {
    slug: "madni-biryani-point",
    name: "Madni Biryani Point",
    category: "food-drinks",
    categoryLabel: "Food & Drinks",
    subcategory: "biryani",
    subcategoryLabel: "Biryani",
    area: "Main Bazaar",
    lat: 33.5891,
    lng: 71.4396,
    image: heroBiryani,
    whatsapp: "+923001234577",
    phone: "+923001234577",
    tagline: "Chicken biryani plates from Rs. 250.",
  },
  {
    slug: "royal-furniture-mall",
    name: "Royal Furniture Mall",
    category: "shopping",
    categoryLabel: "Shopping",
    subcategory: "furniture",
    subcategoryLabel: "Furniture Stores",
    area: "Bannu Road",
    lat: 33.5772,
    lng: 71.4338,
    image: shopFurniture,
    whatsapp: "+923001234578",
    phone: "+923001234578",
    tagline: "Wooden sofas, office chairs, dining.",
  },
  {
    slug: "mobile-hub",
    name: "Mobile Hub",
    category: "shopping",
    categoryLabel: "Shopping",
    subcategory: "mobile",
    subcategoryLabel: "Mobile Shops",
    area: "Cantt Bazaar",
    lat: 33.577,
    lng: 71.4461,
    image: shopMobile,
    whatsapp: "+923001234579",
    phone: "+923001234579",
    tagline: "iPhone, Samsung & accessories.",
  },
  {
    slug: "afghan-tikka-house",
    name: "Afghan Tikka House",
    category: "food-drinks",
    categoryLabel: "Food & Drinks",
    subcategory: "bbq",
    subcategoryLabel: "BBQ",
    area: "Pindi Road",
    lat: 33.5917,
    lng: 71.455,
    image: shopRestaurant,
    whatsapp: "+923001234580",
    phone: "+923001234580",
    tagline: "Charcoal tikka, kababs and naan.",
  },
  {
    slug: "sabzi-mandi-stall",
    name: "Sabzi Mandi Stall #14",
    category: "daily-needs",
    categoryLabel: "Daily Needs",
    subcategory: "vegetable-shops",
    subcategoryLabel: "Vegetable Shops",
    area: "Main Bazaar",
    lat: 33.5856,
    lng: 71.4444,
    image: heroBazaar,
    whatsapp: "+923001234581",
    phone: "+923001234581",
    tagline: "Fresh vegetables at wholesale rates.",
  },
  {
    slug: "faisal-movers-office",
    name: "Faisal Movers Office",
    category: "travel",
    categoryLabel: "Travel",
    subcategory: "bus-tickets",
    subcategoryLabel: "Bus Tickets",
    area: "KDA Chowk",
    lat: 33.5984,
    lng: 71.4548,
    image: shopBus,
    whatsapp: "+923001234582",
    phone: "+923001234582",
    tagline: "Bookings for Islamabad, Lahore, Karachi.",
  },
];
