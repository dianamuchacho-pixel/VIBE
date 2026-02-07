import { Link } from "wouter";
import { Search, Menu, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import vibesLogo from "@/assets/logo-vibes.png";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#0F0F1A]/80 backdrop-blur-xl border-b border-white/5">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10 shadow-[0_0_20px_rgba(255,59,119,0.2)] transform group-hover:rotate-6 transition-transform duration-500">
            <img src={vibesLogo} alt="VIBES" className="w-full h-full object-cover" />
          </div>
          <span className="text-2xl font-display font-black tracking-tighter text-white">
            VIBES<span className="text-[#00D4AA]">.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
            Explorar
          </Link>
          <Link href="/trending" className="text-sm font-medium hover:text-primary transition-colors">
            Tendencias
          </Link>
          <Link href="/map" className="text-sm font-medium hover:text-primary transition-colors">
            Mapa
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Buscar plan..." 
              className="pl-9 pr-4 py-2 bg-muted/50 hover:bg-muted focus:bg-background border border-transparent focus:border-primary rounded-full text-sm outline-none transition-all w-48 focus:w-64"
            />
          </div>
          
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu className="w-5 h-5" />
          </Button>

          <Button className="hidden md:flex rounded-full bg-foreground text-background hover:bg-foreground/90 font-medium px-6">
            <User className="w-4 h-4 mr-2" />
            Ingresar
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background p-4 space-y-4 animate-in slide-in-from-top-5">
          <Link href="/" className="block py-2 text-lg font-medium hover:text-primary">
            Explorar
          </Link>
          <Link href="/trending" className="block py-2 text-lg font-medium hover:text-primary">
            Tendencias
          </Link>
          <Link href="/map" className="block py-2 text-lg font-medium hover:text-primary">
            Mapa
          </Link>
          <div className="pt-4 border-t border-border">
            <Button className="w-full rounded-full">Ingresar</Button>
          </div>
        </div>
      )}
    </nav>
  );
}
