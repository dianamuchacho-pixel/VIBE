import { Link } from "wouter";
import { Star, MapPin, Clock, Users, CalendarCheck, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type Event } from "@shared/schema";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isReserving, setIsReserving] = useState(false);
  const { toast } = useToast();

  const handleReserve = () => {
    setIsReserving(true);
    setTimeout(() => {
      setIsReserving(false);
      setIsOpen(false);
      toast({
        title: "¡Combinación descubierta! +10 pts",
        description: `Has desbloqueado el logro "Explorador de Madrid" con "${event.title}".`,
      });
    }, 1500);
  };

  const displayImage = event.images && event.images.length > 0 
    ? event.images[0] 
    : "https://images.unsplash.com/photo-1514525253440-b39345208668?w=800&q=80";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm transition-all duration-500 flex flex-col h-full relative"
    >
      <div className="relative h-64 overflow-hidden rounded-t-[2rem]">
        <img 
          src={displayImage} 
          alt={event.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <Badge className="bg-[#FFB5C5] text-[#FF3B77] font-black px-3 py-1 shadow-sm">
            {event.mainCategory}
          </Badge>
          {event.priceRange === 'gratis' && (
            <Badge className="bg-[#B2F2BB] text-[#2F9E44] font-black px-3 py-1 shadow-sm">
              FREE
            </Badge>
          )}
        </div>

        <div className="absolute bottom-6 left-6 flex items-center gap-3 bg-white/80 backdrop-blur-md px-3 py-2 rounded-2xl">
          <div className="flex flex-col items-center font-tech">
            <span className="text-gray-900 text-sm font-bold">{Number(event.rating).toFixed(1)}</span>
            <Star className="w-3 h-3 text-[#FFD166] fill-[#FFD166]" />
          </div>
          <div className="h-6 w-px bg-gray-200 mx-1" />
          <div className="text-gray-900">
            <div className="text-[10px] font-black uppercase tracking-widest text-[#FF3B77]">MATCH</div>
            <div className="text-xs font-tech font-bold">98%</div>
          </div>
        </div>
      </div>

      <div className="p-8 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2 text-gray-400 font-black uppercase text-[10px] tracking-widest">
            <MapPin className="w-3 h-3 text-primary" />
            {event.district}
          </div>
          <div className="font-tech text-gray-900 text-sm font-bold">
            {event.priceBase > 0 ? `${event.priceBase}€` : "FREE"}
          </div>
        </div>

        <h3 className="text-2xl font-display font-black leading-tight mb-3 text-gray-900">
          {event.title}
        </h3>

        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-8 flex-1">
          {event.longDescription}
        </p>

        <div className="flex items-center justify-between mb-8">
          <div className="flex flex-wrap items-center gap-3 text-[10px] font-black uppercase tracking-widest text-gray-400">
            <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md max-w-full">
              <Clock className="w-3.5 h-3.5 text-[#FFB5C5]" />
              <span className="truncate">{event.timeStart}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md max-w-full">
              <Users className="w-3.5 h-3.5 text-[#B2F2BB]" />
              <span className="truncate">{event.idealGroup}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-4 border-t border-gray-50">
          <Link href={`/event/${event.id}`} className="flex-1">
            <Button variant="ghost" className="w-full rounded-2xl text-gray-400 font-black h-14 bg-gray-50 hover:bg-gray-100 transition-all">
              EXPLORE
            </Button>
          </Link>
          
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="flex-1 rounded-2xl bg-[#FF3B77] hover:bg-[#FF3B77]/90 text-white font-black h-14 shadow-lg shadow-[#FF3B77]/10">
                GET PASS
              </Button>
            </DialogTrigger>
            <DialogContent className="glass-panel border-white/10 rounded-[2.5rem] bg-[#0F0F1A]/95 text-white sm:max-w-[450px]">
              <DialogHeader>
                <DialogTitle className="text-3xl font-black font-display text-gradient text-center">READY TO GO?</DialogTitle>
                <DialogDescription className="text-white/60 text-center mt-3 text-base">
                  Prepárate para vivir <strong>{event.title}</strong> en el corazón de Madrid.
                </DialogDescription>
              </DialogHeader>
              <div className="py-8 space-y-6">
                <div className="relative h-40 rounded-3xl overflow-hidden border-2 border-white/5">
                  <img src={displayImage} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                    <div className="text-xl font-black">{event.title}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 glass-panel rounded-2xl border-white/5 flex flex-col items-center">
                    <div className="text-[10px] font-black uppercase text-[#00D4AA] mb-1">PRICE</div>
                    <div className="text-lg font-tech font-bold text-white">{event.priceBase > 0 ? `${event.priceBase}€` : "FREE"}</div>
                  </div>
                  <div className="p-4 glass-panel rounded-2xl border-white/5 flex flex-col items-center">
                    <div className="text-[10px] font-black uppercase text-[#FFD166] mb-1">START</div>
                    <div className="text-lg font-tech font-bold text-white">{event.timeStart}</div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  onClick={handleReserve} 
                  disabled={isReserving}
                  className="w-full bg-gradient-to-r from-[#FF3B77] to-[#FF6B9D] text-white font-black h-16 rounded-2xl shadow-2xl"
                >
                  {isReserving ? "SYNCING..." : "CONFIRM ACCESS"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </motion.div>
  );
}
