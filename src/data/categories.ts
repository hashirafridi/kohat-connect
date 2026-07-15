// Hierarchical business categorisation: Main category → Sub category.
// Both English label + Urdu.

export type SubCategory = {
  key: string;
  label: string;
  urdu: string;
};

export type MainCategory = {
  key: string;
  label: string;
  urdu: string;
  sub: SubCategory[];
};

export const mainCategories: MainCategory[] = [
  {
    key: "food-drinks",
    label: "Food & Drinks",
    urdu: "کھانے پینے",
    sub: [
      { key: "restaurants", label: "Restaurants", urdu: "ریسٹورنٹس" },
      { key: "biryani", label: "Biryani", urdu: "بریانی" },
      { key: "cafes", label: "Cafés", urdu: "کیفے" },
      { key: "bakeries", label: "Bakeries", urdu: "بیکری" },
      { key: "sweet-shops", label: "Sweet Shops", urdu: "مٹھائی کی دکان" },
      { key: "juice-shops", label: "Juice Shops", urdu: "جوس شاپ" },
      { key: "ice-cream", label: "Ice Cream", urdu: "آئس کریم" },
      { key: "bbq", label: "BBQ", urdu: "باربی کیو" },
    ],
  },
  {
    key: "shopping",
    label: "Shopping",
    urdu: "خریداری",
    sub: [
      { key: "grocery", label: "Grocery Stores", urdu: "کریانہ سٹور" },
      { key: "clothing", label: "Clothing Stores", urdu: "کپڑوں کی دکان" },
      { key: "jewellery", label: "Jewellery Stores", urdu: "جیولری شاپ" },
      { key: "mobile", label: "Mobile Shops", urdu: "موبائل شاپ" },
      { key: "electronics", label: "Electronics Stores", urdu: "الیکٹرانکس" },
      { key: "furniture", label: "Furniture Stores", urdu: "فرنیچر" },
      { key: "shoes", label: "Shoe Stores", urdu: "جوتوں کی دکان" },
      { key: "cosmetics", label: "Cosmetics Stores", urdu: "کاسمیٹکس" },
      { key: "books", label: "Book Stores", urdu: "کتابوں کی دکان" },
      { key: "gifts", label: "Gift Shops", urdu: "گفٹ شاپ" },
      { key: "toys", label: "Toy Stores", urdu: "کھلونوں کی دکان" },
      { key: "hardware", label: "Hardware Stores", urdu: "ہارڈویئر" },
      { key: "paint", label: "Paint Stores", urdu: "پینٹ شاپ" },
      { key: "sports", label: "Sports Stores", urdu: "سپورٹس شاپ" },
      { key: "medical-stores", label: "Medical Stores", urdu: "میڈیکل سٹور" },
      { key: "pet-shops", label: "Pet Shops", urdu: "پالتو جانوروں کی دکان" },
    ],
  },
  {
    key: "vehicles",
    label: "Vehicles",
    urdu: "گاڑیاں",
    sub: [
      { key: "bikes", label: "Bikes", urdu: "موٹرسائیکل" },
      { key: "car-dealers", label: "Car Dealers", urdu: "کار ڈیلر" },
      { key: "auto-workshops", label: "Auto Workshops", urdu: "ورکشاپ" },
      { key: "auto-parts", label: "Auto Parts", urdu: "آٹو پارٹس" },
      { key: "tyre-shops", label: "Tyre Shops", urdu: "ٹائر شاپ" },
      { key: "car-wash", label: "Car Wash", urdu: "کار واش" },
    ],
  },
  {
    key: "health",
    label: "Health",
    urdu: "صحت",
    sub: [
      { key: "hospitals", label: "Hospitals", urdu: "ہسپتال" },
      { key: "clinics", label: "Clinics", urdu: "کلینک" },
      { key: "pharmacies", label: "Pharmacies", urdu: "فارمیسی" },
      { key: "dental", label: "Dental Clinics", urdu: "ڈینٹل کلینک" },
      { key: "laboratories", label: "Laboratories", urdu: "لیبارٹری" },
      { key: "eye-clinics", label: "Eye Clinics", urdu: "آئی کلینک" },
    ],
  },
  {
    key: "education",
    label: "Education",
    urdu: "تعلیم",
    sub: [
      { key: "schools", label: "Schools", urdu: "سکول" },
      { key: "colleges", label: "Colleges", urdu: "کالجز" },
      { key: "universities", label: "Universities", urdu: "یونیورسٹیز" },
      { key: "institutes", label: "Institutes", urdu: "انسٹیٹیوٹ" },
      { key: "academies", label: "Academies", urdu: "اکیڈمی" },
      { key: "tuition-centers", label: "Tuition Centers", urdu: "ٹیوشن سینٹر" },
    ],
  },
  {
    key: "financial",
    label: "Financial",
    urdu: "مالیاتی",
    sub: [
      { key: "banks", label: "Banks", urdu: "بینک" },
      { key: "atms", label: "ATMs", urdu: "اے ٹی ایم" },
      { key: "exchange", label: "Exchange Companies", urdu: "کرنسی ایکسچینج" },
      { key: "microfinance", label: "Microfinance", urdu: "مائیکروفنانس" },
    ],
  },
  {
    key: "travel",
    label: "Travel",
    urdu: "سفر",
    sub: [
      { key: "hotels", label: "Hotels", urdu: "ہوٹل" },
      { key: "guest-houses", label: "Guest Houses", urdu: "گیسٹ ہاؤس" },
      { key: "travel-agencies", label: "Travel Agencies", urdu: "ٹریول ایجنسی" },
      { key: "bus-tickets", label: "Bus Tickets", urdu: "بس ٹکٹ" },
      { key: "car-rentals", label: "Car Rentals", urdu: "کار رینٹل" },
    ],
  },
  {
    key: "beauty",
    label: "Beauty",
    urdu: "بیوٹی",
    sub: [
      { key: "salons", label: "Salons", urdu: "سیلون" },
      { key: "barber-shops", label: "Barber Shops", urdu: "حجام" },
      { key: "beauty-parlours", label: "Beauty Parlours", urdu: "بیوٹی پارلر" },
      { key: "spa", label: "Spa", urdu: "سپا" },
    ],
  },
  {
    key: "home-services",
    label: "Home & Services",
    urdu: "گھر و خدمات",
    sub: [
      { key: "electricians", label: "Electricians", urdu: "الیکٹریشن" },
      { key: "plumbers", label: "Plumbers", urdu: "پلمبر" },
      { key: "carpenters", label: "Carpenters", urdu: "بڑھئی" },
      { key: "welders", label: "Welders", urdu: "ویلڈر" },
      { key: "tailors", label: "Tailors", urdu: "درزی" },
      { key: "dry-cleaners", label: "Dry Cleaners", urdu: "ڈرائی کلینرز" },
      { key: "laundry", label: "Laundry", urdu: "لانڈری" },
      { key: "photographers", label: "Photographers", urdu: "فوٹوگرافر" },
      { key: "printers", label: "Printers", urdu: "پرنٹنگ" },
      { key: "courier", label: "Courier Services", urdu: "کورئیر" },
      { key: "internet-providers", label: "Internet Providers", urdu: "انٹرنیٹ سروس" },
      { key: "security", label: "Security Services", urdu: "سیکیورٹی سروس" },
    ],
  },
  {
    key: "daily-needs",
    label: "Daily Needs",
    urdu: "روزمرہ ضروریات",
    sub: [
      { key: "stalls", label: "Stalls", urdu: "ٹھیلے" },
      { key: "fruit-shops", label: "Fruit Shops", urdu: "فروٹ شاپ" },
      { key: "vegetable-shops", label: "Vegetable Shops", urdu: "سبزی کی دکان" },
      { key: "meat-shops", label: "Meat Shops", urdu: "قصائی" },
      { key: "fish-shops", label: "Fish Shops", urdu: "مچھلی کی دکان" },
      { key: "chicken-shops", label: "Chicken Shops", urdu: "مرغی کی دکان" },
    ],
  },
  {
    key: "religious",
    label: "Religious",
    urdu: "مذہبی",
    sub: [
      { key: "mosques", label: "Mosques", urdu: "مساجد" },
      { key: "madrasas", label: "Madrasas", urdu: "مدارس" },
    ],
  },
  {
    key: "government",
    label: "Government",
    urdu: "سرکاری",
    sub: [
      { key: "gov-offices", label: "Government Offices", urdu: "سرکاری دفاتر" },
      { key: "police-stations", label: "Police Stations", urdu: "پولیس اسٹیشن" },
      { key: "post-offices", label: "Post Offices", urdu: "ڈاک خانہ" },
    ],
  },
  {
    key: "entertainment",
    label: "Entertainment",
    urdu: "تفریح",
    sub: [
      { key: "parks", label: "Parks", urdu: "پارک" },
      { key: "cinemas", label: "Cinemas", urdu: "سینما" },
      { key: "gyms", label: "Gyms", urdu: "جم" },
      { key: "event-halls", label: "Event Halls", urdu: "شادی ہال" },
    ],
  },
];

/** Flat list of every sub-category, for lookups. */
export const allSubCategories: SubCategory[] = mainCategories.flatMap((m) => m.sub);

export function findMainCategory(key: string): MainCategory | undefined {
  return mainCategories.find((m) => m.key === key);
}

export function findSubCategory(key: string):
  | { main: MainCategory; sub: SubCategory }
  | undefined {
  for (const m of mainCategories) {
    const sub = m.sub.find((s) => s.key === key);
    if (sub) return { main: m, sub };
  }
  return undefined;
}

export function subLabel(key: string): string {
  return allSubCategories.find((s) => s.key === key)?.label ?? key;
}

export function mainLabel(key: string): string {
  return mainCategories.find((m) => m.key === key)?.label ?? key;
}

/** Product-facing branding: what we call a listing. */
export const BUSINESS_TERM = {
  singular: "Business",
  plural: "Businesses",
  urdu: "کاروبار",
};
