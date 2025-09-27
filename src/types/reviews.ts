// Shared types for reviews data

export interface Rating {
  scale: number;
  value: number;
  label?: string;
}

export interface NormalizedReview {
  id: string;
  platform: string;
  title: string;
  reviewer: string;
  dateText: string;
  dateISO: string;
  nights?: number;
  rating?: Rating;
  review: string;
  tripNotes?: string;
  location?: string;
  stayedWith?: string;
  tripType?: string;
}
