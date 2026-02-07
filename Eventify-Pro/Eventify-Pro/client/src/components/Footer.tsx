import { Link } from "wouter";
import { Instagram, Twitter, Facebook, Heart } from "lucide-react";

import vibesLogo from "@/assets/logo-vibes.png";

export function Footer() {
  return (
    <footer className="bg-[#0F0F1A] border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10">
                <img src={vibesLogo} alt="VIBES" className="w-full h-full object-cover" />
              </div>
              <span className="text-2xl font-display font-black tracking-tighter text-white">
                VIBES<span className="text-[#00D4AA]">.</span>
              </span>
            </Link>
            <p className="text-white/40 leading-relaxed font-medium">
              Descubre los mejores planes de Madrid. Mezcla tus preferencias y encuentra tu experiencia ideal en la ciudad que nunca duerme.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Explorar</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li><Link href="/" className="hover:text-primary transition-colors">Tendencias</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">Barrios</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">Categorías</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">Mapa</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Comunidad</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li><Link href="/" className="hover:text-primary transition-colors">Organizadores</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">Eventos privados</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">Ayuda</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Síguenos</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              ¿Eres organizador? <a href="#" className="text-primary font-medium hover:underline">Publica tu evento</a>
            </p>
          </div>
        </div>

        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-black uppercase tracking-widest text-white/20">
          <p>© 2026 VIBES. Todos los derechos reservados.</p>
          <div className="flex items-center gap-2">
            <span>Hecho con</span>
            <Heart className="w-4 h-4 text-[#FF3B77] fill-[#FF3B77]" />
            <span>en Madrid</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
