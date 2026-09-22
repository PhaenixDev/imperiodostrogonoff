import React, { useRef } from 'react';
import { CATEGORIES } from '../../data/menuData';
import { Flame, Utensils, Beef, Drumstick, CookingPot, Coffee, Cake } from 'lucide-react';

interface CategoryNavigationProps {
  activeCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryNavigation: React.FC<CategoryNavigationProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame': return <Flame className="w-4 h-4" />;
      case 'Utensils': return <Utensils className="w-4 h-4" />;
      case 'Beef': return <Beef className="w-4 h-4" />;
      case 'Drumstick': return <Drumstick className="w-4 h-4" />;
      case 'CookingPot': return <CookingPot className="w-4 h-4" />;
      case 'Coffee': return <Coffee className="w-4 h-4" />;
      case 'Cake': return <Cake className="w-4 h-4" />;
      default: return null;
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    onSelectCategory(categoryId);
    const element = document.getElementById(`secao-${categoryId}`);
    if (element) {
      const yOffset = -120;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-[60px] sm:top-[72px] z-30 bg-[#0a0a0c]/90 backdrop-blur-md border-y border-amber-500/15 py-3 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div
          ref={scrollRef}
          className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar py-1 scroll-smooth"
        >
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all shrink-0 ${
                  isActive
                    ? 'bg-amber-500 text-black shadow-gold-glow'
                    : 'bg-[#14141a] text-zinc-300 hover:text-white hover:bg-[#1d1d26] border border-zinc-800'
                }`}
              >
                <span className={isActive ? 'text-black' : 'text-amber-400'}>
                  {getIcon(category.iconName)}
                </span>
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
