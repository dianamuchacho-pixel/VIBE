import { type InsertEvent } from "@shared/schema";

export function generateSeedData(): InsertEvent[] {
  const events: InsertEvent[] = [];

  const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
  const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
  const randomFloat = (min: number, max: number) => parseFloat((Math.random() * (max - min) + min).toFixed(1));

  const districts = ["Centro", "Malasaña", "Chueca", "Salamanca", "Retiro", "La Latina", "Lavapiés", "Chamberí", "Argüelles", "Huertas", "Las Letras", "Conde Duque", "Moncloa", "Fuera de M-30"];
  const categories = ["Gastronomía", "Cultura", "Ocio Nocturno", "Aire Libre", "Espectáculo", "Taller", "Deporte"];
  const moments = ["mañana", "tarde", "noche"];
  const vibes = ["Alegre", "Relajado", "Cultural", "Deportivo", "Romántico", "Lujoso", "Alternativo", "Gastronómico", "Musical", "Festivo"];

  // Unique image mapping to avoid repetition and ensure relevance
  const imagesByKeyword: Record<string, string[]> = {
    cena: [
      "https://images.unsplash.com/photo-1550966841-3ee3236077da?q=80&w=800",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800",
    ],
    vino: [
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b0ca3ef?q=80&w=800",
    ],
    baile: [
      "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?q=80&w=800",
      "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=800",
    ],
    museo: [
      "https://images.unsplash.com/photo-1518998053574-53fb3a4d7d11?q=80&w=800",
      "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?q=80&w=800",
    ],
    parque: [
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800",
      "https://images.unsplash.com/photo-1501854140801-50d01674aa3e?q=80&w=800",
    ],
    fiesta: [
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800",
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800",
    ],
    tapas: [
      "https://images.unsplash.com/photo-1515443961218-a5136d888be7?q=80&w=800",
      "https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=800",
    ],
    yoga: [
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800",
    ],
    concierto: [
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800",
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800",
    ],
    madrid: [
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=800",
      "https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80&w=800",
    ]
  };

  const getSpecificImage = (title: string, category: string) => {
    const lowerTitle = title.toLowerCase();
    for (const [key, urls] of Object.entries(imagesByKeyword)) {
      if (lowerTitle.includes(key)) return [pick(urls)];
    }
    // Fallback images based on category
    if (category === "Gastronomía") return [pick(imagesByKeyword.tapas)];
    if (category === "Cultura") return [pick(imagesByKeyword.museo)];
    if (category === "Ocio Nocturno" || category === "Ocio") return [pick(imagesByKeyword.fiesta)];
    return [pick(imagesByKeyword.madrid)];
  };

  // Generate 100 events
  const generateBatch = (count: number, type: string, baseTitles: string[], baseVibe: string, defaultTags: string[]) => {
    for (let i = 0; i < count; i++) {
      const baseTitle = pick(baseTitles);
      const title = baseTitle + ` ${i + 1}`;
      const category = type === "pareja" ? "Romántico" : type === "familia" ? "Familia" : type === "amigos" ? "Ocio" : pick(categories);
      
      // Extract keywords for tags
      const titleKeywords = baseTitle.toLowerCase().split(' ');
      const district = pick(districts);
      
      const priceBase = randomInt(0, 150);
      let priceRange = "medio";
      if (priceBase === 0) priceRange = "gratis";
      else if (priceBase <= 40) priceRange = "economico";
      else if (priceBase <= 100) priceRange = "medio";
      else priceRange = "premium";
      
      const defaultTags = ["madrid", "plan", category.toLowerCase(), type.toLowerCase()];
      if (type === "amigos") defaultTags.push("con_amigos");
      if (type === "pareja") defaultTags.push("con_pareja", "romantico");
      if (type === "familia") defaultTags.push("con_niños", "plan_familiar");

      events.push({
        title,
        longDescription: `Disfruta de ${title}. Un plan ideal diseñado para ofrecer la mejor experiencia en el corazón de Madrid.`,
        mainCategory: category,
        tags: [...defaultTags, ...titleKeywords, district.toLowerCase()],
        dateStart: "2024-01-01",
        timeStart: pick(["10:00", "12:00", "18:00", "21:00"]),
        timeEnd: "23:00",
        locationExact: `Calle de ${pick(["Alcalá", "Velázquez", "Atocha", "Mayor"])}, ${randomInt(1, 150)}`,
        district: district,
        lat: (40.4168 + (Math.random() - 0.5) * 0.1).toString(),
        lng: (-3.7038 + (Math.random() - 0.5) * 0.1).toString(),
        priceBase,
        priceRange,
        idealGroup: type,
        minGroup: type === "pareja" ? 2 : 1,
        maxGroup: type === "pareja" ? 2 : 10,
        vibe: baseVibe,
        indoorOutdoor: pick(["interior", "exterior"]),
        images: getSpecificImage(title, category),
        rating: randomFloat(4.0, 5.0).toString(),
        totalReviews: randomInt(10, 500),
        reservationRequired: Math.random() > 0.5,
        metroNearby: [pick(["Sol", "Gran Vía", "Retiro", "Atocha"])],
        includes: ["Acceso", "Experiencia"],
      });
    }
  };

  generateBatch(25, "pareja", ["Cena romántica", "Cata de vinos", "Paseo al atardecer", "Jazz y cena"], "Romántico", ["mañana", "tarde", "noche", "fiesta", "festivo", "pareja", "romántico"]);
  generateBatch(20, "familia", ["Museo divertido", "Taller infantil", "Parque aventura", "Teatro títeres"], "Alegre", ["mañana", "tarde", "noche", "familia", "niños", "plan_familiar"]);
  generateBatch(30, "amigos", ["Ruta de Tapas", "Escape Room", "Karaoke Night", "Fiesta en terraza"], "Festivo", ["mañana", "tarde", "noche", "fiesta", "festivo", "amigos", "con_amigos", "diversión"]);
  generateBatch(25, "solo", ["Exposición Arte", "Concierto Acústico", "Tour Histórico", "Yoga Retiro"], "Cultural", ["mañana", "tarde", "noche", "solo", "cultural"]);

  return events;
}
