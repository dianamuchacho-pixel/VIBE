import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { generateSeedData } from "./seed_data";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Initialize seed data if DB is empty
  const existingEvents = await storage.getEvents();
  if (existingEvents.length === 0) {
    console.log("Seeding database with initial events...");
    const seedEvents = generateSeedData();
    await storage.seedEvents(seedEvents);
    console.log(`Seeded ${seedEvents.length} events.`);
  }

  app.get(api.events.list.path, async (req, res) => {
    try {
      // Manual parsing of query params to match the optional schema or pass to storage
      // Zod parse is good but for GET query params express passes strings, so we might need coercion
      const filters = {
        search: req.query.search as string,
        context: req.query.context as string,
        timeOfDay: req.query.timeOfDay as string,
        style: req.query.style as string,
        districts: req.query.districts as string,
        priceCategory: req.query.priceCategory as string,
        features: req.query.features as string,
        minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
        maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
      };

      const events = await storage.getEvents(filters);
      res.json(events);
    } catch (err) {
      console.error("Error listing events:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  app.get(api.events.get.path, async (req, res) => {
    const event = await storage.getEvent(Number(req.params.id));
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  });

  app.post(api.events.create.path, async (req, res) => {
    try {
      const input = api.events.create.input.parse(req.body);
      const event = await storage.createEvent(input);
      res.status(201).json(event);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  return httpServer;
}
