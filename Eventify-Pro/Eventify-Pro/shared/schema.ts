import { pgTable, text, serial, integer, boolean, timestamp, jsonb, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  longDescription: text("long_description").notNull(),
  mainCategory: text("main_category").notNull(),
  secondaryCategory: text("secondary_category"),
  
  // Tags and Categorization
  tags: text("tags").array(), // ["noche_pareja", "romántico", etc]
  
  // Timing
  dateStart: text("date_start"), // Storing as ISO string for simplicity in filtering or actual date
  dateEnd: text("date_end"),
  timeStart: text("time_start"), // "21:00"
  timeEnd: text("time_end"),     // "00:00"
  
  // Location
  locationExact: text("location_exact").notNull(),
  district: text("district").notNull(),
  neighborhood: text("neighborhood"),
  lat: decimal("lat"),
  lng: decimal("lng"),
  
  // Pricing
  priceBase: integer("price_base").notNull(), // In cents or euros? JSON says 85. Let's assume Euros for simplicity or handle as number.
  currency: text("currency").default("EUR"),
  priceRange: text("price_range"), // "gratis", "economico", "medio", "premium", "lujo"
  
  // Details
  includes: text("includes").array(),
  durationHours: decimal("duration_hours"),
  
  // Context/Filters
  idealGroup: text("ideal_group"), // "pareja", "familia", "amigos", etc
  minGroup: integer("min_group"),
  maxGroup: integer("max_group"),
  minAge: integer("min_age"),
  
  vibe: text("vibe"), // "alegre", "relajado", "cultural"
  intensity: text("intensity"),
  indoorOutdoor: text("indoor_outdoor"), // "interior", "exterior", "mixto"
  
  // Features (Booleans)
  petFriendly: boolean("pet_friendly").default(false),
  accessible: boolean("accessible").default(false),
  parking: boolean("parking_nearby").default(false),
  reservationRequired: boolean("requires_reservation").default(false),
  
  // Transport & Media
  metroNearby: text("metro_nearby").array(),
  images: text("images").array(),
  
  // Social Proof & Metadata
  rating: decimal("rating"),
  totalReviews: integer("total_reviews").default(0),
  reviews: jsonb("reviews"), // Array of review objects
  
  // Organizer Info
  organizer: text("organizer"),
  contactPhone: text("contact_phone"),
  contactEmail: text("contact_email"),
  website: text("website"),
  
  // Availability
  totalSpots: integer("total_spots"),
  availableSpots: integer("available_spots"),
  
  // System
  isTrending: boolean("is_trending").default(false),
  trendingScore: integer("trending_score").default(0),
  saveCount: integer("save_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// === SCHEMAS ===
export const insertEventSchema = createInsertSchema(events).omit({ id: true, createdAt: true });

// === TYPES ===
export type Event = typeof events.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;

// === API CONTRACT TYPES ===
// Filter Parameters
export interface FilterParams {
  search?: string;
  // Section A: Context
  context?: string[]; // social context keys
  // Section B: Moment
  timeOfDay?: string[];
  // Section C: Style
  style?: string[];
  // Section D: Location
  districts?: string[];
  // Section E: Budget
  minPrice?: number;
  maxPrice?: number;
  priceCategory?: string[]; // "gratis", "economico", etc.
  // Section F: Features
  features?: string[]; // "interior", "exterior", "pet_friendly", etc.
}

export type EventResponse = Event;
