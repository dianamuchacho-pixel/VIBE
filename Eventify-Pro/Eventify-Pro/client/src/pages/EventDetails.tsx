import { useRoute } from "wouter";
import { useEvent } from "@/hooks/use-events";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Loader2, Calendar, MapPin, Clock, ArrowLeft, Share2, Heart, ExternalLink, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function EventDetails() {
  const [, params] = useRoute("/event/:id");
  const id = parseInt(params?.id || "0");
  const { data: event, isLoading, error } = useEvent(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Plan no encontrado</h1>
        <Link href="/">
          <Button>Volver a explorar</Button>
        </Link>
      </div>
    );
  }

  const displayImage = event.images && event.images.length > 0 
    ? event.images[0] 
    : "https://images.unsplash.com/photo-1514525253440-b39345208668?w=1920&q=80";

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />

      {/* Hero Image */}
      <div className="relative h-[50vh] min-h-[400px] w-full">
        <img 
          src={displayImage} 
          alt={event.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        
        <div className="absolute top-6 left-6 z-10">
          <Link href="/">
            <Button variant="secondary" className="rounded-full bg-white/90 backdrop-blur hover:bg-white shadow-lg">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 relative -mt-32 pb-20">
        <div className="bg-card rounded-3xl shadow-2xl border border-border/50 p-8 md:p-12">
          
          {/* Header Info */}
          <div className="flex flex-col md:flex-row justify-between gap-8 border-b border-border pb-8 mb-8">
            <div className="flex-1">
              <div className="flex gap-2 mb-4">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none font-bold">
                  {event.mainCategory}
                </Badge>
                {event.isTrending && (
                  <Badge className="bg-accent/10 text-accent hover:bg-accent/20 border-none font-bold">
                    🔥 Tendencia
                  </Badge>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-display font-black leading-tight text-foreground mb-4">
                {event.title}
              </h1>
              
              <div className="flex flex-wrap gap-6 text-muted-foreground font-medium">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  {event.locationExact}, {event.district}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  {event.timeStart} - {event.timeEnd}
                </div>
              </div>
            </div>

            {/* Price Box */}
            <div className="flex flex-col items-center md:items-end justify-center gap-4 min-w-[200px]">
              <div className="text-center md:text-right">
                <div className="text-sm text-muted-foreground uppercase font-bold tracking-wider mb-1">Precio aproximado</div>
                <div className="text-4xl font-display font-bold text-foreground">
                  {event.priceBase === 0 ? "Gratis" : `${event.priceBase}€`}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-full w-12 h-12">
                  <Share2 className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full w-12 h-12 text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button className="rounded-full px-8 h-12 bg-foreground text-background hover:bg-foreground/90 font-bold text-lg">
                  Reservar
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Details */}
            <div className="lg:col-span-2 space-y-8">
              <section>
                <h3 className="text-2xl font-display font-bold mb-4">Sobre este plan</h3>
                <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                  {event.longDescription}
                </p>
              </section>

              {event.includes && event.includes.length > 0 && (
                <section className="bg-muted/30 rounded-2xl p-6 border border-border">
                  <h4 className="font-bold mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Qué incluye
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {event.includes.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {event.tags?.map((tag) => (
                  <span key={tag} className="px-4 py-2 bg-background border border-border rounded-full text-sm font-medium text-muted-foreground">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Sidebar Details */}
            <div className="space-y-6">
              <div className="bg-background rounded-2xl border border-border p-6 shadow-sm">
                <h4 className="font-display font-bold mb-4">Características</h4>
                <ul className="space-y-4">
                  <li className="flex justify-between items-center border-b border-border/50 pb-2">
                    <span className="text-muted-foreground">Ambiente</span>
                    <span className="font-medium capitalize">{event.vibe || "Estándar"}</span>
                  </li>
                  <li className="flex justify-between items-center border-b border-border/50 pb-2">
                    <span className="text-muted-foreground">Grupo ideal</span>
                    <span className="font-medium capitalize">{event.idealGroup || "Cualquiera"}</span>
                  </li>
                  <li className="flex justify-between items-center border-b border-border/50 pb-2">
                    <span className="text-muted-foreground">Espacio</span>
                    <span className="font-medium capitalize">{event.indoorOutdoor || "Mixto"}</span>
                  </li>
                  {event.petFriendly && (
                    <li className="flex justify-between items-center text-green-600 font-medium">
                      <span>🐶 Pet Friendly</span>
                      <CheckCircle className="w-4 h-4" />
                    </li>
                  )}
                  {event.parking && (
                    <li className="flex justify-between items-center text-green-600 font-medium">
                      <span>🚗 Parking Cerca</span>
                      <CheckCircle className="w-4 h-4" />
                    </li>
                  )}
                </ul>
              </div>

              {/* Map Placeholder */}
              <div className="bg-muted rounded-2xl h-48 flex items-center justify-center border border-border relative overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=800&q=80')] bg-cover bg-center opacity-50 grayscale group-hover:grayscale-0 transition-all" />
                <div className="relative z-10 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-sm font-bold flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Ver en Mapa
                </div>
              </div>

              {event.website && (
                <a 
                  href={event.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button variant="outline" className="w-full">
                    Visitar sitio web
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
