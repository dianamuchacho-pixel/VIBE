import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, Sunset, Music, MapPin, DollarSign, 
  Sparkles, Check, X, Filter 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { type FilterState } from "@/hooks/use-events";

interface FilterPanelProps {
  onFiltersChange: (filters: FilterState) => void;
  className?: string;
}

const CONTEXT_OPTIONS = [
  { id: "pareja", label: "Pareja", icon: "❤️" },
  { id: "amigos", label: "Amigos", icon: "🍻" },
  { id: "familia", label: "Familia", icon: "👨‍👩‍👧‍👦" },
  { id: "solo", label: "Solo", icon: "🚶" },
];

const TIME_OPTIONS = [
  { id: "mañana", label: "Mañana" },
  { id: "tarde", label: "Tarde" },
  { id: "noche", label: "Noche" },
];

const STYLE_OPTIONS = [
  { id: "fiesta", label: "Fiesta", emoji: "🎉" },
  { id: "relax", label: "Relax", emoji: "🧘" },
  { id: "cultura", label: "Cultura", emoji: "🎭" },
  { id: "gastro", label: "Gastro", emoji: "🥘" },
];

const DISTRICTS = [
  "Centro", "Malasaña", "Chueca", "Salamanca", "Retiro", "La Latina", 
  "Lavapiés", "Chamberí", "Argüelles", "Huertas", "Las Letras", 
  "Conde Duque", "Moncloa", "Fuera de M-30"
];

export function FilterPanel({ onFiltersChange, className }: FilterPanelProps) {
  const [filters, setFilters] = useState<FilterState>({
    context: [],
    timeOfDay: [],
    style: [],
    districts: [],
    priceCategory: [],
    features: [],
    minPrice: 0,
    maxPrice: 150,
  });

  const toggleArrayItem = (key: keyof FilterState, value: string) => {
    setFilters(prev => {
      const current = prev[key] as string[];
      const next = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [key]: next };
    });
  };

  const handleMix = () => {
    onFiltersChange({ ...filters });
  };

  const handleSurprise = () => {
    const randomStyles = [STYLE_OPTIONS[Math.floor(Math.random() * STYLE_OPTIONS.length)].id];
    const randomContext = [CONTEXT_OPTIONS[Math.floor(Math.random() * CONTEXT_OPTIONS.length)].id];
    const surpriseState = { ...filters, style: randomStyles, context: randomContext };
    setFilters(surpriseState);
    onFiltersChange(surpriseState);
  };

  const clearFilters = () => {
    const cleanState = {
      context: [],
      timeOfDay: [],
      style: [],
      districts: [],
      priceCategory: [],
      features: [],
      minPrice: 0,
      maxPrice: 150,
    };
    setFilters(cleanState);
    onFiltersChange(cleanState);
  };

  const isAnyFilterActive = 
    filters.context.length > 0 || 
    filters.timeOfDay.length > 0 || 
    filters.style.length > 0 || 
    filters.districts.length > 0 || 
    filters.priceCategory.length > 0 ||
    filters.maxPrice < 150;

  return (
    <div className={`bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden ${className}`}>
      <div className="p-8 bg-[#FFB5C5]/20 text-[#FF3B77] relative overflow-hidden">
        <div className="flex items-center justify-between mb-2 relative z-10">
          <h2 className="text-xl font-display font-black flex items-center gap-3">
            <Sparkles className="w-5 h-5" />
            CONTROL PANEL
          </h2>
          {isAnyFilterActive && (
            <button 
              onClick={clearFilters} 
              className="text-xs font-bold uppercase tracking-widest hover:opacity-70 transition-colors"
            >
              RESET
            </button>
          )}
        </div>
        <p className="text-gray-500 text-xs font-medium relative z-10 uppercase tracking-widest">Personaliza tu aventura</p>
      </div>

      <div className="p-8 space-y-10 max-h-[calc(100vh-350px)] overflow-y-auto no-scrollbar bg-white">
        {/* Section A: Context */}
        <section>
          <div className="flex items-center gap-2 mb-5 text-gray-400 font-black uppercase text-[10px] tracking-[0.2em]">
            <Users className="w-4 h-4" />
            VUESTRA CREW
          </div>
          <div className="grid grid-cols-2 gap-3">
            {CONTEXT_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => toggleArrayItem("context", opt.id)}
                className={`
                  p-3 rounded-2xl border text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2
                  ${filters.context.includes(opt.id) 
                    ? "border-[#FF3B77] bg-[#FF3B77]/10 text-[#FF3B77]" 
                    : "border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200"}
                `}
              >
                <span>{opt.icon}</span>
                {opt.label}
              </button>
            ))}
          </div>
        </section>

        {/* Section B: Time */}
        <section>
          <div className="flex items-center gap-2 mb-5 text-gray-400 font-black uppercase text-[10px] tracking-[0.2em]">
            <Sunset className="w-4 h-4" />
            EL MOMENTO
          </div>
          <div className="flex flex-wrap gap-2">
            {TIME_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => toggleArrayItem("timeOfDay", opt.id)}
                className={`
                  px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border
                  ${filters.timeOfDay.includes(opt.id)
                    ? "bg-[#FFD166]/20 text-[#D97706] border-[#FFD166]"
                    : "bg-gray-50 text-gray-400 border-gray-100 hover:border-gray-200"}
                `}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </section>

        {/* Section C: Style */}
        <section>
          <div className="flex items-center gap-2 mb-5 text-gray-400 font-black uppercase text-[10px] tracking-[0.2em]">
            <Music className="w-4 h-4" />
            THE VIBE
          </div>
          <div className="grid grid-cols-2 gap-3">
            {STYLE_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => toggleArrayItem("style", opt.id)}
                className={`
                  p-3 rounded-2xl border text-[10px] font-bold transition-all duration-300 flex flex-col items-center gap-1
                  ${filters.style.includes(opt.id)
                    ? "border-[#00D4AA] bg-[#00D4AA]/10 text-[#00897B]"
                    : "border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200"}
                `}
              >
                <span className="text-xl">{opt.emoji}</span>
                {opt.label}
              </button>
            ))}
          </div>
        </section>

        {/* Section E: Budget */}
        <section>
          <div className="flex items-center justify-between mb-5 text-gray-400 font-black uppercase text-[10px] tracking-[0.2em]">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              CASH
            </div>
            <span className="font-tech text-gray-600 text-sm">
              UP TO {(filters.maxPrice ?? 150)}€
            </span>
          </div>
          
          <div className="px-2 mb-8">
            <Slider 
              value={[filters.maxPrice ?? 150]} 
              max={150} 
              step={5}
              onValueChange={(val) => setFilters(prev => ({ ...prev, maxPrice: val[0] }))}
              className="py-4"
            />
          </div>
        </section>
      </div>

      <div className="p-8 bg-gray-50 border-t border-gray-100 space-y-4">
        <Button 
          onClick={handleMix}
          className="w-full bg-[#FF3B77] hover:bg-[#FF3B77]/90 text-white font-black py-7 rounded-2xl transition-all text-sm tracking-widest"
        >
          MIX THE VIBE
        </Button>
      </div>
    </div>
  );
}