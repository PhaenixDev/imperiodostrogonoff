import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu as MenuIcon, X, Phone, Clock, ChevronRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { RESTAURANT_CONFIG } from '../../config/restaurantConfig';
import { formatBRL } from '../../services/whatsappService';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { itemCount, subtotal, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Destaques', href: '#destaques' },
    { label: 'Cardápio Completo', href: '#cardapio' },
    { label: 'Experiência 360°', href: '#experiencia-360' },
    { label: 'O Restaurante', href: '#sobre' },
    { label: 'Localização', href: '#localizacao' },
  ];

  return (
    <>
      {/* Top micro bar with hours and delivery callout */}
      <div className="bg-black/90 border-b border-imperio-gold/15 text-xs text-imperio-cream/70 py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1.5 text-amber-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Aberto hoje: {RESTAURANT_CONFIG.openingHours.hours}
            </span>
            <span className="text-zinc-500">•</span>
            <span className="flex items-center gap-1 text-zinc-300">
              <Clock className="w-3.5 h-3.5 text-imperio-gold" />
              Tempo de Entrega: {RESTAURANT_CONFIG.openingHours.deliveryTime}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-imperio-gold/90 font-medium">
              ✨ Comida caseira fresca feita na hora
            </span>
            <a
              href={`https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20um%20pedido`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-imperio-cream hover:text-imperio-gold flex items-center gap-1 transition-colors"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              {RESTAURANT_CONFIG.displayPhone}
            </a>
          </div>
        </div>
      </div>

      {/* Main sticky header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0a0a0c]/95 backdrop-blur-md border-b border-imperio-gold/20 py-2.5 shadow-2xl'
            : 'bg-gradient-to-b from-black/90 via-[#0a0a0c]/80 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          
          {/* Logo & Brand Identity */}
          <a href="#" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-imperio-gold rounded-lg p-1">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-imperio-gold/40 p-0.5 bg-black flex items-center justify-center overflow-hidden shadow-gold-glow group-hover:border-imperio-gold transition-colors">
              <img
                src="/images/menu/logo.webp"
                alt="Logo Império do Strogonoff"
                className="w-full h-full object-contain transform group-hover:scale-105 transition-transform"
                loading="eager"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-black tracking-widest text-base sm:text-lg text-white group-hover:text-amber-400 transition-colors uppercase">
                  Império
                </span>
                <span className="text-imperio-gold text-xs font-serif italic">do</span>
                <span className="font-serif font-black tracking-wider text-base sm:text-lg text-gold-gradient uppercase">
                  Strogonoff
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 hidden sm:block tracking-wider uppercase font-medium">
                Sabor, Tradição & Qualidade
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-zinc-300 hover:text-imperio-gold transition-colors relative py-1 focus:outline-none focus:text-imperio-gold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-imperio-gold hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions: Cart Trigger + WhatsApp CTA */}
          <div className="flex items-center gap-3">
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Abrir carrinho de compras"
              className="relative flex items-center gap-2 bg-[#17171e] hover:bg-[#20202a] border border-imperio-gold/30 hover:border-imperio-gold text-white px-3.5 py-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-imperio-gold shadow-lg group"
            >
              <ShoppingBag className="w-5 h-5 text-imperio-gold group-hover:scale-110 transition-transform" />
              <div className="text-left hidden sm:block">
                <div className="text-[10px] text-zinc-400 leading-none">Meu Pedido</div>
                <div className="text-xs font-bold text-amber-400 leading-tight">
                  {formatBRL(subtotal)}
                </div>
              </div>
              {itemCount > 0 && (
                <span className="bg-imperio-gold text-black font-extrabold text-xs w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Direct WhatsApp Ordering Button */}
            <a
              href={`https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20um%20pedido%20no%20Imp%C3%A9rio%20do%20Strogonoff!`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold px-4 py-2 rounded-full text-xs uppercase tracking-wider shadow-amber-glow hover:shadow-gold-glow transition-all transform hover:-translate-y-0.5"
            >
              <span>Pedir no WhatsApp</span>
              <ChevronRight className="w-4 h-4" />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-zinc-300 hover:text-white p-2 rounded-lg bg-zinc-900/60 border border-zinc-800"
              aria-label="Abrir menu de navegação"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-amber-400" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#0e0e12] border-b border-imperio-gold/20 px-6 py-5 mt-2 transition-all">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base text-zinc-200 hover:text-imperio-gold font-medium py-1.5 border-b border-zinc-800/60 flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-zinc-500" />
                </a>
              ))}
              <div className="pt-3">
                <a
                  href={`https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20um%20pedido`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-extrabold text-center rounded-xl flex items-center justify-center gap-2 shadow-lg"
                >
                  <Phone className="w-4 h-4" />
                  <span>Chamar no WhatsApp</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
