import { z } from 'zod';
import { insertEventSchema, events } from './schema';

// ============================================
// SHARED ERROR SCHEMAS
// ============================================
export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

// ============================================
// API CONTRACT
// ============================================
export const api = {
  events: {
    list: {
      method: 'GET' as const,
      path: '/api/events',
      input: z.object({
        search: z.string().optional(),
        context: z.string().optional(), // Comma separated
        timeOfDay: z.string().optional(),
        style: z.string().optional(),
        districts: z.string().optional(),
        priceCategory: z.string().optional(),
        features: z.string().optional(),
        minPrice: z.coerce.number().optional(),
        maxPrice: z.coerce.number().optional(),
      }).optional(),
      responses: {
        200: z.array(z.custom<typeof events.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/events/:id',
      responses: {
        200: z.custom<typeof events.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    // Useful for seeding or admin, though user didn't explicitly ask for admin panel
    create: {
      method: 'POST' as const,
      path: '/api/events',
      input: insertEventSchema,
      responses: {
        201: z.custom<typeof events.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
};

// ============================================
// HELPER FUNCTIONS
// ============================================
export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

// ============================================
// TYPES
// ============================================
export type EventInput = z.infer<typeof api.events.create.input>;
export type EventResponse = z.infer<typeof api.events.create.responses[201]>;
export type EventsListResponse = z.infer<typeof api.events.list.responses[200]>;
