// Placeholder data for the home page. Later this will be sourced from the admin/Cloud DB.
import heroBazaar from "@/assets/hero-bazaar.jpg";
import heroBiryani from "@/assets/hero-biryani.jpg";
import heroBikes from "@/assets/hero-bikes.jpg";
import shopFurniture from "@/assets/shop-furniture.jpg";
import shopCafe from "@/assets/shop-cafe.jpg";
import shopRestaurant from "@/assets/shop-restaurant.jpg";
import shopMobile from "@/assets/shop-mobile.jpg";
import shopFabric from "@/assets/shop-fabric.jpg";
import shopBus from "@/assets/shop-bus.jpg";

export type Category = {
  key: string;
  label: string;
  urdu: string;
};

export type FeaturedShop = {
  slug: string;
  name: string;
  category: string;
  area: string;
  image: string;
  whatsapp: string;
  phone: string;
};

export const heroImages = {
  main: heroBazaar,
  side1: heroBiryani,
  side2: heroBikes,
};

export const tagline = {
  english: "Discover Shops & Restaurants in Kohat",
  urdu: "کوہاٹ کے بازار، ایک جگہ پر",
  sub: "The complete directory of every local business — from biryani stalls to bike mechanics.",
};

export const categories: Category[] = [
  { key: "restaurants", label: "Restaurants", urdu: "ریسٹورنٹس" },
  { key: "biryani", label: "Biryani", urdu: "بریانی" },
  { key: "cafes", label: "Cafés", urdu: "کیفے" },
  { key: "furniture", label: "Furniture", urdu: "فرنیچر" },
  { key: "bikes", label: "Bikes", urdu: "موٹرسائیکل" },
  { key: "mobile", label: "Mobile Shops", urdu: "موبائل" },
  { key: "stalls", label: "Stalls", urdu: "ٹھیلے" },
  { key: "bus", label: "Bus Tickets", urdu: "بس ٹکٹ" },
];

export const featuredShops: FeaturedShop[] = [
  {
    slug: "shahi-biryani-house",
    name: "Shahi Biryani House",
    category: "Biryani",
    area: "Bannu Road",
    image: heroBiryani,
    whatsapp: "+923001234567",
    phone: "+923001234567",
  },
  {
    slug: "khyber-motors",
    name: "Khyber Motors",
    category: "Bikes",
    area: "KDA Chowk",
    image: heroBikes,
    whatsapp: "+923001234568",
    phone: "+923001234568",
  },
  {
    slug: "al-madina-furniture",
    name: "Al-Madina Furniture",
    category: "Furniture",
    area: "Pindi Road",
    image: shopFurniture,
    whatsapp: "+923001234569",
    phone: "+923001234569",
  },
  {
    slug: "chai-adda",
    name: "Chai Adda",
    category: "Cafés",
    area: "Cantt Bazaar",
    image: shopCafe,
    whatsapp: "+923001234570",
    phone: "+923001234570",
  },
  {
    slug: "peshawar-karahi",
    name: "Peshawar Karahi Corner",
    category: "Restaurants",
    area: "Hangu Road",
    image: shopRestaurant,
    whatsapp: "+923001234571",
    phone: "+923001234571",
  },
  {
    slug: "smart-mobile-center",
    name: "Smart Mobile Center",
    category: "Mobile Shops",
    area: "Main Bazaar",
    image: shopMobile,
    whatsapp: "+923001234572",
    phone: "+923001234572",
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _also_available = [shopFabric, shopBus];

export const about = {
  headline: "Every shop in Kohat, one page away.",
  body: "A community-built directory covering more than a thousand local businesses across the city — restaurants, mechanics, tailors, cafés, mobile shops and more. Free to browse, always current.",
};

export const socials = {
  facebook: "https://facebook.com/",
  instagram: "https://instagram.com/",
  whatsapp: "https://wa.me/923000000000",
  contactEmail: "hello@kohatshops.pk",
};
