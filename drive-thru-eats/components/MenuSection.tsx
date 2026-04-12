'use client';
import { useState, useEffect, useRef } from 'react';
import { menuItems, categories } from '@/data/menu';
import MenuCard from './MenuCard';
import { Search } from 'lucide-react';

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('breakfast');
  const [searchQuery, setSearchQuery] = useState('');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const scrollToCategory = (id: string) => {
    setActiveCategory(id);
    const el = sectionRefs.current[id];
    if (el) {
      const offset = 180;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (searchQuery) return; // Don't track scroll if searching globally
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );
    categories.forEach(cat => {
      const el = document.getElementById(cat.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [searchQuery]);

  // Filtering function
  const isSearchActive = searchQuery.trim().length > 0;
  
  const getFilteredItems = (categoryId?: string) => {
    let items = categoryId 
      ? menuItems.filter(i => i.categoryId === categoryId)
      : menuItems;
      
    if (isSearchActive) {
      const lowerQuery = searchQuery.toLowerCase();
      items = items.filter(item => 
        item.name.toLowerCase().includes(lowerQuery) || 
        item.restaurant.toLowerCase().includes(lowerQuery)
      );
    }
    return items;
  };

  return (
    <section id="menu" className="bg-brand-bg py-12">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Search Bar */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative group">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted group-focus-within:text-brand-red transition-colors" />
            <input
              type="text"
              placeholder="Search for your favorite food... (e.g. Burger, Pizza)"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-brand-surface border-2 border-brand-border rounded-full pl-12 pr-6 py-4 text-brand-text placeholder-brand-muted focus:outline-none focus:border-brand-red transition-all text-base shadow-sm font-medium"
            />
            {isSearchActive && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-brand-red font-bold hover:underline"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Mobile Category Scroll */}
        {!isSearchActive && (
          <div className="lg:hidden mb-6 overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 pb-2" style={{ width: 'max-content' }}>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => scrollToCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-sm ${
                    activeCategory === cat.id
                      ? 'bg-brand-red text-white border border-brand-red'
                      : 'bg-brand-surface border border-brand-border text-brand-muted hover:text-brand-text'
                  }`}
                >
                  <span className="text-base">{cat.icon}</span> {cat.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-8 relative items-start">

          {/* Menu Items */}
          <div className={`flex-1 space-y-12 ${isSearchActive ? 'w-full' : ''}`}>
            
            {isSearchActive && getFilteredItems().length === 0 && (
              <div className="text-center py-16 bg-brand-surface rounded-3xl border border-brand-border">
                <div className="text-6xl mb-4">😢</div>
                <h3 className="text-xl font-bold text-brand-text mb-2">No items found</h3>
                <p className="text-brand-muted">Try searching with a different keyword!</p>
              </div>
            )}

            {isSearchActive && getFilteredItems().length > 0 && (
              <div>
                <h2 className="text-brand-text font-black text-2xl tracking-wide mb-6 flex items-center gap-3">
                  <Search size={24} className="text-brand-red" /> 
                  Search Results ({getFilteredItems().length})
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5">
                  {getFilteredItems().map(item => (
                    <MenuCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            )}

            {!isSearchActive && categories.map(cat => {
              const items = getFilteredItems(cat.id);
              if (items.length === 0) return null;
              
              return (
                <div
                  key={cat.id}
                  id={cat.id}
                  ref={el => { sectionRefs.current[cat.id] = el; }}
                  className="scroll-mt-[100px]"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl bg-brand-surface w-12 h-12 flex items-center justify-center rounded-2xl shadow-sm border border-brand-border">{cat.icon}</span>
                    <h2 className="text-brand-text font-black text-2xl tracking-wide font-display">{cat.name}</h2>
                    <div className="flex-1 h-px bg-brand-border mx-2" />
                    <span className="text-brand-muted font-bold text-sm bg-brand-surface px-3 py-1 rounded-full border border-brand-border">{items.length} items</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5">
                    {items.map(item => (
                      <MenuCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
