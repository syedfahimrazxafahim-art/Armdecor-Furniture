export interface FurnitureItem {
  id: string;
  title: string;
  category: FurnitureCategory;
  imageUrl: string;
  description: string;
  aspectRatio: 'landscape' | 'portrait' | 'square';
  featured?: boolean;
  tags?: string[];
  dimensions?: string;
  materialNotes?: string;
}

export type FurnitureCategory =
  | 'All Pieces'
  | 'Living Room'
  | 'Bedroom'
  | 'Dining Room'
  | 'Sofas'
  | 'Tables'
  | 'Chairs'
  | 'Custom Furniture';

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
  serviceType: string;
  rating: number;
}

export interface BusinessInfo {
  name: string;
  tagline: string;
  type: string;
  city: string;
  state: string;
  locationString: string;
  primaryPhone: string;
  primaryPhoneFormatted: string;
  secondaryPhone: string;
  secondaryPhoneFormatted: string;
  email: string;
  facebookUrl: string;
  facebookHandle: string;
  instagramUrl: string;
  instagramHandle: string;
  heroBackgroundUrl: string;
  logoUrl: string;
}

export interface InquiryFormData {
  name: string;
  phone: string;
  email: string;
  furnitureNeeded: string;
  projectDetails: string;
}
