import { db } from "./db";
import { events, type Event, type InsertEvent } from "@shared/schema";
import { eq, like, and, gte, lte, or, ilike, arrayContains, sql } from "drizzle-orm";

export interface IStorage {
  getEvents(filters?: any): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  seedEvents(events: InsertEvent[]): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getEvents(filters: any = {}): Promise<Event[]> {
    const conditions = [];

    if (filters.search) {
      conditions.push(
        or(
          ilike(events.title, `%${filters.search}%`),
          ilike(events.longDescription, `%${filters.search}%`),
          ilike(events.mainCategory, `%${filters.search}%`)
        )
      );
    }

    if (filters.context) {
       const contexts = filters.context.split(',');
       const contextConditions = contexts.map((c: string) => {
         const val = c.toLowerCase().trim();
         return or(
           ilike(events.idealGroup, `%${val}%`),
           arrayContains(events.tags, [val])
         );
       });
       conditions.push(or(...contextConditions));
    }

    if (filters.style) {
      const styles = filters.style.split(',');
      const styleConditions = styles.map((s: string) => {
        const val = s.toLowerCase();
        let mapped = val;
        if (val === 'gastro') mapped = 'gastronómico';
        if (val === 'relax') mapped = 'relajado';
        if (val === 'fiesta') mapped = 'festivo';
        
        return or(
          ilike(events.vibe, `%${mapped}%`),
          arrayContains(events.tags, [mapped]),
          arrayContains(events.tags, [val])
        );
      });
      conditions.push(or(...styleConditions));
    }

    if (filters.districts) {
      const districtsList = filters.districts.split(',');
      conditions.push(or(...districtsList.map((d: string) => ilike(events.district, d.trim()))));
    }

    if (filters.timeOfDay) {
      const times = filters.timeOfDay.split(',');
      conditions.push(or(...times.map((t: string) => arrayContains(events.tags, [t.toLowerCase().trim()]))));
    }

    if (filters.maxPrice !== undefined) {
      conditions.push(lte(events.priceBase, Number(filters.maxPrice)));
    }

    if (filters.priceCategory) {
       const cats = filters.priceCategory.split(',');
       const priceConditions = cats.map((c: string) => {
         const val = c.toLowerCase().trim();
         if (val === 'gratis') return lte(events.priceBase, 0);
         if (val === 'economico') return and(gte(events.priceBase, 1), lte(events.priceBase, 40));
         if (val === 'medio') return and(gte(events.priceBase, 41), lte(events.priceBase, 100));
         if (val === 'premium') return gte(events.priceBase, 101);
         return eq(events.priceRange, val);
       });
       conditions.push(or(...priceConditions));
    }

    if (filters.features) {
      const feats = filters.features.split(',');
      for (const feat of feats) {
         if (feat === 'pet_friendly') conditions.push(eq(events.petFriendly, true));
         if (feat === 'accessible') conditions.push(eq(events.accessible, true));
         if (feat === 'requires_reservation') conditions.push(eq(events.reservationRequired, true));
         if (feat === 'interior') conditions.push(eq(events.indoorOutdoor, 'interior'));
         if (feat === 'exterior') conditions.push(eq(events.indoorOutdoor, 'exterior'));
         // Add generic tag search for other features
         conditions.push(arrayContains(events.tags, [feat]));
      }
    }

    return await db.select().from(events).where(and(...conditions));
  }

  async getEvent(id: number): Promise<Event | undefined> {
    const [event] = await db.select().from(events).where(eq(events.id, id));
    return event;
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const [event] = await db.insert(events).values(insertEvent).returning();
    return event;
  }
  
  async seedEvents(newEvents: InsertEvent[]): Promise<void> {
    if (newEvents.length === 0) return;
    await db.insert(events).values(newEvents);
  }
}

export const storage = new DatabaseStorage();
