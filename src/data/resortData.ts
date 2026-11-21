export const RESORT_CONFIG = {
  brandName: 'Aarambh Farmhouse',
  fullName: 'Aarambh Farmhouse Staycation & Resort',
  locationShort: 'Morbe, Panvel, Maharashtra',
  locationFull: 'Aarambh Farmhouse Staycation & Resort, Morbe, Panvel, Maharashtra, India',
  // Update these contact constants with the official resort WhatsApp & phone numbers
  whatsappNumber: '919820000000',
  phoneDisplay: '+91 98200 00000',
  phoneHref: 'tel:+919820000000',
  instagramHandle: '@aarambhfarmstaycationresort',
  instagramUrl: 'https://www.instagram.com/aarambhfarmstaycationresort/',
  defaultDirectionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=Aarambh+Farmhouse+Staycation+%26+Resort%2C+Morbe%2C+Panvel%2C+Maharashtra%2C+India',
  defaultMapsSearchUrl:
    'https://www.google.com/maps/search/?api=1&query=Aarambh+Farmhouse+Staycation+%26+Resort%2C+Morbe%2C+Panvel%2C+Maharashtra%2C+India',
} as const;

export const RESORT_IMAGES = {
  sunsetPoolVilla: '/assets/aistudio/Luxury_Villa_Pool_at_Sunset_7b7d8d4e.png',
  goldenHourAerial: '/assets/aistudio/Tropical_Resort_Pool_at_Golden_Hour_530520c2.png',
  poolCourtyard: '/assets/aistudio/Sunlit_Tropical_Resort_Pool_Courtyard_00499539.png',
  guesthousePool: '/assets/aistudio/Modern_Tropical_Guesthouse_Pool_Retreat_35715f7d.png',
  gazeboPavilion: '/assets/aistudio/Vibrant_Poolside_Pavilion_Garden_4e3b1ec7.png',
  acBedroom: '/assets/aistudio/Modern_Peach-Toned_Marble_Bedroom_aff6e1bb.png',
  enSuiteBath: '/assets/aistudio/Modern_Marble_Bathroom_with_Blue_Bucket_d3d5e2cc.png',
  brandLogoLight: '/src/assets/images/aarambh_logo_cream_1795252190777.jpg',
  brandLogoDark: '/src/assets/images/aarambh_logo_dark_1795252188194.jpg',
  instagramQr: '/assets/aistudio/IMG_20261029_174250_814_7df2c361.png',
} as const;

export interface FacilityItem {
  id: string;
  title: string;
  description: string;
  iconName:
    | 'waves'
    | 'wind'
    | 'coffee'
    | 'utensils'
    | 'tent'
    | 'music'
    | 'trees'
    | 'sparkles'
    | 'wifi'
    | 'flame'
    | 'car'
    | 'users';
}

export const FACILITIES: FacilityItem[] = [
  {
    id: 'swimming-pool',
    title: 'Big Swimming Pool',
    description: 'Enjoy refreshing poolside moments with dedicated shallow and deep zones.',
    iconName: 'waves',
  },
  {
    id: 'ac-rooms',
    title: '4 AC Rooms',
    description:
      '4 comfortable AC rooms with double beds, clean attached bathrooms, and extra beds provided.',
    iconName: 'wind',
  },
  {
    id: 'free-breakfast',
    title: 'Free Breakfast',
    description: 'Start your morning surrounded by nature with a freshly prepared complimentary breakfast.',
    iconName: 'coffee',
  },
  {
    id: 'unlimited-food',
    title: 'Unlimited Food',
    description: 'Savour generous, homestyle unlimited meals served warm throughout your stay.',
    iconName: 'utensils',
  },
  {
    id: 'beautiful-gazebo',
    title: 'Beautiful Gazebo',
    description: 'A scenic two-level poolside pavilion designed for unhurried conversations and sunset views.',
    iconName: 'tent',
  },
  {
    id: 'music-system',
    title: 'Music System',
    description: 'Set the mood for celebrations, poolside evenings, and joyful group gatherings.',
    iconName: 'music',
  },
  {
    id: 'beautiful-garden',
    title: 'Beautiful Garden',
    description: 'Experience lush palms, flowering greens, and peaceful Sahyadri hillside air.',
    iconName: 'trees',
  },
  {
    id: 'special-lawn-area',
    title: 'Special Lawn Area',
    description: 'A manicured green lawn perfect for outdoor games, family gatherings, and celebrations.',
    iconName: 'sparkles',
  },
  {
    id: 'free-wifi',
    title: 'Free Wi-Fi',
    description: 'Stay effortlessly connected whenever needed while unwinding away from city rush.',
    iconName: 'wifi',
  },
  {
    id: 'bbq-on-request',
    title: 'BBQ on Request',
    description: 'Gather around a live evening grill for a memorable poolside barbecue experience.',
    iconName: 'flame',
  },
  {
    id: 'free-parking',
    title: 'Free Parking',
    description: 'Spacious, convenient on-site parking right inside the resort grounds for all guests.',
    iconName: 'car',
  },
  {
    id: 'spacious-dining-area',
    title: 'Spacious Dining Area',
    description: 'Share unhurried meals together under our open-air veranda dining pavilion.',
    iconName: 'users',
  },
];

export interface ExperienceItem {
  id: string;
  index: string;
  title: string;
  bookingType: string;
  description: string;
  image: string;
  imageAlt: string;
  objectPosition?: string;
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'family-staycations',
    index: '01',
    title: 'Family Staycations',
    bookingType: 'Family Staycation',
    description:
      'Relax across 4 AC rooms with double beds, clean attached bathrooms, extra beds on request, a safe poolside, and homestyle meals.',
    image: RESORT_IMAGES.goldenHourAerial,
    imageAlt: 'Aarambh Farmhouse swimming pool, lawn, and cottages framed by hills at golden hour',
    objectPosition: 'center center',
  },
  {
    id: 'birthday-celebrations',
    index: '02',
    title: 'Birthday Celebrations',
    bookingType: 'Birthday Celebration',
    description:
      'Host up to 70–80 guests effortlessly in our massive AC hall, two-story gazebo, and manicured party lawn with music and dining.',
    image: RESORT_IMAGES.gazeboPavilion,
    imageAlt: 'Two-level poolside gazebo pavilion at Aarambh Farmhouse illuminated at dusk',
    objectPosition: 'center 35%',
  },
  {
    id: 'friends-get-togethers',
    index: '03',
    title: "Friends' Get-Togethers",
    bookingType: "Friends' Get-Together",
    description:
      'Trade crowded cafes for private pool sessions, barbecue nights, spacious group stays with extra beds, and late-night conversations.',
    image: RESORT_IMAGES.guesthousePool,
    imageAlt: 'Spacious swimming pool and multi-room villa courtyard for group reunions',
    objectPosition: 'center center',
  },
  {
    id: 'corporate-outings',
    index: '04',
    title: 'Corporate Outings',
    bookingType: 'Corporate Outing',
    description:
      'Bring teams of up to 70–80 people to our massive AC hall near Panvel & Navi Mumbai with Wi-Fi, lawn activities, and unlimited dining.',
    image: RESORT_IMAGES.poolCourtyard,
    imageAlt: 'Sunlit tropical resort courtyard and two-story accommodation block',
    objectPosition: 'center center',
  },
  {
    id: 'weekend-getaways',
    index: '05',
    title: 'Weekend Getaways',
    bookingType: 'Weekend Getaway',
    description:
      'Just a scenic drive from Mumbai and Navi Mumbai, wake up to Sahyadri hill views, fresh morning breeze, and complete tranquillity.',
    image: RESORT_IMAGES.sunsetPoolVilla,
    imageAlt: 'Panoramic sunset over Sahyadri hills and illuminated swimming pool at Aarambh',
    objectPosition: 'center center',
  },
  {
    id: 'poolside-relaxation',
    index: '06',
    title: 'Poolside Relaxation',
    bookingType: 'Poolside Relaxation',
    description:
      'Slow down by crystal-clear blue waters, unwind in the shaded pavilion, and let warm evening lights melt away weekday fatigue.',
    image: RESORT_IMAGES.acBedroom,
    imageAlt: 'Air-conditioned bedroom interior with clean modern finishes at Aarambh Farmhouse',
    objectPosition: 'center center',
  },
];

export type GalleryCategory =
  | 'All'
  | 'Swimming Pool'
  | 'AC Rooms'
  | 'Gazebo & Lawn'
  | 'Resort Exterior';

export interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  caption: string;
  category: Exclude<GalleryCategory, 'All'>;
  spanClass: string;
}

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'sunset-villa-panorama',
    src: RESORT_IMAGES.sunsetPoolVilla,
    title: 'Golden Sunset Over the Pool & Hills',
    caption:
      'Twilight reflections across our large illuminated swimming pool with the Sahyadri hills, lush lawn, and covered dining veranda.',
    category: 'Resort Exterior',
    spanClass: 'md:col-span-2 md:row-span-2',
  },
  {
    id: 'two-level-gazebo',
    src: RESORT_IMAGES.gazeboPavilion,
    title: 'Two-Level Poolside Gazebo',
    caption:
      'An elevated open-air gazebo right beside the pool deck—ideal for evening tea, birthday cake cuttings, and relaxed views.',
    category: 'Gazebo & Lawn',
    spanClass: 'md:col-span-1 md:row-span-2',
  },
  {
    id: 'sunlit-pool-courtyard',
    src: RESORT_IMAGES.poolCourtyard,
    title: 'Big Swimming Pool & Courtyard',
    caption:
      'Crystal-clear mosaic-tiled swimming pool bordered by tropical palms, warm pathway lamps, and poolside veranda rooms.',
    category: 'Swimming Pool',
    spanClass: 'md:col-span-2 md:row-span-1',
  },
  {
    id: 'ac-bedroom-suite',
    src: RESORT_IMAGES.acBedroom,
    title: '4 AC Rooms with Double Beds',
    caption:
      'Four spacious, well-maintained AC rooms each featuring a comfortable double bed, clean attached bathroom, and extra beds provided for larger groups.',
    category: 'AC Rooms',
    spanClass: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 'golden-hour-aerial',
    src: RESORT_IMAGES.goldenHourAerial,
    title: 'Garden Lawn, Dining Veranda & Mountain Backdrop',
    caption:
      'Lush green special lawn area, open-air dining space, private parking, and panoramic views of the hills around Morbe, Panvel.',
    category: 'Gazebo & Lawn',
    spanClass: 'md:col-span-2 md:row-span-1',
  },
  {
    id: 'guesthouse-retreat',
    src: RESORT_IMAGES.guesthousePool,
    title: 'Poolside Villas & Shallow Kids Section',
    caption:
      'Our spacious two-story guesthouse block overlooking the divided family-friendly pool and landscaped stone deck.',
    category: 'Swimming Pool',
    spanClass: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 'modern-ensuite-bath',
    src: RESORT_IMAGES.enSuiteBath,
    title: 'Modern En-Suite Washroom',
    caption:
      'Spotless marble-finish attached washrooms equipped with a rain shower, warm ceiling accents, and modern sanitary fixtures.',
    category: 'AC Rooms',
    spanClass: 'md:col-span-1 md:row-span-1',
  },
];

export const DINING_HIGHLIGHTS = [
  {
    number: '01',
    title: 'Complimentary Breakfast',
    description:
      'Wake up to fresh, piping-hot Indian breakfast favorites and aromatic chai or coffee included with every overnight stay.',
  },
  {
    number: '02',
    title: 'Unlimited Food',
    description:
      'Enjoy generous, freshly cooked unlimited meals prepared with homestyle warmth so families and groups never have to worry about portions.',
  },
  {
    number: '03',
    title: 'Spacious Dining Area',
    description:
      'Dine comfortably together beneath our breezy covered courtyard veranda overlooking the lawn and illuminated swimming pool.',
  },
  {
    number: '04',
    title: 'BBQ on Request',
    description:
      'Elevate your evening celebrations with live charcoal-grilled veg and non-veg barbecue platters arranged freshly on prior request.',
  },
] as const;

export const BOOKING_OCCASIONS = [
  'Family Staycation',
  'Weekend Getaway',
  'Birthday Celebration',
  "Friends' Get-Together",
  'Corporate Outing',
  'Poolside Relaxation',
  'Couple Retreat',
  'Special Event / Celebration',
] as const;

export interface BookingFormValues {
  fullName: string;
  mobileNumber: string;
  checkInDate: string;
  checkOutDate: string;
  guests: string;
  occasion: string;
  message: string;
}

export function buildWhatsAppEnquiryMessage(values: BookingFormValues): string {
  const lines = [
    `Hello ${RESORT_CONFIG.fullName} Team,`,
    `I would like to enquire about booking a stay:`,
    ``,
    `• Full Name: ${values.fullName.trim()}`,
    `• Mobile Number: ${values.mobileNumber.trim()}`,
    `• Check-in Date: ${values.checkInDate || 'Flexible'}`,
    `• Check-out Date: ${values.checkOutDate || 'Flexible'}`,
    `• Number of Guests: ${values.guests || 'To be confirmed'}`,
    `• Occasion / Booking Type: ${values.occasion}`,
  ];

  if (values.message.trim()) {
    lines.push(`• Additional Notes: ${values.message.trim()}`);
  }

  lines.push(``, `Please share availability and package details. Thank you!`);
  return lines.join('\n');
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${RESORT_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function getQuickWhatsAppUrl(): string {
  return buildWhatsAppUrl(
    `Hello ${RESORT_CONFIG.fullName}, I visited your website and would like to check availability and tariff details for a stay at Morbe, Panvel.`
  );
}
