import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type EventInput } from "@shared/routes";
import { z } from "zod";

// Valid keys for filter params based on schema
export interface FilterState {
  search?: string;
  context: string[];
  timeOfDay: string[];
  style: string[];
  districts: string[];
  priceCategory: string[];
  features: string[];
  minPrice?: number;
  maxPrice?: number;
}

export function useEvents(filters?: FilterState) {
  // Convert array filters to comma-separated strings for the API
  const queryParams: Record<string, string | number> = {};
  
  if (filters) {
    if (filters.search) queryParams.search = filters.search;
    if (filters.context.length) queryParams.context = filters.context.join(',');
    if (filters.timeOfDay.length) queryParams.timeOfDay = filters.timeOfDay.join(',');
    if (filters.style.length) queryParams.style = filters.style.join(',');
    if (filters.districts.length) queryParams.districts = filters.districts.join(',');
    if (filters.priceCategory.length) queryParams.priceCategory = filters.priceCategory.join(',');
    if (filters.features.length) queryParams.features = filters.features.join(',');
    if (filters.minPrice !== undefined) queryParams.minPrice = filters.minPrice;
    if (filters.maxPrice !== undefined) queryParams.maxPrice = filters.maxPrice;
  }

  const queryString = new URLSearchParams(
    queryParams as Record<string, string>
  ).toString();

  const queryKey = [api.events.list.path, filters];

  return useQuery({
    queryKey,
    queryFn: async () => {
      const url = `${api.events.list.path}?${queryString}`;
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch events");
      return api.events.list.responses[200].parse(await res.json());
    },
  });
}

export function useEvent(id: number) {
  return useQuery({
    queryKey: [api.events.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.events.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch event");
      return api.events.get.responses[200].parse(await res.json());
    },
  });
}

export function useCreateEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: EventInput) => {
      const res = await fetch(api.events.create.path, {
        method: api.events.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.events.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to create event");
      }
      return api.events.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.events.list.path] });
    },
  });
}
