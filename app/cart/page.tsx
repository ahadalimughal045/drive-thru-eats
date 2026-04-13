'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Minus, Plus, ShoppingBag, ArrowLeft, Info, HelpCircle, CheckCircle2, ChevronRight, MapPin, Phone, User, Mail, CreditCard, Tag, Truck, ShoppingBasket, Utensils } from 'lucide-react';
import { useCart } from '@/components/CartContext';
import { useAuth } from '@/components/AuthContext';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, clearCart, totalPrice, totalItems } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Form States
  const [orderType, setOrderType] = useState<'delivery' | 'pickup' | 'dining'>('delivery');
  const [tablesList, setTablesList] = useState<any[]>([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryArea, setDeliveryArea] = useState('');
  const [address, setAddress] = useState('');
  const [instructions, setInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [transactionNumber, setTransactionNumber] = useState('');

  useEffect(() => {
    fetch('/api/tables')
      .then(res => res.json())
      .then(data => setTablesList(data));
  }, []);

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'DISCOUNT10') {
      setDiscount(10);
    } else {
      setDiscount(0);
    }
  };

  const discountAmount = Math.round(totalPrice * discount / 100);
  const finalPrice = totalPrice - discountAmount;

  const placeOrder = () => {
    if (!name.trim() || !phone.trim()) return alert("Please enter Name and Phone!");
    if (orderType === 'dining' && !selectedTable) return alert("Please select a Table Number!");

    const newOrder = {
      id: 'ORD-' + Date.now().toString().slice(-6),
      customerName: name,
      email,
      phone,
      type: orderType,
      tableNumber: orderType === 'dining' ? selectedTable : '',
      deliveryArea,
      address: orderType === 'delivery' ? address : '',
      instructions,
      paymentMethod,
      transactionNumber,
      items: items, // Passing as array, API will stringify
      total: finalPrice,
      status: 'Pending'
    };

    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder)
    })
    .then(async (res) => {
      const data = await res.json();
      if (res.ok) {
        setOrderPlaced(true);
        clearCart();
      } else {
        alert('Order Failed: ' + (data.detail || data.error || 'Unknown Error'));
      }
    })
    .catch(err => {
      alert('Network Error: Could not reach server');
      console.error(err);
    });
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8 animate-bounce transition-all">
          <CheckCircle2 size={48} />
        </div>
        <h1 className="text-4xl lg:text-6xl font-black text-brand-text mb-4 tracking-tighter">Order <span className="text-brand-red">Confirmed!</span></h1>
        <p className="text-brand-muted max-w-md font-medium text-lg leading-relaxed">
          Your legendary meal is being prepared. Grab a seat, relax, and get ready for a taste explosion!
        </p>
        <Link href="/" className="btn-primary mt-12 py-5 px-12 text-lg shadow-premium">
          ORDER MORE FOOD
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4">
        <div className="w-32 h-32 bg-brand-bg rounded-full flex items-center justify-center mb-10 text-brand-muted/30">
          <ShoppingBasket size={64} />
        </div>
        <h2 className="text-3xl font-black text-brand-text mb-4 tracking-tight">Your tray is empty.</h2>
        <p className="text-brand-muted mb-10 font-medium tracking-wide">Looks like you haven&apos;t added any legendary specials yet.</p>
        <Link href="/" className="btn-primary flex items-center gap-2 py-4 px-8 shadow-premium">
          <ArrowLeft size={18} /> START ORDERING
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24 lg:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="mb-12">
          <Link href="/" className="group inline-flex items-center gap-2 text-brand-muted hover:text-brand-red transition-all font-bold text-sm mb-4">
            <ArrowLeft size={16} /> Back to Menu
          </Link>
          <h1 className="text-4xl lg:text-6xl font-black text-brand-text tracking-tighter">
            Finalize Your <span className="text-brand-red">Order.</span>
          </h1>
        </div>

        {!user && (
          <div className="mb-12 glass border-brand-orange/20 p-6 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 rounded-full blur-3xl -mr-10 -mt-10" />
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 text-brand-orange flex items-center justify-center animate-pulse">
                <Info size={24} />
              </div>
              <div>
                <p className="text-brand-text font-black uppercase tracking-widest text-xs">Unlock Premium Benefits</p>
                <p className="text-brand-muted text-sm font-medium">Log in to track orders and save your favorite meals.</p>
              </div>
            </div>
            <Link href="/login" className="btn-secondary whitespace-nowrap px-8 py-3 text-sm">
              Sign In Account
            </Link>
          </div>
        )}

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: FORM */}
          <div className="lg:col-span-8 space-y-8">
            <div className="glass rounded-[2.5rem] p-8 md:p-12 border-white shadow-premium">
              {/* Service Selection */}
              <div className="flex items-center gap-2 p-2 bg-brand-bg rounded-3xl mb-12">
                {[
                  { id: 'delivery', label: 'Delivery', icon: Truck },
                  { id: 'pickup', label: 'Take Away', icon: ShoppingBag },
                  { id: 'dining', label: 'Dining', icon: Utensils }
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setOrderType(type.id as any)}
                    className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                      orderType === type.id 
                        ? 'bg-white text-brand-red shadow-premium border border-brand-border' 
                        : 'text-brand-muted hover:text-brand-text'
                    }`}
                  >
                    <type.icon size={18} />
                    <span className="hidden sm:inline">{type.label}</span>
                  </button>
                ))}
              </div>

              <div className="space-y-10">
                {orderType === 'dining' && (
                  <div className="p-8 bg-brand-red/5 rounded-3xl border border-brand-red/10 animate-fade-in">
                    <label className="text-[10px] font-black text-brand-muted uppercase tracking-[0.2em] mb-4 block ml-2">Select Your Table Spot</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {tablesList.map(t => (
                        <button
                          key={t.id}
                          onClick={() => setSelectedTable(t.number)}
                          className={`py-4 rounded-2xl border-2 transition-all font-black text-sm ${
                            selectedTable === t.number
                              ? 'bg-brand-red border-brand-red text-white shadow-lg'
                              : 'bg-white border-brand-border text-brand-text hover:border-brand-red/30'
                          }`}
                        >
                          Table {t.number}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-brand-muted uppercase tracking-[0.2em] ml-2">Full Name</label>
                    <div className="relative">
                      <User size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-red" />
                      <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="E.g. Elon Musk" className="w-full bg-brand-bg border border-brand-border rounded-2xl pl-12 pr-6 py-4 text-brand-text placeholder-brand-muted focus:outline-none focus:ring-4 focus:ring-brand-red/5 focus:border-brand-red transition-all font-medium" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-brand-muted uppercase tracking-[0.2em] ml-2">Email</label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-red" />
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="elon@x.com" className="w-full bg-brand-bg border border-brand-border rounded-2xl pl-12 pr-6 py-4 text-brand-text placeholder-brand-muted focus:outline-none focus:ring-4 focus:ring-brand-red/5 focus:border-brand-red transition-all font-medium" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-brand-muted uppercase tracking-[0.2em] ml-2">Phone</label>
                    <div className="relative">
                      <Phone size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-red" />
                      <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 ..." className="w-full bg-brand-bg border border-brand-border rounded-2xl pl-12 pr-6 py-4 text-brand-text placeholder-brand-muted focus:outline-none focus:ring-4 focus:ring-brand-red/5 focus:border-brand-red transition-all font-medium" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-brand-muted uppercase tracking-[0.2em] ml-2">Area / Locality</label>
                    <div className="relative">
                      <MapPin size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-red" />
                      <input type="text" value={deliveryArea} onChange={e => setDeliveryArea(e.target.value)} placeholder="Shahi Bazar, Handwara" className="w-full bg-brand-bg border border-brand-border rounded-2xl pl-12 pr-6 py-4 text-brand-text placeholder-brand-muted focus:outline-none focus:ring-4 focus:ring-brand-red/5 focus:border-brand-red transition-all font-medium" />
                    </div>
                  </div>
                </div>

                {orderType === 'delivery' && (
                  <div className="space-y-2 animate-fade-in">
                    <label className="text-[10px] font-black text-brand-muted uppercase tracking-[0.2em] ml-2">Complete Address</label>
                    <textarea value={address} onChange={e => setAddress(e.target.value)} rows={3} placeholder="Street name, house number, landmark..." className="w-full bg-brand-bg border border-brand-border rounded-2xl px-6 py-4 text-brand-text placeholder-brand-muted focus:outline-none focus:ring-4 focus:ring-brand-red/5 focus:border-brand-red transition-all font-medium" />
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-brand-muted uppercase tracking-[0.2em] ml-2">Order Instructions (Optional)</label>
                  <input type="text" value={instructions} onChange={e => setInstructions(e.target.value)} placeholder="No onion, spicy, etc." className="w-full bg-brand-bg border border-brand-border rounded-2xl px-6 py-4 text-brand-text placeholder-brand-muted focus:outline-none focus:ring-4 focus:ring-brand-red/5 focus:border-brand-red transition-all font-medium" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-brand-border">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-brand-muted uppercase tracking-[0.2em] ml-2">Payment Method</label>
                    <div className="relative">
                      <CreditCard size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-red" />
                      <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} className="w-full bg-brand-bg border border-brand-border rounded-2xl pl-12 pr-6 py-4 text-brand-text focus:outline-none focus:ring-4 focus:ring-brand-red/5 focus:border-brand-red transition-all font-black text-xs appearance-none">
                        <option value="">Select Method</option>
                        <option value="cash">Cash on Delivery</option>
                        <option value="upi">UPI / Online Transfer</option>
                        <option value="bank">Bank Transfer</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-brand-muted uppercase tracking-[0.2em] ml-2">Transaction ID (If paid)</label>
                    <input type="text" value={transactionNumber} onChange={e => setTransactionNumber(e.target.value)} placeholder="Optional" className="w-full bg-brand-bg border border-brand-border rounded-2xl px-6 py-4 text-brand-text placeholder-brand-muted focus:outline-none focus:ring-4 focus:ring-brand-red/5 focus:border-brand-red transition-all font-medium" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: SUMMARY */}
          <div className="lg:col-span-4 space-y-8">
            <div className="glass rounded-[2rem] border-white shadow-premium overflow-hidden">
              <div className="p-8 pb-4">
                <h3 className="text-xl font-black text-brand-text tracking-tight uppercase mb-8">My Items</h3>
                <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar scrollbar-hide">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-4 group">
                      <div className="relative shrink-0">
                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-2xl object-cover bg-white shadow-soft transition-transform group-hover:scale-105" />
                        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-brand-red text-white flex items-center justify-center font-black text-[10px] shadow-lg border-2 border-white">
                          {item.quantity}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-black text-brand-text text-xs uppercase tracking-tight mb-1">{item.name}</h4>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-brand-red">₹{item.price * item.quantity}</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                if (item.quantity > 1) updateQuantity(item.id, item.quantity - 1);
                                else removeFromCart(item.id);
                              }}
                              className="w-6 h-6 rounded-lg bg-brand-bg flex items-center justify-center text-brand-text hover:bg-brand-red hover:text-white transition-all shadow-sm"
                            >
                              <Minus size={12} />
                            </button>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-lg bg-brand-bg flex items-center justify-center text-brand-text hover:bg-brand-red hover:text-white transition-all shadow-sm"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="px-8 pb-8 pt-4 space-y-4">
                <div className="p-4 bg-brand-bg rounded-2xl flex items-center gap-3">
                  <Tag size={18} className="text-brand-red shrink-0" />
                  <input
                    type="text"
                    value={coupon}
                    onChange={e => setCoupon(e.target.value)}
                    placeholder="COUPON CODE"
                    className="flex-1 bg-transparent border-none focus:ring-0 text-[10px] font-black placeholder-brand-muted uppercase tracking-widest"
                  />
                  <button onClick={applyCoupon} className="text-[10px] font-black text-brand-red hover:underline uppercase tracking-widest">
                    Apply
                  </button>
                </div>

                <div className="space-y-3 pt-4 border-t border-brand-border">
                  <div className="flex justify-between text-xs font-bold text-brand-muted uppercase tracking-widest">
                    <span>Subtotal</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold text-brand-muted uppercase tracking-widest">
                    <span>Discount</span>
                    <span className="text-green-500">-₹{discountAmount}</span>
                  </div>
                  <div className="flex justify-between text-lg font-black text-brand-text pt-2">
                    <span className="tracking-tighter uppercase">Grand Total</span>
                    <span className="text-brand-red">₹{finalPrice}</span>
                  </div>
                </div>

                <button
                  onClick={placeOrder}
                  className="w-full btn-primary py-5 mt-6 shadow-premium flex items-center justify-center gap-3"
                >
                  PLACE ORDER NOW <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div className="p-8 glass border-brand-border/50 rounded-[2rem] text-center">
              <HelpCircle size={24} className="mx-auto mb-3 text-brand-muted/50" />
              <p className="text-[10px] font-black text-brand-muted uppercase tracking-[0.2em]">Safe & Secure Payments</p>
              <p className="text-[8px] font-medium text-brand-muted/70 mt-1 uppercase tracking-widest leading-relaxed">
                By placing an order, you agree to our <br />
                Terms of Service & Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
