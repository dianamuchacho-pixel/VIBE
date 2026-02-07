import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FilterPanel } from "@/components/FilterPanel";
import { EventCard } from "@/components/EventCard";
import { useEvents, type FilterState } from "@/hooks/use-events";
import { Loader2, SlidersHorizontal, Sparkles, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Home() {
  const [filters, setFilters] = useState<FilterState | undefined>(undefined);
  const { data: events, isLoading, error } = useEvents(filters);

  const interests = [
    "Comedy", "Food", "Education", "Pop", "Design", "R&B", "Hip Hop / Rap", 
    "Film", "Personal health", "Blues & Jazz", "Travel", "Rock", "Yoga", 
    "Country", "Startups & Small Business", "Classical", "Mental health", 
    "TV", "Alternative", "Musical"
  ];

  return (
    <div className="min-h-screen bg-[#F8F8FB] flex flex-col font-body selection:bg-primary/30 selection:text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden bg-white border-b border-gray-100">
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-8xl font-display font-black tracking-tighter leading-none text-gray-900">
              VIBES<span className="text-[#FFB5C5]">.</span>
            </h1>
          </motion.div>
          <p className="text-lg md:text-xl font-medium text-gray-500 max-w-2xl mx-auto tracking-tight">
            Descubre Madrid a tu manera. 🎉
          </p>
        </div>
      </section>

      {/* Personalized Section - Netflix/Interest style */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h2 className="text-3xl font-display font-black text-gray-900 mb-2">Hagamos que sea personal</h2>
              <p className="text-gray-500 text-sm">Selecciona tus intereses para recibir sugerencias de eventos basadas en lo que te encanta</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            {interests.map((interest) => (
              <button
                key={interest}
                className="px-6 py-2.5 bg-white border border-gray-100 rounded-full text-sm font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all shadow-sm"
              >
                {interest}
              </button>
            ))}
          </div>
          
          <button className="text-primary font-bold text-sm hover:underline">
            Ver todos los intereses
          </button>
        </div>
      </section>

      <main className="container mx-auto px-6 py-20 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28 h-fit">
              <FilterPanel onFiltersChange={setFilters} />
            </div>
          </div>

          <div className="lg:hidden col-span-1 mb-8">
            <Sheet>
              <SheetTrigger asChild>
                <Button className="w-full h-20 font-black text-xl bg-[#1A1A2E] border-2 border-[#FF3B77] shadow-[0_0_20px_rgba(255,59,119,0.2)] rounded-2xl">
                  <SlidersHorizontal className="w-6 h-6 mr-3 text-[#FF3B77]" />
                  EDIT MY VIBE
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full sm:w-[450px] p-0 overflow-y-auto bg-[#0F0F1A] border-white/5">
                <FilterPanel onFiltersChange={setFilters} className="border-none shadow-none rounded-none h-full" />
              </SheetContent>
            </Sheet>
          </div>

          <div className="col-span-1 lg:col-span-9 space-y-20">
            {/* Netflix-style Recommendations */}
            {!filters && events && events.length > 0 && (
              <section className="space-y-10 relative py-12 px-8 rounded-[3rem] bg-gradient-to-r from-[#FF3B77]/10 via-[#00D4AA]/5 to-transparent border border-white/5 shadow-[0_0_50px_rgba(255,59,119,0.1)]">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none rounded-[3rem]">
                  <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#FF3B77]/20 blur-[100px]" />
                </div>
                
                <div className="flex items-end justify-between relative z-10">
                  <div>
                    <div className="flex items-center gap-2 text-[#FF3B77] font-black text-xs tracking-[0.3em] mb-2">
                      <Sparkles className="w-4 h-4" />
                      TOP PICKS FOR YOU
                    </div>
                    <h2 className="text-4xl md:text-6xl font-display font-black text-white leading-none">RECOMENDADOS</h2>
                  </div>
                  <Button variant="ghost" className="text-white/40 hover:text-[#FF3B77] font-black tracking-widest text-xs">
                    VIEW ALL <span className="ml-2">→</span>
                  </Button>
                </div>

                <div className="flex gap-8 overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory relative z-10">
                  {events.slice(0, 6).map((event) => (
                    <div key={`rec-${event.id}`} className="min-w-[320px] md:min-w-[450px] snap-start hover:scale-[1.02] transition-transform duration-500">
                      <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#FF3B77] to-[#00D4AA] rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-500" />
                        <EventCard event={event} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
              <div>
                <h2 className="text-4xl md:text-5xl font-display font-black text-gradient">
                  {filters ? "TU SELECCIÓN" : "ALL THE VIBES"}
                </h2>
                <p className="text-white/40 font-tech mt-2 uppercase tracking-widest text-sm">
                  {events?.length || 0} EXPERIENCIAS DISPONIBLES
                </p>
              </div>
              <div className="flex gap-4">
                <div className="px-4 py-2 glass-panel rounded-xl border-white/5 text-[10px] font-black uppercase text-[#FFD166]">
                  LEVEL 12: MADRILEÑO PRO
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-40 text-white/20">
                <Loader2 className="w-16 h-16 animate-spin mb-6 text-[#FF3B77]" />
                <p className="font-tech uppercase tracking-[0.3em]">Syncing events...</p>
              </div>
            ) : error ? (
              <div className="glass-panel border-[#FF3B77]/20 p-12 rounded-[2.5rem] text-center">
                <div className="text-5xl mb-6">📡</div>
                <h3 className="text-2xl font-black mb-2">SIGNAL LOST</h3>
                <p className="text-white/60 font-tech">Error al cargar planes. Reintenta la conexión.</p>
              </div>
            ) : events && events.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {(() => {
                  // Unify events by title
                  const unifiedMap = new Map<string, any>();
                  
                  const filteredEvents = events.filter(event => {
                    if (filters?.style && filters.style.length > 0) {
                      const eventStyles = event.tags.filter(t => ["fiesta", "relax", "cultura", "gastro"].includes(t));
                      if (!filters.style.some(s => eventStyles.includes(s))) return false;
                    }
                    if (filters?.context && filters.context.length > 0) {
                      const eventContexts = event.tags.filter(t => ["pareja", "amigos", "familia", "solo"].includes(t));
                      if (!filters.context.some(c => eventContexts.includes(c))) return false;
                    }
                    return true;
                  });

                  filteredEvents.forEach(event => {
                    if (!unifiedMap.has(event.title)) {
                      unifiedMap.set(event.title, {
                        ...event,
                        allDistricts: new Set([event.district]),
                        allTimes: new Set([event.timeStart]),
                        allGroups: new Set(event.tags.filter(t => ["pareja", "amigos", "familia", "solo", "con_niños", "con_amigos"].includes(t)).map(t => t.replace('con_', '').replace('_', ' ')))
                      });
                    } else {
                      const existing = unifiedMap.get(event.title);
                      existing.allDistricts.add(event.district);
                      existing.allTimes.add(event.timeStart);
                      event.tags.filter(t => ["pareja", "amigos", "familia", "solo", "con_niños", "con_amigos"].includes(t))
                        .forEach(t => existing.allGroups.add(t.replace('con_', '').replace('_', ' ')));
                    }
                  });

                  return Array.from(unifiedMap.values()).map((event) => (
                    <EventCard 
                      key={event.id} 
                      event={{
                        ...event,
                        district: Array.from(event.allDistricts).join(", "),
                        timeStart: Array.from(event.allTimes).sort().join(" / "),
                        idealGroup: Array.from(event.allGroups).join(" + ")
                      }} 
                    />
                  ));
                })()}
              </div>
            ) : (
              <div className="text-center py-32 glass-panel border-white/5 rounded-[3rem]">
                <span className="text-8xl mb-8 block animate-bounce">🛸</span>
                <h3 className="text-3xl font-black mb-4">NO SIGNAL</h3>
                <p className="text-white/40 font-tech uppercase tracking-widest max-w-md mx-auto">No hay planes que coincidan con tu frecuencia actual. Ajusta el panel de control.</p>
                <Button 
                  onClick={() => setFilters(undefined)} 
                  className="mt-10 bg-white/5 hover:bg-white/10 text-white font-black px-8 py-6 rounded-2xl transition-all"
                >
                  RESET FREQUENCY
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
