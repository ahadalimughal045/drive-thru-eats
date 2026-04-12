'use client';
import { useState } from 'react';
import { Plus, Check } from 'lucide-react';
import { MenuItem } from '@/data/menu';
import { useCart } from './CartContext';

export default function MenuCard({ item }: { item: MenuItem }) {
  const { addToCart, items } = useCart();
  const [added, setAdded] = useState(false);
  const inCart = items.find(i => i.id === item.id);

  const handleAdd = () => {
    addToCart(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="group bg-brand-surface border border-brand-border rounded-2xl overflow-hidden hover:border-brand-red/50 transition-all shadow-sm hover:shadow-xl hover:shadow-brand-red/10 hover:-translate-y-1">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3] bg-brand-bg">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400';
          }}
        />
        {inCart && (
          <div className="absolute top-2 right-2 bg-brand-red text-white text-xs font-bold rounded-full px-2 py-0.5 shadow-md">
            ×{inCart.quantity}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-brand-orange text-[10px] font-black uppercase tracking-widest mb-1">{item.restaurant}</p>
        <h3 className="text-brand-text font-bold text-sm leading-tight mb-3 line-clamp-2 min-h-[2.5rem]">{item.name}</h3>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-brand-red font-black text-lg">₹{item.price}</span>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
              added
                ? 'bg-green-600 text-white scale-95 shadow-inner'
                : 'bg-brand-red hover:bg-red-700 text-white hover:scale-105 active:scale-95'
            }`}
          >
            {added ? <Check size={14} /> : <Plus size={14} />}
            {added ? 'Added!' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}
